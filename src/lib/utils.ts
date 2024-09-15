import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const removeFileFromList = (files: File[], fileName: string): File[] => {
   return files.filter((file) => file.name !== fileName);
};

export const createFormData = (inputMessage: string, files: File[]): FormData => {
   const formData = new FormData();
   formData.append('message', inputMessage);
   files.forEach((file) => formData.append('files', file));
   return formData;
};
