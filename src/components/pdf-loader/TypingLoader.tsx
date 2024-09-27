import React from 'react';

export default function TypingLoader() {
   return (
      <div className="typing-loader">
         <span>.</span>
         <span>.</span>
         <span>.</span>
         <style jsx>{`
            .typing-loader {
               display: inline-block;
               font-size: 24px;
               animation: blink 1.4s infinite both;
            }
            .typing-loader span {
               display: inline-block;
               animation: blink 1.4s infinite both;
            }
            .typing-loader span:nth-child(1) {
               animation-delay: 0.2s;
            }
            .typing-loader span:nth-child(2) {
               animation-delay: 0.4s;
            }
            .typing-loader span:nth-child(3) {
               animation-delay: 0.6s;
            }
            @keyframes blink {
               0%,
               20%,
               50%,
               80%,
               100% {
                  opacity: 1;
               }
               40% {
                  opacity: 0;
               }
               60% {
                  opacity: 0;
               }
            }
         `}</style>
      </div>
   );
}
