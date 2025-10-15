Demo : https://simple-chatbot-blue.vercel.app/

Project Overview:
This is a lightweight AI chatbot application built using Next.js and React, leveraging the free DeepSeek model available through OpenRouter's API platform. The application delivers conversational AI capabilities similar to commercial chatbots, with a clean, responsive interface optimized for modern web browsers.

Technical Implementation:

Frontend: Built with Next.js 14 (App Router) and React 18, utilizing TypeScript for type safety

Styling: Tailwind CSS for responsive design and ShadCN UI components

Database: PostgreSQL hosted on Neon for conversation history storage

Authentication: Next-Auth with GitHub OAuth integration

Deployment: CI/CD pipeline on Vercel with automatic preview deployments

Key Features:

Conversation Interface:

Real-time streaming responses

Markdown rendering with syntax highlighting

Conversation threading and history

Mobile-responsive chat interface

Model Configuration:

Currently using DeepSeek's free model (128k context window)

Modular architecture allows easy model switching

Supports both free and premium API endpoints

Configurable temperature and max token settings

Data Persistence:

User conversation history stored in Neon PostgreSQL

Serverless API routes handle database operations

Optimistic UI updates for smooth UX

Development Advantages:

100% open-source codebase (MIT licensed)

Environment variable configuration for different deployment scenarios

Comprehensive error handling and fallback UI states

Built-in rate limiting and API usage analytics

Future Roadmap:

Implement model comparison functionality

Add support for file uploads and document processing

Introduce voice input/output capabilities

Develop plugin architecture for extended functionality

Deployment Notes:
The production instance runs on Vercel's free tier with cold start optimizations, typically responding in under 800ms. The Neon PostgreSQL database maintains connection pooling for efficient data access, with automatic backups and point-in-time recovery.

While currently using free services, the architecture is designed to scale vertically - the API endpoint can be switched to paid models (like GPT-4 or Claude 3) with just configuration changes, and the database can upgrade to paid Neon tiers without code modifications.
