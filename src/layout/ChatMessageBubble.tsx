// src/components/ChatMessageBubble.tsx
import React from "react";
import { Message } from "../types/chat"; // Adjust path if your types folder is elsewhere relative to components
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; // Assuming Shadcn avatar is in components/ui
import { cn } from "../lib/utils"; // Assuming Shadcn utils is in lib/

interface ChatMessageBubbleProps {
  message: Message;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isSenderMe = message.sender === "me";

  // Fallback initials for avatar if no image or name
  const getAvatarFallback = () => {
    if (isSenderMe) return "ME";
    if (message.senderName)
      return message.senderName.substring(0, 2).toUpperCase();
    return "U"; // Default User
  };

  return (
    <div
      className={cn(
        "flex w-full items-end", // Use w-full to allow max-w to work correctly
        isSenderMe ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar for 'other' sender (displayed on the left) */}
      {!isSenderMe && (
        <Avatar className="w-8 h-8 mr-2 flex-shrink-0 self-start mt-1">
          {message.avatarSrc ? (
            <AvatarImage
              src={message.avatarSrc}
              alt={message.senderName || "User Avatar"}
            />
          ) : null}
          <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div
        className={cn(
          "p-3 rounded-lg max-w-[70%] sm:max-w-[65%] break-words shadow-sm", // Added shadow-sm
          isSenderMe
            ? "bg-blue-600 text-white rounded-br-none ml-auto" // Your primary color, ml-auto for further assurance of right alignment
            : "bg-gray-200 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-gray-200" // Muted color
        )}
      >
        {/* Sender's Name (only for 'other' if provided and different from bubble content) */}
        {!isSenderMe && message.senderName && (
          <p className="text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
            {message.senderName}
          </p>
        )}
        {/* Message Text */}
        <p className="text-sm leading-relaxed">{message.text}</p>{" "}
        {/* Added leading-relaxed */}
        {/* Timestamp */}
        <p
          className={cn(
            "text-xs mt-1",
            isSenderMe
              ? "text-right text-blue-100"
              : "text-left text-gray-500 dark:text-gray-400"
          )}
        >
          {message.timestamp}
        </p>
      </div>

      {/* Avatar for 'me' sender (displayed on the right) */}
      {isSenderMe && (
        <Avatar className="w-8 h-8 ml-2 flex-shrink-0 self-start mt-1">
          {message.avatarSrc ? (
            <AvatarImage src={message.avatarSrc} alt="My Avatar" />
          ) : null}
          <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessageBubble;
