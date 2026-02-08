# Email Service API

A basic Express.js server for sending emails using Nodemailer, ready for Vercel deployment.

## Features

- Health check endpoint
- Email sending via Gmail
- CORS enabled
- Simple and lightweight

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Health Check

```
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Send Email

```
POST /api/email
```

Request body:

```json
{
  "email": "recipient@example.com",
  "body": "Your email content here"
}
```

Response:

```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

## Deployment on Vercel

1. Push your code to GitHub
2. Import the repository on Vercel
3. Deploy - the `vercel.json` will configure the build automatically

## Notes

- Email credentials are hardcoded. For production, consider using environment variables on Vercel
- Ensure Gmail allows Less Secure App Access or use App Passwords (as configured)
# email-service
