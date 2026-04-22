# 🤖 Memora AI

Memora AI is a context-aware intelligent chatbot that mimics human-like memory.
It remembers user information, interests, and past conversations to generate personalized and meaningful responses.

---

## 🚀 Key Features

* 🧠 **Episodic Memory**
  Stores personal user data like name and facts.

* 💡 **Semantic Memory**
  Understands and tracks user interests over time.

* 🔍 **Context (Vector) Memory**
  Uses similarity-based recall to maintain conversation context.

* ⚙️ **Procedural Memory**
  Improves interaction flow based on past conversations.

* 💬 **Real-Time AI Responses**
  Integrated with OpenRouter API for intelligent replies.

---

## 🧠 Memory Architecture

Memora AI combines multiple memory systems:

| Memory Type | Purpose                          |
| ----------- | -------------------------------- |
| Episodic    | Stores user-specific facts       |
| Semantic    | Tracks preferences & interests   |
| Vector      | Finds similar past conversations |
| Procedural  | Improves response behavior       |

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI Integration:** OpenRouter API
* **Other:** Axios, REST APIs

---

## ⚙️ System Workflow

1. User sends input
2. Backend analyzes message
3. Memory modules update:

   * Extract facts
   * Identify interests
   * Store vector embeddings
4. Relevant memory is retrieved
5. AI generates contextual response

---

## 📌 Example Interaction

User: my name is Archita Sen
AI: remembers user identity

User: i like machine learning
AI: stores interest

User: what do you remember about me?
AI: recalls name + interests + context

---

## 📂 Project Structure

memora-ai/
├── backend/
│   ├── server.js
│   ├── vectorMemory.js
│   ├── models/
│   │   └── chat.js
│   ├── package.json
│   └── .env (not uploaded)
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── reportWebVitals.js
│   ├── package.json
│
├── README.md
└── .gitignore


```

```

---

## ⚙️ Run Locally

### Backend

cd backend
npm install
node server.js

### Frontend

cd frontend
npm install
npm start

---

## 📈 Future Improvements

* 🔐 User authentication system
* 🎨 Advanced UI/UX improvements
* 🌐 Deployment (Vercel / Render)
* 🎤 Voice-enabled interaction
* 🧠 Advanced long-term memory optimization

---

## 💡 Why This Project?

This project demonstrates:

* Full-stack development skills
* AI integration with real-world application
* Memory-based conversational systems
* Clean architecture and modular design

---

## 👩‍💻 Author

**Archita Sen**
