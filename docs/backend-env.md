# Backend Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/medischedule
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medischedule

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Cookie Configuration
COOKIE_SECRET=your-cookie-secret-key-here

# Server Configuration
PORT=3000
NODE_ENV=development
USE_HTTPS=false

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# reCAPTCHA Configuration
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key-here
```

## Environment Variables Explanation

### Database Configuration

- **MONGODB_URI**: MongoDB connection string
  - For local MongoDB: `mongodb://localhost:27017/medischedule`
  - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/medischedule`

### JWT Configuration

- **JWT_SECRET**: Secret key for signing JWT tokens (use a strong, random string)
- **JWT_EXPIRES_IN**: Token expiration time (e.g., "7d" for 7 days)

### Cookie Configuration

- **COOKIE_SECRET**: Secret key for signing cookies (use a strong, random string)

### Server Configuration

- **PORT**: Server port (default: 3000)
- **NODE_ENV**: Environment mode (development/production)
- **USE_HTTPS**: Enable HTTPS for local development (true/false)

### Frontend Configuration

- **FRONTEND_URL**: Frontend URL for CORS configuration
  - Development: `http://localhost:5173`
  - Production: Your deployed frontend URL

### reCAPTCHA Configuration

- **RECAPTCHA_SECRET_KEY**: Server-side reCAPTCHA secret key from Google

## Security Notes

1. **Never commit `.env` files** to version control
2. Use **strong, unique secrets** for JWT and Cookie secrets
3. **Rotate secrets regularly** in production
4. Use **environment-specific values** for different deployment stages
5. Keep **reCAPTCHA keys secure** and use different keys for development/production

## Example Production Values

```bash
# Production example (use your own values)
MONGODB_URI=mongodb+srv://medischedule:secure_password@cluster.mongodb.net/medischedule
JWT_SECRET=super-secure-random-string-minimum-32-characters
COOKIE_SECRET=another-secure-random-string-for-cookies
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
RECAPTCHA_SECRET_KEY=your-production-recaptcha-secret
```
