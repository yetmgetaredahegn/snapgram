

# 🧭 BIG PICTURE (PIN THIS)

* **Phase 2 = Build the Knowledge Engine (retrieval only, no AI talking)**
* **Phase 3 = Add Intelligence (LLM + chat experience)**

Rule of thumb:

> If Phase 2 is rock-solid, Phase 3 becomes mostly wiring.

---

# 🟦 PHASE 2 — RAG CORE (MOST IMPORTANT)

## 🎯 Phase 2 Goal

> “Given documents, I can reliably retrieve the most relevant text chunks for a question.”

No hallucinations.
No LLM answers yet.
Just **correct retrieval**.

---

## 🟦 Phase 2.0 — Environment & Structure

### Folder structure (recommended)

```
backend/
  ai/
    __init__.py
    loaders/
    indexing/
    retrieval/
    vector_store/
    services/
  media/
    documents/
```

You control **architecture**, Copilot fills in **code**.

---

### Install packages (FINAL, SAFE SET)

```bash
pip install \
  llama-index \
  llama-index-llms-ollama \
  llama-index-embeddings-ollama \
  llama-index-vector-stores-chroma \
  chromadb
```

❌ No torch
❌ No sentence-transformers
❌ No CUDA

---

### Your responsibility (Phase 2.0)

* Keep the folder boundaries clean
* Decide where Django ends and AI services begin
* Make sure Ollama is running

---

## 🟦 Phase 2.1 — Document Ingestion (Loading)

### What you’re building

* Accept PDFs / text files
* Save them to `media/documents`
* Load them into LlamaIndex `Document` objects

---

### Your responsibility

* Decide allowed file types (`pdf`, `txt`, maybe `md`)
* Validate uploads (size, type)
* Trigger ingestion from Django

---

### Copilot Prompt (paste exactly)

```
Create a document loading service using LlamaIndex that:
- Loads PDF and text files from media/documents
- Uses SimpleDirectoryReader
- Returns a list of Document objects
- Adds metadata including filename and upload timestamp
```

---

### “Done” checklist

✅ Files upload correctly
✅ Documents load without crashing
✅ Metadata is present
🚫 No embeddings yet

---

## 🟦 Phase 2.2 — Chunking & Embeddings (Indexing)

### What you’re building

* Split documents into chunks
* Convert chunks into vectors using **Ollama embeddings**

---

### Fixed decisions (DO NOT CHANGE)

* Chunk size: **512**
* Chunk overlap: **50**
* Embedding model: **`nomic-embed-text` (via Ollama)**

---

### Your responsibility

* Ensure Ollama is running
* Pull embedding model once:

```bash
ollama pull nomic-embed-text
```

---

### Copilot Prompt

```
Using LlamaIndex, create an indexing service that:
- Uses SentenceSplitter with chunk_size=512 and chunk_overlap=50
- Uses OllamaEmbedding with model "nomic-embed-text"
- Builds and returns a VectorStoreIndex
```

---

### “Done” checklist

✅ Documents are chunked
✅ Embeddings are created via Ollama
✅ RAM stays stable

---

## 🟦 Phase 2.3 — Vector Storage (Persistence)

### What you’re building

* Persist embeddings to disk
* Reload them without re-indexing

---

### Storage choice (FINAL)

✅ **ChromaDB (local, file-based)**

---

### Your responsibility

* Decide storage path (e.g. `ai/vector_store/chroma/`)
* Ensure persistence across restarts

---

### Copilot Prompt

```
Create a persistent ChromaDB vector store using LlamaIndex that:
- Stores vectors in a local directory
- Reuses the existing index if it already exists
- Avoids re-embedding documents unnecessarily
```

---

### “Done” checklist

✅ Index survives server restart
✅ No re-indexing on every run
✅ Disk files are visible

---

## 🟦 Phase 2.4 — Retrieval (Querying)

### What you’re building

* Input: user question
* Output: **top-k relevant chunks**

🚫 Still NO LLM answering
🚫 Just retrieval

---

### Your responsibility

* Decide `top_k` (start with 5)
* Decide what metadata to return

---

### Copilot Prompt

```
Create a retrieval service using LlamaIndex that:
- Accepts a query string
- Retrieves the top 5 most relevant chunks from the vector store
- Returns chunk text and metadata only
```

---

### “Done” checklist

✅ Relevant chunks returned
✅ No hallucination
✅ Fast response for small datasets

🎉 **Phase 2 complete = real RAG foundation**

---

# 🟩 PHASE 3 — INTELLIGENCE & CHAT

## 🎯 Phase 3 Goal

> “Answer questions using retrieved context, not model memory.”

---

## 🟩 Phase 3.1 — Local LLM Integration

### Your responsibility

* Install Ollama
* Pull correct model:

```bash
ollama pull llama3.2:3b
```

---

### Copilot Prompt

```
Integrate Ollama with LlamaIndex using the llama3.2:3b model.
Limit the context window to 2048 tokens and add timeout handling.
```

---

### “Done” checklist

✅ Model responds
✅ System does not freeze
✅ Acceptable speed on CPU

---

## 🟩 Phase 3.2 — RAG Pipeline (Retrieval + Generation)

### What you’re building (CORE VALUE 💰)

```
User question
   ↓
Retrieve chunks
   ↓
Inject into prompt
   ↓
LLM generates grounded answer
```

---

### Your responsibility

* Approve prompt structure
* Decide how sources are returned

---

### Copilot Prompt

```
Build a RAG pipeline using LlamaIndex that:
- Retrieves top-k relevant chunks
- Injects them into a prompt template
- Uses Ollama to generate a grounded answer
- Returns both the answer and the source chunks
```

---

### “Done” checklist

✅ Answers reference documents
✅ No random facts
✅ Sources are returned

---

## 🟩 Phase 3.3 — API Endpoint + Streaming

### Your responsibility

* Endpoint structure
* Authentication
* UX decisions (stream vs full response)

---

### Copilot Prompt

```
Create a Django REST API endpoint for RAG-based chat that:
- Accepts a user query
- Streams the LLM response
- Returns the final answer along with source references
```

---

## 🟩 Phase 3.4 — Evaluation (Optional but PRO)

### What you’ll measure

* Latency
* Retrieval relevance
* Faithfulness

---

### Copilot Prompt

```
Implement a basic RAG evaluation script that:
- Measures response latency
- Checks whether retrieved chunks contain keywords from the final answer
```

---


