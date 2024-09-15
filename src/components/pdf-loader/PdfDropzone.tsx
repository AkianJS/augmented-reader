import { useDropzone } from 'react-dropzone';

interface PdfDropzoneProps {
   onDrop: (acceptedFiles: File[]) => void;
   isDragActive: boolean;
}

const PdfDropzone: React.FC<PdfDropzoneProps> = ({ onDrop, isDragActive }) => {
   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: { 'application/pdf': ['.pdf'] },
      maxFiles: 3,
   });

   return (
      <div
         {...getRootProps()}
         className={`border-2 border-dashed rounded-lg p-4 text-center ${isDragActive ? 'border-blue-500' : 'border-gray-600'}`}
      >
         <input {...getInputProps()} />
         {isDragActive ? (
            <p>Drop the PDF files here ...</p>
         ) : (
            <p>Drag &apos;n&apos; drop PDF files here, or click to select files</p>
         )}
      </div>
   );
};

export default PdfDropzone;
