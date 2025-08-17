
# AI Meeting Notes Summarizer

## About

This project is an AI-powered meeting notes summarizer and sharer. It allows users to upload their meeting notes in various formats, automatically generates concise summaries using AI, and provides easy options to share the summary via email. The frontend is designed with a modern, clean UI and a beige-themed color palette for a professional look.

## Features

- 📄 **File Upload**: Supports .txt, .docx, and .pdf meeting notes
- 🤖 **AI Summarization**: Uses Google's Gemini AI for intelligent text summarization
- ✏️ **Custom Prompts**: Users can provide specific instructions for how they want the summary formatted
- 📝 **Editable Summaries**: Generated summaries can be edited before sharing
- 📧 **Email Integration**: Share summaries directly via email to multiple recipients
- 🎨 **Professional UI**: Clean, beige-themed interface optimized for business use

## Tech Stack

### Frontend
- **React** - Component-based UI library for building interactive interfaces
- **SCSS** - CSS preprocessor for maintainable and organized styling
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - Runtime environment for server-side JavaScript
- **Express.js** - Web framework for building REST APIs
- **Multer** - Middleware for handling file uploads
- **Nodemailer** - Email sending functionality
- **Google Generative AI SDK** - Integration with Gemini AI for text summarization
- **fs-extra** - Enhanced file system operations

### Additional Tools
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Approach & Process

### 1. **Planning & Design**
- Identified core requirements: file upload, AI summarization, custom prompts, editing, and email sharing
- Chose a beige color palette for professional appearance
- Designed a single-page application with intuitive workflow

### 2. **Frontend Development**
- Built responsive React components with modular SCSS styling
- Implemented file upload with visual feedback
- Created editable textarea for summary modifications
- Added modal dialog for email functionality
- Ensured full viewport coverage for immersive experience

### 3. **Backend Architecture**
- Designed RESTful API with clear separation of concerns
- Implemented secure file upload handling with automatic cleanup
- Integrated Google's Gemini AI for reliable summarization
- Added comprehensive error handling and logging
- Configured email service for professional-looking summary delivery

### 4. **AI Integration Strategy**
- Implemented flexible prompt system allowing users to customize output format

### 5. **User Experience Focus**
- Added loading states and progress indicators
- Implemented proper error handling with user-friendly messages
- Created seamless workflow from upload → summarize → edit → share
- Ensured responsive design for various screen sizes

### Required Environment Variables

```env
GEMINI_API_KEY=your_google_gemini_api_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=3001
```

This project demonstrates full-stack development skills, AI integration capabilities, and attention to user experience design.
