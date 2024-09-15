# 📚 Augmented Reader

**Augmented Reader** is an AI-powered chatbot that allows you to upload up to **3 PDFs** (including books) and have interactive conversations with the AI based on the content of those PDFs. Whether you need summaries, explanations, or deep insights, Augmented Reader is designed to enhance your reading experience.

## 🛠️ Installation & Setup

### 1. Clone the Repository

To get started, clone the repository by running the following command:

```bash
git clone https://github.com/AkianJS/augmented-reader.git
```

### 2. Install Dependencies

This project uses `pnpm` for package management. If you don't have it installed, you can install it globally by running:

```bash
npm install -g pnpm
```

Once `pnpm` is installed, navigate to the cloned directory and install the project dependencies:

```bash
cd augmented-reader
pnpm install
```

### 3. Set Up Environment Variables

To make the app work in development, you'll need to create a `.env` file in the root of the project and add your `GROQ_API_KEY` and `GOOGLE_API_KEY`. Here's how:

1. In the project root, create a `.env` file:
    ```bash
    touch .env
    ```

2. Open the `.env` file and add the following lines, replacing `<your-groq-api-key>` and `<your-google-api-key>` with your actual keys:
    ```bash
    GROQ_API_KEY=<your-groq-api-key>
    GOOGLE_API_KEY=<your-google-api-key>
    ```

### 4. Run the Development Server

To start the development server, run the following command:

```bash
pnpm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 📖 How to Use

Once the app is running, you can interact with the AI chatbot by uploading PDFs. Here’s how:

1. **Upload PDFs**: You can upload up to **3 PDFs** (e.g., books, documents).
   
2. **Chat with Context**: The AI will use the content of the uploaded PDFs to provide responses. Ask questions, request summaries, or discuss topics directly from the content in your PDFs.

This creates an interactive and enriched reading experience, allowing you to engage deeply with the material in the PDFs through the chatbot's AI-powered responses.
