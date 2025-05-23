// src/pages/ChatPage.tsx
import { useState, useEffect } from "react";
import ChatWindow from "../layout/ChatWindow"; // Correct path to your ChatWindow
import { Message } from "../types/chat"; // Correct path to your types
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

// Sample initial messages (can be empty initially)
const sampleMessages: Message[] = [
  {
    id: uuidv4(),
    text: "Hey there! This is a longer message to test how the bubble wraps and if the max-width is working as expected. Hopefully, it looks good!",
    sender: "other",
    timestamp: "10:00 AM",
    senderName: "Jane Doe",
    avatarSrc: "https://i.pravatar.cc/150?u=jane_doe",
  },
  {
    id: uuidv4(),
    text: "Hi Jane!",
    sender: "me",
    timestamp: "10:01 AM",
    avatarSrc: "https://i.pravatar.cc/150?u=john_doe",
  },
  {
    id: uuidv4(),
    text: "How are you doing today?",
    sender: "me",
    timestamp: "10:01 AM",
    avatarSrc: "https://i.pravatar.cc/150?u=john_doe",
  },
  {
    id: uuidv4(),
    text: "I'm doing great! Just working on this cool chat interface. 😊",
    sender: "other",
    timestamp: "10:02 AM",
    senderName: "Jane Doe",
    avatarSrc: "https://i.pravatar.cc/150?u=jane_doe",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading messages on initial mount
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setMessages(sampleMessages);
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatarSrc: "https://i.pravatar.cc/150?u=john_doe",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Optional: Simulate a reply
    setTimeout(() => {
      const reply: Message = {
        id: uuidv4(),
        text: "Message received! Replying...",
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderName: "Jane Doe",
        avatarSrc: "https://i.pravatar.cc/150?u=jane_doe",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      {/* 
        The TopNav will be rendered by App.tsx.
        This div is for the content specific to ChatPage.
        Adjust styling as needed to fit within the overall app layout.
      */}
      <div className="w-full max-w-4xl mt-4">
        {" "}
        {/* Added margin-top for spacing from TopNav */}
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Instant Messenger
        </h1>
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          chatPartnerName="Conversation with Jane Doe"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
