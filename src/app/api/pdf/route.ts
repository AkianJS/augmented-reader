// import 'pdf-parse'; // Peer dep
import { NextRequest, NextResponse } from 'next/server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { ChatGroq } from '@langchain/groq';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';

const systemTemplate = [
   `You are an assistant for question-answering tasks. `,
   `Use the following pieces of retrieved context to answer `,
   `the question. If you don't know the answer, say that you `,
   `don't know. Keep the answer concise. What you are receiving is an entire pdf document.`,
   `But probably you won't have the context of all of it.`,
   `
`,
   `{context}`,
].join('');

export async function POST(req: NextRequest) {
   // Retrieving FormData from the request
   const formData = await req.formData();
   const message = formData.get('message') as string;
   const file = formData.get('files') as File;

   const model = new ChatGroq({
      model: 'llama-3.1-70b-versatile',
      apiKey: process.env.GROQ_API_KEY,
      temperature: 0,
   });

   const loader = new PDFLoader(file);

   const docs = await loader.load();

   const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
   });

   const splits = await textSplitter.splitDocuments(docs);

   const embeddings = new GoogleGenerativeAIEmbeddings({
      model: 'text-embedding-004',
      apiKey: process.env.GOOGLE_API_KEY,
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: 'Document title',
   });
   const vectorstore = await MemoryVectorStore.fromDocuments(
      splits,
      embeddings
   );

   const retriever = vectorstore.asRetriever();

   const prompt = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['human', '{input}'],
   ]);

   const questionAnswerChain = await createStuffDocumentsChain({
      llm: model,
      prompt,
   });
   const ragChain = await createRetrievalChain({
      retriever,
      combineDocsChain: questionAnswerChain,
   });

   const results = await ragChain.invoke({
      input: message,
   });

   return NextResponse.json({ message: results.answer });
}
