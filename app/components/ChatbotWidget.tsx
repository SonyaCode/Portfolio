"use client";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "AI Bot"; text: string }

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]); // message history
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages, loading])


    const sendMessage = async() => {
        // if the user inputs an empty or whitespace message, do not send it to ai
        if (!input.trim()) {
            return;
        }

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", text: userMessage}]); // add new user's message to the conversation
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, { role: "AI Bot", text: data.reply }])
        } catch {
            setMessages((prev) => [...prev, { role: "AI Bot", text: "Something went wrong. Try again."}]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed bottom-6 right-6">
            { open ?
            <div className="w-90 h-120 rounded-2xl bg-white flex flex-col shadow-xl">
                <div className="bg-dark-bluish-purple text-white flex rounded-t-2xl flex p-3 justify-between">
                    <p className="font-medium">Sonya's assistant</p>
                    <button onClick={() => setOpen(false)} className="cursor-pointer">✕</button>
                </div>
                {/* Display messages */}
                <div className="overflow-y-auto flex-1 space-y-2 p-3">
                    {messages.map((message, i) => (
                        <div key={i} className={`text-sm max-w-[80%] rounded-lg px-3 py-2 ${message.role === "user" ? "ml-auto bg-medium-bluish-purple text-white" : "bg-gray-100 text-gray-800"}`}>
                            {message.text}
                        </div>
                    ))}

                    {loading && <div className="text-sm text-gray-400">Typing...</div>}
                    <div ref={messagesRef}></div>
                </div>

                {/* Input */}
                <div className="border-t flex gap-2 p-2">
                        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask a question..." className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none" />
                        <button onClick={() => sendMessage()} className="rounded-lg bg-dark-bluish-purple px-3 py-2 text-sm text-white cursor-pointer">Send</button>
                    </div>

            </div> :
            <button onClick={() => setOpen(true)}className="bg-dark-bluish-purple flex p-3 rounded-[100%] cursor-pointer border-white border-2">
                <img src="/assets/chatbot-icon.svg" className="w-12 h-12" alt="Chat with an AI assistant" />
            </button>
        }
        </div>
    )
}