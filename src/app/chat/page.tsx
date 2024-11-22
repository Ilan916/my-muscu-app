'use client';

import React, { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }), // Envoie le prompt à l'API
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = { role: 'assistant', content: data.message.content };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error('Erreur de l\'API:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec GPT:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col  min-h-screen bg-gray-900 text-white">
      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h1 className="text-xl font-bold mb-4">Votre assistant personnel</h1>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-md ${
              msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-800'
            }`}
          >
            <strong>{msg.role === 'user' ? 'Vous' : 'GPT'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400">GPT réfléchit...</div>}
      </div>

      {/* Input et boutons */}
      <div className="bg-gray-800 absolute bottom-16 w-full p-4 flex items-center gap-2 z-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          className="flex-1 p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 text-white"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
