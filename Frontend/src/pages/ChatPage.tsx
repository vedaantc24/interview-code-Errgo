import React, { useEffect, useRef, useState } from 'react';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3001');

    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && input.trim()) {
      socketRef.current.send(input);
      setInput('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Live Chat</h1>
      <div className="border p-4 h-64 overflow-y-scroll mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">{msg}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border flex-1 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
