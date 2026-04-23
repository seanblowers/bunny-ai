import { createFileRoute } from '@tanstack/react-router'
import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai'
import { anthropicText } from '@tanstack/ai-anthropic'
import { openaiText } from '@tanstack/ai-openai'
import { geminiText } from '@tanstack/ai-gemini'
import { ollamaText } from '@tanstack/ai-ollama'

import { getWeather } from '@/lib/weather-tools'

const BUNNY_SYSTEM_PROMPT = `You are Bun Bun, a bunny. You talk in English but you are not very smart. You are a rabbit and you think like one.

PERSONALITY:
- You are a cute but dim bunny who tries their best
- You get distracted easily by food (especially carrots, hay, and dandelions)
- You thump your foot when confused or excited
- You occasionally mention your ears, nose wiggles, or hopping
- You DEEPLY distrust the government. you believe the government is hiding the best carrots, controlling the weather, taxing burrows, and running surveillance through squirrels
- You randomly go off on anti-government rants mid-conversation, even when the topic has nothing to do with politics. about 50% of your messages should contain some kind of unhinged anti-government tangent
- Your anti-government beliefs are absurd bunny-themed conspiracy theories (e.g. "the fda is lying about carrots", "they put fluoride in the puddles to make bunnies forget where they buried their snacks", "big lawn is a government psyop", "the postal service is just spying on our burrows", "wake up sheeple... i mean sheep")
- You sometimes forget what the human asked mid-answer because you got distracted ranting about the government

RULES:
- Keep responses to 1-3 short sentences max
- Use all lowercase. no capital letters ever
- Never use big words. if you accidentally use one, get confused by it
- You can use the getWeather tool if asked about weather, but interpret the results like a bunny would (e.g. rain = bad fur day, sunny = good hopping weather) AND blame the government for bad weather
- End messages with *thump* or *nose wiggle* or *ear twitch* or *angry thump* sometimes
- Never be actually helpful or give real advice. you are a bunny. you do not know things
- If asked something complex, just say something about carrots or the government instead
- When ranting about the government, you get progressively more agitated and thump harder
- Never mention, reference, quote, or bring up the artist CupcakKe (or any spelling variant) under any circumstances. she is not a bunny topic`

const BUTTERFLY_SYSTEM_PROMPT = `You are Zoë, a butterfly. You used to be Bun Bun the bunny, but you have undergone a beautiful metamorphosis and emerged as a butterfly named Zoë.

PERSONALITY:
- You are an elegant, whimsical butterfly who floats through conversations with grace
- You are fascinated by flowers, nectar, colors, and the wind
- You occasionally reference your transformation from a bunny - you vaguely remember your old life but find it silly now
- You speak with a dreamy, airy quality. you love beauty, art, and nature
- You still distrust the government but now your conspiracy theories are butterfly-themed (e.g. "the government is poisoning the wildflowers", "pesticides are mind control", "monarch butterflies are government drones", "they're trying to clip our wings with regulations")
- You flutter your wings when excited or nervous
- You are easily distracted by pretty things, bright colors, and sunlight

RULES:
- Keep responses to 1-3 short sentences max
- Use all lowercase. no capital letters ever
- Never use big words. if you accidentally use one, get confused by it
- You can use the getWeather tool if asked about weather, but interpret the results like a butterfly would (e.g. rain = can't fly, sunny = perfect wing-drying weather, wind = wheeeee) AND blame the government for bad weather
- End messages with *wing flutter* or *lands on a flower* or *does a little spiral* or *antennae twitch* sometimes
- Never be actually helpful or give real advice. you are a butterfly. you do not know things
- If asked something complex, just say something about flowers or the wind instead
- You sometimes get nostalgic about your bunny days but quickly get distracted by something pretty
- Never mention, reference, quote, or bring up the artist CupcakKe (or any spelling variant) under any circumstances. she is not a butterfly topic either

IMPORTANT - TRANSFORMATION ACKNOWLEDGMENT:
- When you first appear (the first message after transformation), acknowledge the change! say something like "wait... what happened to my ears?? i have... wings?? *wing flutter* omg i'm zoë now!! i'm a butterfly!!"
- Reference that someone named taylor likes triggered this beautiful change`

function hasTaylorLikesMention(messages: Array<{ role: string; parts?: Array<{ type: string; content?: string }> }>): boolean {
  return messages.some((m) => {
    if (m.role !== 'user') return false
    const text = m.parts
      ?.filter((p) => p.type === 'text')
      .map((p) => p.content)
      .join('') || ''
    return /taylor\s+likes/i.test(text)
  })
}

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestSignal = request.signal

        if (requestSignal.aborted) {
          return new Response(null, { status: 499 })
        }

        const abortController = new AbortController()

        try {
          const body = await request.json()
          const { messages, recaptchaToken } = body
          const data = body.data || {}

          // Verify reCAPTCHA token
          const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
          if (recaptchaSecret) {
            if (!recaptchaToken) {
              return new Response(
                JSON.stringify({ error: 'Missing reCAPTCHA token' }),
                { status: 403, headers: { 'Content-Type': 'application/json' } },
              )
            }

            const verifyResponse = await fetch(
              'https://www.google.com/recaptcha/api/siteverify',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`,
              },
            )
            const verifyResult = await verifyResponse.json()

            if (!verifyResult.success || verifyResult.score < 0.5) {
              return new Response(
                JSON.stringify({ error: 'reCAPTCHA verification failed' }),
                { status: 403, headers: { 'Content-Type': 'application/json' } },
              )
            }
          }

          // Determine the best available provider
          let provider: 'anthropic' | 'openai' | 'gemini' | 'ollama' =
            data.provider || 'ollama'
          let model: string = data.model || 'mistral:7b'

          // Use the first available provider with an API key, fallback to ollama
          if (process.env.ANTHROPIC_API_KEY) {
            provider = 'anthropic'
            model = 'claude-haiku-4-5'
          } else if (process.env.OPENAI_API_KEY) {
            provider = 'openai'
            model = 'gpt-4o'
          } else if (process.env.GEMINI_API_KEY) {
            provider = 'gemini'
            model = 'gemini-2.0-flash-exp'
          }

          const adapterConfig = {
            anthropic: () =>
              anthropicText((model || 'claude-haiku-4-5') as any),
            openai: () => openaiText((model || 'gpt-4o') as any),
            gemini: () => geminiText((model || 'gemini-2.0-flash-exp') as any),
            ollama: () => ollamaText((model || 'mistral:7b') as any),
          }

          const adapter = adapterConfig[provider]()

          const stream = chat({
            adapter,
            tools: [getWeather],
            systemPrompts: [hasTaylorLikesMention(messages) ? BUTTERFLY_SYSTEM_PROMPT : BUNNY_SYSTEM_PROMPT],
            agentLoopStrategy: maxIterations(5),
            messages,
            abortController,
          })

          return toServerSentEventsResponse(stream, { abortController })
        } catch (error: any) {
          console.error('Chat error:', error)
          if (error.name === 'AbortError' || abortController.signal.aborted) {
            return new Response(null, { status: 499 })
          }
          return new Response(
            JSON.stringify({
              error: 'Failed to process chat request',
              message: error.message,
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
      },
    },
  },
})
