# Kaltak News - News Management System

Kaltak News is a comprehensive news management system built with modern web technologies. It provides a robust backend for managing news articles, user authentication, and various performance optimization features.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete news articles
- **Image Handling**: Upload and manage images for news articles
- **Authentication**: Secure JWT-based user authentication
- **Request Validation**: Input validation using Zod
- **Caching**: Redis-based caching for improved performance
- **API Rate Limiting**: Prevent abuse and ensure fair usage
- **Background Processing**: Manage tasks with BullMQ
- **Email Notifications**: Send emails using Nodemailer
- **Custom Utilities**: Image upload and cache invalidation helpers

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Queue Management**: BullMQ
- **Email Service**: Nodemailer
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **File Handling**: Custom image upload utilities
- **Security**: API Rate Limiter, Secure HTTP headers, CORS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- PostgreSQL
- Redis

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kumargaurav5/newsapi.git
   cd kaltak-news
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env`
   - Fill in the necessary environment variables

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the server:
   ```bash
   npm run start
   ```

## Usage

Once the server is running, you can interact with the API using tools like curl, Postman, or any HTTP client. The default server address is `http://localhost:3000`.

### API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive a JWT
- `GET /api/news`: Get all news articles
- `GET /api/news/:id`: Get a specific news article
- `POST /api/news`: Create a new news article (requires authentication)
- `PUT /api/news/:id`: Update a news article (requires authentication)
- `DELETE /api/news/:id`: Delete a news article (requires authentication)

For detailed API documentation, please refer to the `API_DOCS.md` file.

## Configuration

The application can be configured using environment variables. Key configurations include:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret key for JWT signing
- `SMTP_*`: SMTP server configuration for email notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



