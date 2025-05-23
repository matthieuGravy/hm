// src/components/ChatWindow.tsx
import React, { useRef, useEffect, useState } from "react";
import { Message } from "../types/chat"; // Assuming your types are in src/types/chat.ts
import ChatMessageBubble from "../layout/ChatMessageBubble"; // We'll create this next
import { ScrollArea } from "../components/ui/scroll-area"; // From Shadcn
import { Input } from "../components/ui/input"; // From Shadcn
import { Button } from "../components/ui/button"; // From Shadcn
import { Paperclip, SendHorizonal } from "lucide-react"; // For icons

interface ChatWindowProps {
  messages: Message[]; // Array of message objects to display
  onSendMessage: (text: string) => void; // Function to call when a new message is sent
  chatPartnerName?: string; // Optional: Name of the person/group you're chatting with for a header
  isLoading?: boolean; // Optional: To show a loading state for messages
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  chatPartnerName,
  isLoading = false,
}) => {
  const scrollViewportRef = useRef<HTMLDivElement>(null); // Ref for the scrollable viewport
  const [newMessageText, setNewMessageText] = useState("");

  // Effect to scroll to the bottom when new messages are added or when loading finishes
  useEffect(() => {
    if (scrollViewportRef.current) {
      // Needs a slight delay for the DOM to update after messages are added,
      // especially if images or complex content is involved.
      setTimeout(() => {
        if (scrollViewportRef.current) {
          scrollViewportRef.current.scrollTop =
            scrollViewportRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [messages, isLoading]); // Rerun when messages change or loading state changes

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (newMessageText.trim()) {
      onSendMessage(newMessageText.trim());
      setNewMessageText(""); // Clear the input field
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Send on Enter, allow Shift+Enter for newline
      event.preventDefault();
      if (newMessageText.trim()) {
        onSendMessage(newMessageText.trim());
        setNewMessageText("");
      }
    }
  };

  return (
    <div className="flex flex-col h-[500px] sm:h-[600px] md:h-[700px] w-full max-w-2xl mx-auto bg-card border rounded-lg shadow-lg overflow-hidden">
      {/* Optional Chat Header */}
      {chatPartnerName && (
        <div className="p-3 sm:p-4 border-b bg-background/80 backdrop-blur-sm">
          <h2 className="text-md sm:text-lg font-semibold text-card-foreground">
            {chatPartnerName}
          </h2>
        </div>
      )}

      {/* Message Display Area */}
      <ScrollArea className="flex-grow bg-background/50">
        {/*
          The direct child of ScrollArea is what Shadcn styles.
          We need an inner div for the actual scrollable content and to apply the ref.
        */}
        <div ref={scrollViewportRef} className="h-full p-3 sm:p-4 space-y-4">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">Loading messages...</p>
              {/* You could add a spinner here */}
            </div>
          )}
          {!isLoading && messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">No messages yet. Say hi!</p>
            </div>
          )}
          {!isLoading &&
            messages.map((msg) => (
              // We'll create ChatMessageBubble.tsx next
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
        </div>
      </ScrollArea>

      {/* Message Input Area */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 sm:p-4 border-t bg-background"
      >
        <div className="flex items-center space-x-2">
          <Button
            type="button" // Important: prevent form submission by this button
            variant="ghost"
            size="icon"
            className="text-muted-foreground flex-shrink-0"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessageText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-grow"
            aria-label="Chat message input"
          />
          <Button
            type="submit"
            size="icon"
            className="flex-shrink-0"
            aria-label="Send message"
            disabled={!newMessageText.trim()} // Disable if input is empty
          >
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
