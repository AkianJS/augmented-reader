import React from 'react';

interface ChatMessage {
   role: 'user' | 'bot';
   content: string;
}

interface ChatMessagesProps {
   messages: ChatMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
   return (
      <div>
         {messages.map((message, index) => (
            <div
               key={index}
               className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
               <span
                  className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}
               >
                  {message.content}
               </span>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
