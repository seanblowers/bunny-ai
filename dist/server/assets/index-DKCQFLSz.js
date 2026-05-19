import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo, useRef, useEffect } from "react";
import { Square, Send } from "lucide-react";
import { useChat, createChatClientOptions, fetchServerSentEvents } from "@tanstack/ai-react";
const chatOptions = createChatClientOptions({
  connection: fetchServerSentEvents("/api/chat")
});
const useAIChat = () => useChat(chatOptions);
function hasTaylorLikesMention(text) {
  return /taylor\s+likes/i.test(text);
}
function BunnyAvatar() {
  return /* @__PURE__ */ jsx("div", { className: "bunny-avatar", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 64", width: "40", height: "40", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "22", cy: "14", rx: "7", ry: "14", fill: "#fce4ec", stroke: "#f8bbd0", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "22", cy: "14", rx: "4", ry: "10", fill: "#f8bbd0" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "42", cy: "14", rx: "7", ry: "14", fill: "#fce4ec", stroke: "#f8bbd0", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "42", cy: "14", rx: "4", ry: "10", fill: "#f8bbd0" }),
    /* @__PURE__ */ jsx("circle", { cx: "32", cy: "38", r: "20", fill: "#fce4ec", stroke: "#f8bbd0", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("circle", { cx: "25", cy: "34", r: "3", fill: "#4a4a4a" }),
    /* @__PURE__ */ jsx("circle", { cx: "39", cy: "34", r: "3", fill: "#4a4a4a" }),
    /* @__PURE__ */ jsx("circle", { cx: "26", cy: "33", r: "1", fill: "white" }),
    /* @__PURE__ */ jsx("circle", { cx: "40", cy: "33", r: "1", fill: "white" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "32", cy: "40", rx: "2.5", ry: "2", fill: "#f48fb1" }),
    /* @__PURE__ */ jsx("path", { d: "M29 43 Q32 46 35 43", fill: "none", stroke: "#f48fb1", strokeWidth: "1.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("circle", { cx: "19", cy: "40", r: "3.5", fill: "#f8bbd0", opacity: "0.5" }),
    /* @__PURE__ */ jsx("circle", { cx: "45", cy: "40", r: "3.5", fill: "#f8bbd0", opacity: "0.5" }),
    /* @__PURE__ */ jsx("line", { x1: "10", y1: "38", x2: "20", y2: "39", stroke: "#ddd", strokeWidth: "0.8" }),
    /* @__PURE__ */ jsx("line", { x1: "10", y1: "42", x2: "20", y2: "41", stroke: "#ddd", strokeWidth: "0.8" }),
    /* @__PURE__ */ jsx("line", { x1: "44", y1: "39", x2: "54", y2: "38", stroke: "#ddd", strokeWidth: "0.8" }),
    /* @__PURE__ */ jsx("line", { x1: "44", y1: "41", x2: "54", y2: "42", stroke: "#ddd", strokeWidth: "0.8" })
  ] }) });
}
function ButterflyAvatar() {
  return /* @__PURE__ */ jsx("div", { className: "butterfly-avatar", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 64", width: "40", height: "40", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "18", cy: "22", rx: "14", ry: "12", fill: "#c084fc", stroke: "#a855f7", strokeWidth: "1", transform: "rotate(-15 18 22)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "18", cy: "22", rx: "9", ry: "7", fill: "#e9d5ff", transform: "rotate(-15 18 22)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "46", cy: "22", rx: "14", ry: "12", fill: "#c084fc", stroke: "#a855f7", strokeWidth: "1", transform: "rotate(15 46 22)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "46", cy: "22", rx: "9", ry: "7", fill: "#e9d5ff", transform: "rotate(15 46 22)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "20", cy: "40", rx: "11", ry: "9", fill: "#f0abfc", stroke: "#d946ef", strokeWidth: "1", transform: "rotate(-10 20 40)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "20", cy: "40", rx: "6", ry: "5", fill: "#fae8ff", transform: "rotate(-10 20 40)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "44", cy: "40", rx: "11", ry: "9", fill: "#f0abfc", stroke: "#d946ef", strokeWidth: "1", transform: "rotate(10 44 40)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "44", cy: "40", rx: "6", ry: "5", fill: "#fae8ff", transform: "rotate(10 44 40)" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "32", cy: "32", rx: "3", ry: "14", fill: "#7c3aed" }),
    /* @__PURE__ */ jsx("circle", { cx: "32", cy: "16", r: "4", fill: "#7c3aed" }),
    /* @__PURE__ */ jsx("circle", { cx: "30", cy: "15", r: "1.2", fill: "white" }),
    /* @__PURE__ */ jsx("circle", { cx: "34", cy: "15", r: "1.2", fill: "white" }),
    /* @__PURE__ */ jsx("circle", { cx: "30", cy: "15", r: "0.6", fill: "#1a1a1a" }),
    /* @__PURE__ */ jsx("circle", { cx: "34", cy: "15", r: "0.6", fill: "#1a1a1a" }),
    /* @__PURE__ */ jsx("path", { d: "M30 13 Q26 4 22 2", fill: "none", stroke: "#7c3aed", strokeWidth: "1.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("circle", { cx: "22", cy: "2", r: "1.5", fill: "#c084fc" }),
    /* @__PURE__ */ jsx("path", { d: "M34 13 Q38 4 42 2", fill: "none", stroke: "#7c3aed", strokeWidth: "1.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("circle", { cx: "42", cy: "2", r: "1.5", fill: "#c084fc" }),
    /* @__PURE__ */ jsx("circle", { cx: "14", cy: "20", r: "2", fill: "#a855f7", opacity: "0.5" }),
    /* @__PURE__ */ jsx("circle", { cx: "50", cy: "20", r: "2", fill: "#a855f7", opacity: "0.5" })
  ] }) });
}
function Messages({
  messages,
  isZoeMode
}) {
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  if (!messages.length) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { ref: messagesContainerRef, className: "flex-1 overflow-y-auto pb-4 min-h-0", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto w-full px-4 py-4 space-y-4", children: messages.filter((m) => m.role === "user" || m.role === "assistant").map((message) => {
    const textContent = message.parts.filter((part) => part.type === "text").map((part) => part.content).join("");
    if (!textContent) return null;
    return /* @__PURE__ */ jsxs("div", { className: `flex items-end gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`, children: [
      message.role === "assistant" ? isZoeMode ? /* @__PURE__ */ jsx(ButterflyAvatar, {}) : /* @__PURE__ */ jsx(BunnyAvatar, {}) : /* @__PURE__ */ jsx("div", { className: "user-avatar", children: "You" }),
      /* @__PURE__ */ jsx("div", { className: `chat-bubble ${message.role === "assistant" ? "chat-bubble-bunny" : "chat-bubble-user"}`, children: textContent })
    ] }, message.id);
  }) }) });
}
function Home() {
  const [input, setInput] = useState("");
  const chat = useAIChat();
  const isStreaming = chat.status === "streaming";
  const isZoeMode = useMemo(() => {
    return chat.messages.some((m) => {
      if (m.role !== "user") return false;
      const text = m.parts?.filter((p) => p.type === "text").map((p) => p.content).join("") || "";
      return hasTaylorLikesMention(text);
    });
  }, [chat.messages]);
  return /* @__PURE__ */ jsxs("div", { className: "chat-container", children: [
    /* @__PURE__ */ jsxs("div", { className: `chat-header ${isZoeMode ? "chat-header-butterfly" : ""}`, children: [
      isZoeMode ? /* @__PURE__ */ jsx(ButterflyAvatar, {}) : /* @__PURE__ */ jsx(BunnyAvatar, {}),
      /* @__PURE__ */ jsxs("div", { className: "chat-header-info", children: [
        /* @__PURE__ */ jsx("h1", { className: "chat-header-name", children: isZoeMode ? "Zoë" : "Bun Bun" }),
        /* @__PURE__ */ jsx("span", { className: "chat-header-status", children: isZoeMode ? isStreaming ? "fluttering..." : "online • landing on flowers" : isStreaming ? "thumping..." : "online • munching hay" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `chat-messages-area ${isZoeMode ? "chat-messages-area-butterfly" : ""}`, children: [
      chat.messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "chat-empty-state", children: [
        /* @__PURE__ */ jsx("div", { className: "chat-empty-bunny", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 64", width: "80", height: "80", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsx("ellipse", { cx: "22", cy: "14", rx: "7", ry: "14", fill: "#fce4ec", stroke: "#f8bbd0", strokeWidth: "1.5" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "22", cy: "14", rx: "4", ry: "10", fill: "#f8bbd0" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "42", cy: "14", rx: "7", ry: "14", fill: "#fce4ec", stroke: "#f8bbd0", strokeWidth: "1.5" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "42", cy: "14", rx: "4", ry: "10", fill: "#f8bbd0" }),
          /* @__PURE__ */ jsx("circle", { cx: "32", cy: "38", r: "20", fill: "#fce4ec", stroke: "#f8bbd0", strokeWidth: "1.5" }),
          /* @__PURE__ */ jsx("circle", { cx: "25", cy: "34", r: "3", fill: "#4a4a4a" }),
          /* @__PURE__ */ jsx("circle", { cx: "39", cy: "34", r: "3", fill: "#4a4a4a" }),
          /* @__PURE__ */ jsx("circle", { cx: "26", cy: "33", r: "1", fill: "white" }),
          /* @__PURE__ */ jsx("circle", { cx: "40", cy: "33", r: "1", fill: "white" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "32", cy: "40", rx: "2.5", ry: "2", fill: "#f48fb1" }),
          /* @__PURE__ */ jsx("path", { d: "M29 43 Q32 46 35 43", fill: "none", stroke: "#f48fb1", strokeWidth: "1.2", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("circle", { cx: "19", cy: "40", r: "3.5", fill: "#f8bbd0", opacity: "0.5" }),
          /* @__PURE__ */ jsx("circle", { cx: "45", cy: "40", r: "3.5", fill: "#f8bbd0", opacity: "0.5" })
        ] }) }),
        /* @__PURE__ */ jsx("h2", { className: "chat-empty-title", children: "Chat with Bun Bun" }),
        /* @__PURE__ */ jsx("p", { className: "chat-empty-subtitle", children: "Say something! Bun Bun is ready to... try their best." })
      ] }),
      /* @__PURE__ */ jsx(Messages, { messages: chat.messages, isZoeMode }),
      isStreaming && /* @__PURE__ */ jsxs("div", { className: "typing-indicator", children: [
        isZoeMode ? /* @__PURE__ */ jsx(ButterflyAvatar, {}) : /* @__PURE__ */ jsx(BunnyAvatar, {}),
        /* @__PURE__ */ jsxs("div", { className: "typing-dots", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {})
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "chat-input-area", children: /* @__PURE__ */ jsx("form", { onSubmit: (e) => {
      e.preventDefault();
      if (input.trim() && !isStreaming) {
        chat.sendMessage(input);
        setInput("");
      }
    }, children: /* @__PURE__ */ jsxs("div", { className: "chat-input-wrapper", children: [
      /* @__PURE__ */ jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), placeholder: isZoeMode ? "Say something to Zoë..." : "Say something to Bun Bun...", className: "chat-input", disabled: isStreaming }),
      isStreaming ? /* @__PURE__ */ jsx("button", { type: "button", onClick: () => chat.stop(), className: "chat-send-btn", children: /* @__PURE__ */ jsx(Square, { className: "w-4 h-4" }) }) : /* @__PURE__ */ jsx("button", { type: "submit", disabled: !input.trim(), className: "chat-send-btn", children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }) })
    ] }) }) })
  ] });
}
export {
  Home as component
};
