# Poster Editing Backend

A standalone backend service for AI-powered poster branding editing using OpenAI's image editing API. This service can be deployed independently and consumed by multiple frontend applications.

## Features

- AI-powered poster branding editing using OpenAI's Responses API
- Configurable CORS for multiple client origins
- Generic API responses consumable by any client
- No frontend-specific coupling or assumptions
- Health check endpoint for monitoring

## Tech Stack

- Node.js with TypeScript
- Express.js for HTTP server
- OpenAI SDK for AI image editing
- Configurable CORS support

## Prerequisites

- Node.js 18+ installed
- OpenAI API key with access to image generation models

## Installation

1. Clone or navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` with your configuration:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
OPENAI_API_KEY=sk-your-actual-key-here
OPENAI_MODEL=gpt-4.1
MAX_FILE_SIZE_MB=10
```

## Running the Backend

### Development Mode
```bash
npm run dev
```
The server will start on port 3001 (or the port specified in `.env`).

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### POST /api/edit-poster

Edits a poster image by replacing the branding/footer section with provided business details.

**Request Body:**
```json
{
  "posterBase64": "base64-encoded-image-string",
  "mimeType": "image/jpeg",
  "branding": {
    "companyName": "Example Corp",
    "website": "https://example.com",
    "phone": "+1-555-1234",
    "socials": "@example",
    "headingText": "Optional heading text",
    "brandColors": "#FF0000,#00FF00",
    "logoBase64": "base64-encoded-logo-string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "editedImageBase64": "base64-encoded-edited-image"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET /health

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "ok",
  "service": "poster-editing-backend"
}
```

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3001 | Server port |
| `NODE_ENV` | No | development | Environment (development/production) |
| `CORS_ORIGINS` | No | http://localhost:3000 | Comma-separated list of allowed CORS origins |
| `OPENAI_API_KEY` | Yes | - | OpenAI API key |
| `OPENAI_MODEL` | No | gpt-4.1 | OpenAI model to use for image editing |
| `MAX_FILE_SIZE_MB` | No | 10 | Maximum file size in MB |

### CORS Configuration

The `CORS_ORIGINS` environment variable allows you to specify multiple client origins that can access the API. This is important when the backend is consumed by multiple frontend applications.

Example:
```env
CORS_ORIGINS=http://localhost:3000,https://app1.example.com,https://app2.example.com
```

## Deployment

This backend can be deployed to any Node.js hosting platform (Render, Railway, AWS, GCP, etc.).

### Render Deployment Example

1. Create a new web service on Render
2. Connect your Git repository
3. Set the following environment variables in Render:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `OPENAI_MODEL`: gpt-4.1 (or your preferred model)
   - `CORS_ORIGINS`: Comma-separated list of your frontend URLs
   - `PORT`: 3001 (or your preferred port)
4. Deploy

## Architecture

This backend is designed as a general-purpose API service:

- **No frontend coupling**: No hardcoded frontend URLs or assumptions
- **Configurable CORS**: Supports multiple client origins via environment variables
- **Generic responses**: API responses are generic and consumable by any client
- **Independent deployment**: Can be deployed and scaled independently of any frontend

## License

Private — all rights reserved.
