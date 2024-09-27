import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { FileIcon, SendIcon, XIcon } from 'lucide-react';
import PdfDropzone from './PdfDropzone';
import ChatMessages from './ChatMessages';
import TypingLoader from './TypingLoader';
import { createFormData } from '@/lib/utils';

export default function AugmentedPdfChat() {
   const [file, setFile] = useState<File | null>(null);
   const [chatMessages, setChatMessages] = useState<
      { role: 'user' | 'bot'; content: string }[]
   >([]);
   const [inputMessage, setInputMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
         setFile(acceptedFiles[0]);
      }
   }, []);

   const removeFile = () => {
      setFile(null);
   };

   const handleSendMessage = async () => {
      if (inputMessage.trim() && file) {
         setInputMessage('');
         setChatMessages((prev) => [
            ...prev,
            { role: 'user', content: inputMessage },
         ]);
         setIsLoading(true);
         const formData = createFormData(inputMessage, file);

         const response = await fetch('/api/pdf', {
            method: 'POST',
            body: formData,
         }).then((res) => res.json());

         setChatMessages((prev) => [
            ...prev,
            { role: 'bot', content: response.message },
         ]);
         setIsLoading(false);
      }
   };

   return (
      <main className="flex h-screen bg-gray-900 p-4">
         <Card className="w-1/3 mr-4 bg-gray-800 border-gray-700">
            <CardContent className="p-4">
               <PdfDropzone onDrop={onDrop} isDragActive={!file} />
               <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                  <div className="mb-4 p-2 border border-gray-600 rounded bg-gray-700 text-center text-white">
                     {file ? '1/1' : '0/1'}
                  </div>
                  {file && (
                     <div
                        key={file.name}
                        className="flex items-center justify-between bg-gray-700 p-2 rounded mb-2"
                     >
                        <div className="flex items-center">
                           <FileIcon className="mr-2" />
                           <span>{file.name}</span>
                        </div>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={removeFile}
                        >
                           <XIcon className="h-4 w-4" />
                        </Button>
                     </div>
                  )}
               </ScrollArea>
            </CardContent>
         </Card>
         <Card className="flex-1 bg-gray-800 border-gray-700">
            <CardContent className="flex flex-col h-full p-4">
               <ScrollArea className="flex-1 mb-4">
                  <ChatMessages messages={chatMessages} />
                  {isLoading && <TypingLoader />}
               </ScrollArea>
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleSendMessage();
                  }}
                  className="flex"
               >
                  <Input
                     type="text"
                     placeholder="Type your message..."
                     value={inputMessage}
                     onChange={(e) => setInputMessage(e.target.value)}
                     className="flex-1 mr-2 bg-gray-700 border-gray-600"
                  />
                  <Button type="submit">
                     <SendIcon className="h-4 w-4" />
                  </Button>
               </form>
            </CardContent>
         </Card>
      </main>
   );
}
