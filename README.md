# AI-Powered Website Builder

A comprehensive monorepo solution for creating beautiful, AI-generated websites using modern web technologies.

## 🚀 Features

- **AI-Powered Content Generation**: Uses Ollama locally with llama3.1:8b model
- **WYSIWYG Editor**: Rich text editing with React Quill
- **Sequential Generation**: Context-aware section creation
- **Real-time Chatbot**: AI assistant for each website
- **Modern UI**: Material UI with beautiful animations
- **Responsive Design**: Optimized for all devices

## 🏗️ Architecture

### Monorepo Structure
```
ai-website-builder/
├── apps/
│   ├── frontend/          # React + Material UI
│   └── backend/           # Node.js + Express + MongoDB
├── packages/
│   └── shared-types/      # TypeScript interfaces
└── turbo.json            # Turborepo configuration
```

### Tech Stack
- **Frontend**: React, TypeScript, Material UI, React Quill
- **Backend**: Node.js, Express, MongoDB, OpenAI SDK
- **AI**: Ollama with llama3.1:8b model
- **Build**: Turborepo, Vite

## 🛠️ Setup Instructions

### Prerequisites
1. Node.js 18+
2. MongoDB (local instance)
3. Ollama with llama3.1:8b model

### Installation
```bash
# Install dependencies
npm install

# Build shared packages
npm run build

# Start development servers
npm run dev
```

### Environment Setup
Create `apps/backend/.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ai-website-builder
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=llama3.1:8b
NODE_ENV=development
```

### Ollama Setup
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull the model
ollama pull llama3.1:8b

# Start Ollama server
ollama serve
```

## 📋 Available Sections

1. AI Chatbot Widget Section
2. Interactive Hero Section
3. Stats / Metrics Section
4. Process / How It Works Section
5. Call-to-Action Banner Section
6. Blog / Resources Section
7. Integration / Partners Section
8. Download App Section
9. Events / Webinar Section
10. Community / Forum Section
11. Careers Section
12. Legal / Compliance Section
13. Dark Mode Toggle Section

## 🔄 Website Creation Flow

1. **Basic Info**: Name and description
2. **AI Suggestions**: Get ≥300 word AI-generated suggestions
3. **Section Generation**: Sequential AI content creation
4. **WYSIWYG Editing**: Customize each section
5. **Publish**: Make website public

## 🤖 AI Integration

- **Sequential Generation**: Each section includes context from previous ones
- **Fallback System**: Graceful degradation when AI is unavailable
- **Contextual Chatbot**: Responds based on website content

## 📡 API Endpoints

- `POST /api/generateSuggestedDetails` - Get AI suggestions
- `POST /api/generateContentSection` - Generate section content
- `POST /api/updateSectionContent` - Update section content
- `POST /api/publishWebsite` - Publish website
- `POST /api/chatBotMessage` - Chatbot interaction
- `GET /view/:websiteId` - Public website view

## 🚀 Development

```bash
# Start all services
npm run dev

# Build all packages
npm run build

# Lint code
npm run lint

# Clean build files
npm run clean
```

## 📱 Frontend Features

- Material UI components with custom theme
- Responsive design system
- Multi-step form wizard
- Rich text editor with React Quill
- Real-time AI chatbot widget
- Dashboard for managing websites

## ⚡ Backend Features

- Express.js REST API
- MongoDB with Mongoose
- OpenAI SDK integration
- Error handling middleware
- CORS and security headers

## 🔒 Security

- Helmet.js for security headers
- Input validation and sanitization
- Error handling without data exposure
- CORS configuration

## 📈 Performance

- Turborepo for optimal builds
- Code splitting and lazy loading
- Optimized bundle sizes
- Efficient database queries

## 🧪 Production Ready

- TypeScript for type safety
- ESLint configuration
- Production build optimization
- Health check endpoints
- Graceful error handling