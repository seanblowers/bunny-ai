import {
  fetchServerSentEvents,
  useChat,
  createChatClientOptions,
} from '@tanstack/ai-react'
import type { InferChatMessages } from '@tanstack/ai-react'

const RECAPTCHA_SITE_KEY = '6Ld8_pksAAAAALv2qpW4VKcwQMV5gXyCdG85A8GE'

async function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const grecaptcha = (window as any).grecaptcha
    if (!grecaptcha) {
      reject(new Error('reCAPTCHA not loaded'))
      return
    }
    grecaptcha.ready(() => {
      grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: 'chat' })
        .then(resolve)
        .catch(reject)
    })
  })
}

// Default chat options for simple usage
const defaultChatOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/chat'),
})

export type ChatMessages = InferChatMessages<typeof defaultChatOptions>

export const useAIChat = () => {
  const chatOptions = createChatClientOptions({
    connection: fetchServerSentEvents('/api/chat', async () => ({
      body: {
        recaptchaToken: await getRecaptchaToken(),
      },
    })),
  })

  return useChat(chatOptions)
}
