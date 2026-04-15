# 🎬 Pitch Visualizer
### Turn Plain Text Into a Visual Storyboard — Instantly

> *Narrative segmentation → AI prompt engineering → multi-panel storyboard*

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Infra-Docker-2496ED?style=flat-square&logo=docker)](https://docker.com/)
[![Python](https://img.shields.io/badge/Language-Python-3776AB?style=flat-square&logo=python)](https://python.org/)
[![NLTK](https://img.shields.io/badge/NLP-NLTK-7E57C2?style=flat-square)](https://www.nltk.org/)

---

## 📌 What Is This?

**Pitch Visualizer** is a full-stack AI service that transforms a block of narrative text — a customer success story, a startup pitch, a product description — into a **coherent, multi-panel visual storyboard**.

It does three things well:
1. **Segments** your text into logical scenes using NLP sentence tokenization (NLTK)
2. **Engineers** a rich, visually descriptive prompt for each scene using an LLM (Gemini)
3. **Generates** a unique image per panel via a text-to-image API and presents everything as a clean, sequential storyboard UI

 It is a complete **idea → narrative → visuals** pipeline.

---

## ✨ Features

- 🧠 **NLP-based sentence segmentation** — splits narrative into meaningful, standalone scenes
- 🎨 **LLM-powered prompt refinement** — Gemini transforms each sentence into a richly descriptive visual prompt, adding cinematic framing, lighting, and mood
- 🖼️ **AI image generation** — calls a text-to-image API (Stable Diffusion / DALL·E) for each engineered prompt
- 🎞️ **Multi-panel storyboard UI** — panels are rendered sequentially with original text captions
- 🎭 **User-selectable visual styles** — choose from `cinematic`, `anime`, `Fantasy`, `realistic`, or `Sketch` before generating
- 🐳 **Fully containerized** — Docker Compose brings up backend + frontend with a single command

---

## 🏗️ Project Structure

```pitch-visualizer/
│
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   └── hooks/
│   │   │   |    └── genrate.hook.js
│   │   │   |
│   │   |   pages/
│   │   │   ├── Generate.jsx
│   │   │   └── Input.jsx
│   │   │   | 
│   │   |   service/
│   │   │   └── genrate.api.js
│   │   │   |
│   │   |   pitch.context.jsx
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── api/
│   │   ├── __pycache__/
│   │   ├── core/
│   │   │   ├── __pycache__/
│   │   │   ├── __init__.py
│   │   │   └── generator.py
│   │   │
│   │   ├── route/
│   │   │   ├── __pycache__/
│   │   │   ├── __init__.py
│   │   │   └── routes.py
│   │   │
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── schemas.py
│   │
│   ├── src/
│   │   ├── __pycache__/
│   │   ├── services/
│   │   │   ├── __pycache__/
│   │   │
│   │   │   ├── image/
│   │   │   │   ├── __pycache__/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── huggingface_client.py
│   │   │   │   └── prompt_templates.py
│   │   │   │
│   │   │   ├── promt/
│   │   │   │   ├── __pycache__/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── gemini_client.py
│   │   │   │   └── prompt_templates.py
│   │   │   │
│   │   │   ├── visual/
│   │   │   │   ├── __pycache__/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── gemini_client.py
│   │   │   │   └── prompt_templates.py
│   │   │   │
│   │   │   └── __init__.py
│   │   │
│   │   └── __init__.py
│   │
│   ├── venv/
│   ├── __init__.py
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   └── requirements.txt
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Docker & Docker Compose, **or** Python 3.10+ and Node.js 18+
- A Gemini API key ([get one free](https://aistudio.google.com/app/apikey))
- A HuggingFace API key for image generation

### 1. Clone the Repository

```bash
git clone https://github.com/Parvrajchauhan/pitch-visualizer.git
cd pitch-visualizer
```

### 2. Configure Environment Variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3-flash-preview
HF_API_KEY=
```

### 3A. Run with Docker (Recommended)

```bash
docker-compose up --build
```

- **Backend:** http://localhost:8000
- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:8000/docs

### 3B. Run Manually

**Backend:**
```bash
cd server
pip install -r requirements.txt
python -m nltk.downloader punkt punkt_tab
uvicorn api.main:app --reload --port 8000
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

---

## 📡 API Reference

### `POST /generate`

Accepts a narrative paragraph and returns a structured list of storyboard panels, each containing the original sentence and its AI-engineered visual prompt. 
**Request:**
```json
{
  "text": "A tired founder works late into the night. Suddenly, an idea sparks. The next day, the startup is born.",
  "style": "cinematic",
}
```

**Response:**
```json
{
  "panels": [
    {
      "index": 0,
      "sentence": "A tired founder works late into the night.",
      "engineered_prompt": "Cinematic wide shot of an exhausted entrepreneur hunched over a glowing laptop at 3 AM, empty coffee cups scattered across the desk, warm amber desk lamp casting dramatic shadows, bokeh background of a dark city skyline, high detail, film grain.",
      "image_url": "base64"
    },
    {
      "index": 1,
      "sentence": "Suddenly, an idea sparks.",
      "engineered_prompt": "Close-up of a person's face illuminated by a sudden burst of light, eyes wide with realization, glowing lightbulb materializing in mid-air, vibrant energy lines radiating outward, cinematic color grading, shallow depth of field.",
      "image_url": "base64"
    },
    {
      "index": 2,
      "sentence": "The next day, the startup is born.",
      "engineered_prompt": "Bright morning light flooding a modern co-working space, a small team of three gathered around a whiteboard covered in diagrams, smiling faces, motivational atmosphere, golden hour lighting, cinematic composition.",
      "image_url": "base64"
    }
  ],
  "style": "cinematic",
  "panel_count": 3
}
```

---

## 🧠 Design & Architecture

### Pipeline

```
Raw Text Input
     │
     ▼
[1] Gemini LLM — Visual Thread Generator
     │  Extracts consistent elements (characters, setting, tone, color palette)
     ▼
[2] NLTK Sentence Tokenizer
     │  Splits into ≥3 scene segments
     ▼
[3] Gemini LLM — Prompt Engineer
     │  Adds visual framing, lighting, mood, style keywords (using visual thread)
     ▼
[4] Text-to-Image API (Stability AI / DALL·E)
     │  Generates one image per engineered prompt
     ▼
[5] Storyboard Renderer (React)
     │  Sequential panels, captions, style badge
     ▼
Visual Storyboard Output
```

### Prompt Engineering Strategy

Each sentence is sent to Gemini with a system instruction to return a single, highly descriptive visual prompt. The instruction enforces:
- **Scene framing:** wide shot, close-up, aerial, etc.
- **Lighting descriptors:** golden hour, dramatic shadows, neon, etc.
- **Mood/atmosphere:** tense, hopeful, ethereal, etc.
- **Style keywords** appended from the user's selected preset (e.g., `"cinematic, 35mm film, high detail"`)


## 🧪 Example

**Input:**
> "A farmer notices his crops are failing. He discovers a strange, glowing seed in the soil. By planting it, he transforms his village."

**Output (3 panels, cinematic style):**

| Panel 1 | Panel 2 | Panel 3 |
|---|---|---|
| Wide shot of a weathered farmer kneeling in a dry, cracked field, golden hour light, dust in the air, hopeless expression, cinematic, 35mm film | Close-up of a calloused hand holding a small, luminescent seed, warm blue glow emanating from it, dark rich soil in background, shallow depth of field, cinematic, high detail | Aerial view of a lush green village transforming at dawn, villagers gathered in awe, vibrant crops filling the frame, dramatic sunrise backlighting, cinematic, wide angle |

---


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI, Python 3.10 |
| NLP | NLTK (sentence tokenization) |
| Prompt Engineering | Google Gemini API |
| Image Generation | HuggingFace  |
| Frontend | React, Vite, Tailwind CSS |
| Containerization | Docker, Docker Compose |
| API Design | RESTful, Pydantic schemas |

---

## 🧑‍💻 Author

**Parv Raj Chauhan**
Pre-final year CS student @ IIIT Nagpur

[LinkedIn](https://linkedin.com/in/contact-parv) · [GitHub](https://github.com/Parvrajchauhan) · parvrajchauhan@gmail.com
