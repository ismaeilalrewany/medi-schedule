# Frontend Environment Configuration

Create a `.env` file in the frontend directory with the following variables:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000
# OR for production:
# VITE_API_URL=https://your-backend-domain.com

# reCAPTCHA Configuration
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key-here

# Application Configuration
VITE_APP_NAME=MediSchedule
```

## Environment Variables Explanation

### API Configuration
- **VITE_API_URL**: Backend API base URL
  - Development: `http://localhost:3000`
  - Production: Your deployed backend URL (e.g., `https://your-backend-domain.com`)

### reCAPTCHA Configuration
- **VITE_RECAPTCHA_SITE_KEY**: Client-side reCAPTCHA site key from Google
  - Get this from Google reCAPTCHA admin console
  - Use different keys for development and production

### Application Configuration
- **VITE_APP_NAME**: Application name for branding
- **VITE_APP_VERSION**: Application version for tracking

## Development vs Production

### Development Environment
```bash
VITE_API_URL=http://localhost:3000
VITE_RECAPTCHA_SITE_KEY=your-development-recaptcha-site-key
VITE_APP_NAME=MediSchedule (Dev)
```

### Production Environment
```bash
VITE_API_URL=https://your-backend-domain.com
VITE_RECAPTCHA_SITE_KEY=your-production-recaptcha-site-key
VITE_APP_NAME=MediSchedule
```

## Important Notes

1. **Vite Prefix**: All environment variables must start with `VITE_` to be accessible in the frontend
2. **No Secrets**: Never put sensitive information in frontend environment variables (they are exposed to the browser)
3. **Build Time**: Environment variables are embedded at build time, not runtime
4. **Case Sensitive**: Environment variable names are case-sensitive

## reCAPTCHA Setup

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site with reCAPTCHA v2 checkbox
3. Add your domain(s):
   - For development: `localhost`
   - For production: your actual domain
4. Get the site key and secret key
5. Use site key in frontend `.env`
6. Use secret key in backend `.env`

## Security Considerations

- Frontend environment variables are **public** and **visible** in the browser
- Only use them for **non-sensitive configuration**
- **Never** store passwords, API keys, or secrets in frontend environment variables
- Use different reCAPTCHA keys for different environments
