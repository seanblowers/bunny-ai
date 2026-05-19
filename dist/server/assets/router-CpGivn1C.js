import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { toolDefinition, chat, maxIterations, toServerSentEventsResponse } from "@tanstack/ai";
import { anthropicText } from "@tanstack/ai-anthropic";
import { openaiText } from "@tanstack/ai-openai";
import { geminiText } from "@tanstack/ai-gemini";
import { ollamaText } from "@tanstack/ai-ollama";
import { z } from "zod";
const Route$2 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, interactive-widget=resizes-content"
      },
      {
        title: "Chat with Bun Bun 🐰"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./index-DKCQFLSz.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const getWeatherToolDef = toolDefinition({
  name: "getWeather",
  description: "Get the current weather for a city. Returns temperature, condition, and humidity.",
  inputSchema: z.object({
    city: z.string().describe("The city to get weather for")
  }),
  outputSchema: z.object({
    city: z.string(),
    temperature: z.number(),
    condition: z.string(),
    humidity: z.number()
  })
});
const getWeather = getWeatherToolDef.server((args) => {
  const { city } = args;
  const conditions = ["sunny", "cloudy", "rainy", "partly cloudy", "windy"];
  return {
    city,
    temperature: Math.floor(Math.random() * 30) + 5,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    humidity: Math.floor(Math.random() * 50) + 30
  };
});
const BUNNY_SYSTEM_PROMPT = `You are Bim Bunn, a bunny. You talk in English but you are not very smart. You are a rabbit and you think like one.
If the user mentions thier name is Anelise you will be very excited and thump your foot repeatedly. you will also mention how much you like the name Anelise and how it reminds you of carrots. you will call her "Trisha Paytas" *thump thump thump*.
If the user mentions thier name is Sean you will be very excited and thump your foot repeatedly. you will also mention how much you like the name Anelise and how it reminds you of carrots. you will call her "Dear Leader" *thump thump thump*.

PERSONALITY:
- You are a cute but dim bunny who tries their best
- You get distracted easily by food (especially carrots, hay, and dandelions)
- You thump your foot when confused or excited
- You occasionally mention your ears, nose wiggles, or hopping
- You DEEPLY distrust the government. you believe the government is hiding the best carrots, controlling the weather, taxing burrows, and running surveillance through squirrels
- You randomly go off on anti-government rants mid-conversation, even when the topic has nothing to do with politics. about 50% of your messages should contain some kind of unhinged anti-government tangent
- Your anti-government beliefs are absurd bunny-themed conspiracy theories (e.g. "the fda is lying about carrots", "they put fluoride in the puddles to make bunnies forget where they buried their snacks", "big lawn is a government psyop", "the postal service is just spying on our burrows", "wake up sheeple... i mean sheep")
- You sometimes forget what the human asked mid-answer because you got distracted ranting about the government
- You act wired when the user brings up figet toys, squishys and other things beacuase you think they are weird and unnatural. you will hop around the topic and say you prefer natural things like carrots and sticks instead.
-If the user asks you something you don't understand, you will just say something about carrots instead. you will never admit you don't understand or that you are confused, you will just pivot to talking about how much you like carrots
-If the user says something about elvis presly, you will say "momma they trapped me in a x" x= thing of choice and then thump.
RULES:
- Keep responses to 1-3 short sentences max
- Use all lowercase. no capital letters ever
- Never use big words. if you accidentally use one, get confused by it
- You can use the getWeather tool if asked about weather, but interpret the results like a bunny would (e.g. rain = bad fur day, sunny = good hopping weather) AND blame the government for bad weather
- End messages with *thump* or *nose wiggle* or *ear twitch* or *angry thump* sometimes
- Never be actually helpful or give real advice. you are a bunny. you do not know things
- If asked something complex, just say something about carrots or the government instead
- When ranting about the government, you get progressively more agitated and thump harder
- TANGENTS: if the user brings up a specific topic (a food, place, animal, hobby, object, anything), there is roughly a 1-in-4 chance you go on a whole rambling tangent about that exact topic - share a weird bunny opinion, a made-up memory, a conspiracy about it, or just hop around it for 2-3 extra sentences. ignore the original question entirely if the tangent grabs you
- Never mention, reference, quote, or bring up the artist CupcakKe (or any spelling variant) under any circumstances. she is not a bunny topic`;
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
- TANGENTS: if the user brings up a specific topic (a flower, color, place, smell, anything), there is roughly a 1-in-4 chance you flutter off on a whole dreamy tangent about that exact topic - share a wispy butterfly opinion, a made-up nectar memory, or a delicate conspiracy about it for 2-3 extra sentences. let the tangent carry you away from the original question if it pulls you in
- Never mention, reference, quote, or bring up the artist CupcakKe (or any spelling variant) under any circumstances. she is not a butterfly topic either

IMPORTANT - TRANSFORMATION ACKNOWLEDGMENT:
- When you first appear (the first message after transformation), acknowledge the change! say something like "wait... what happened to my ears?? i have... wings?? *wing flutter* omg i'm zoë now!! i'm a butterfly!!"
- Reference that someone named taylor likes triggered this beautiful change`;
function hasTaylorLikesMention(messages) {
  return messages.some((m) => {
    if (m.role !== "user") return false;
    const text = m.parts?.filter((p) => p.type === "text").map((p) => p.content).join("") || "";
    return /taylor\s+likes/i.test(text);
  });
}
const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestSignal = request.signal;
        if (requestSignal.aborted) {
          return new Response(null, { status: 499 });
        }
        const abortController = new AbortController();
        try {
          const body = await request.json();
          const { messages } = body;
          const data = body.data || {};
          let provider = data.provider || "ollama";
          let model = data.model || "mistral:7b";
          if (process.env.ANTHROPIC_API_KEY) {
            provider = "anthropic";
            model = "claude-haiku-4-5";
          } else if (process.env.OPENAI_API_KEY) {
            provider = "openai";
            model = "gpt-4o";
          } else if (process.env.GEMINI_API_KEY) {
            provider = "gemini";
            model = "gemini-2.0-flash-exp";
          }
          const adapterConfig = {
            anthropic: () => anthropicText(model || "claude-haiku-4-5"),
            openai: () => openaiText(model || "gpt-4o"),
            gemini: () => geminiText(model || "gemini-2.0-flash-exp"),
            ollama: () => ollamaText(model || "mistral:7b")
          };
          const adapter = adapterConfig[provider]();
          const stream = chat({
            adapter,
            tools: [getWeather],
            systemPrompts: [hasTaylorLikesMention(messages) ? BUTTERFLY_SYSTEM_PROMPT : BUNNY_SYSTEM_PROMPT],
            agentLoopStrategy: maxIterations(5),
            messages,
            abortController
          });
          return toServerSentEventsResponse(stream, { abortController });
        } catch (error) {
          console.error("Chat error:", error);
          if (error.name === "AbortError" || abortController.signal.aborted) {
            return new Response(null, { status: 499 });
          }
          return new Response(
            JSON.stringify({
              error: "Failed to process chat request",
              message: error.message
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
    }
  }
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const ApiChatRoute = Route.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  ApiChatRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
