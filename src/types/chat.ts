// src/types/chat.ts
export interface Message {
  id: string; // Unique ID for React key and identification
  text: string; // The content of the message
  sender: "me" | "other" | string; // 'me' for current user, 'other' for the chat partner, or a user ID for group chats
  timestamp: string; // Or Date object; string for simplicity in display (e.g., "10:30 AM")
  avatarSrc?: string; // Optional URL for the sender's avatar image
  senderName?: string; // Optional display name for the sender (useful if sender is not 'me' or 'other')
}
