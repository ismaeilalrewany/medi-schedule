# Authentication & Authorization

## Overview

MediSchedule implements a secure authentication system using JWT (JSON Web Tokens) with HTTP-only cookies. The system supports role-based access control for three user types: Patients, Doctors, and Admins.

## Authentication Flow

```
1. User submits login credentials + reCAPTCHA token
2. Server validates credentials and reCAPTCHA
3. Server generates JWT token and stores in HTTP-only cookie
4. Client sends cookie with subsequent requests
5. Server validates token on each protected route
```

## User Roles

### Patient

- **Permissions**:
  - View own profile and appointments
  - Book new appointments
  - Cancel own appointments
- **Access**: Patient-specific pages and endpoints

### Doctor

- **Permissions**:
  - View own profile and appointments
  - Manage appointment status
  - View patient information for appointments
- **Access**: Doctor-specific pages and endpoints

### Admin

- **Permissions**:
  - Full system access
  - Manage all users (patients and doctors)
  - View and manage all appointments
  - Access system dashboard
- **Access**: All system functionality

## JWT Token Structure

```json
{
  "userId": "user-object-id",
  "role": "patient|doctor|admin",
  "iat": 1642781234,
  "exp": 1643386034
}
```

## Security Features

### Password Security

- **Hashing**: bcryptjs with salt rounds
- **Complexity Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

### JWT Security

- **HTTP-only Cookies**: Prevents XSS attacks
- **Secure Flag**: HTTPS only in production
- **SameSite**: CSRF protection
- **Expiration**: 7 days default
- **Signed Cookies**: Prevents tampering

### reCAPTCHA Integration

- **V2 Checkbox**: Human verification on login/register
- **Server-side Validation**: Prevents automated attacks
- **Rate Limiting**: Reduces brute force attempts

## Authentication Middleware

```javascript
const auth = async (req, res, next) => {
  try {
    const token = req.signedCookies.jwt
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserByRole(decoded.role, decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
```

## Protected Routes

### Frontend Route Protection

```javascript
const ProtectedRoute = ({ role }) => {
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    checkAuth().then(setUserRole)
  }, [])

  if (!userRole || userRole !== role) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
```

### Backend Route Protection

```javascript
// Patient routes
router.get('/profile', auth, PatientsController.getProfile)
router.post('/appointments', auth, AppointmentsController.createAppointment)

// Doctor routes
router.get('/appointments', auth, AppointmentsController.getDoctorAppointments)

// Admin routes
router.get('/patients/:id', auth, AdminsController.getPatient)
```

## Session Management

### Cookie Configuration

```javascript
res.cookie('jwt', token, {
  httpOnly: true, // Prevents XSS
  secure: true, // HTTPS only
  sameSite: 'none', // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  signed: true, // Prevents tampering
})
```

### Token Refresh

- **Current**: Manual logout/login required
- **Future Enhancement**: Automatic token refresh mechanism

## Error Handling

### Authentication Errors

- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Insufficient permissions
- **400 Bad Request**: Invalid credentials
- **429 Too Many Requests**: Rate limit exceeded (if implemented)

### Error Response Format

```json
{
  "message": "Unauthorized access",
  "timestamp": "2025-01-17T10:30:00.000Z",
  "path": "/api/patients/profile"
}
```

## Security Best Practices

### Client-Side

1. **Never store tokens in localStorage**
2. **Use HTTPS in production**
3. **Implement proper error handling**
4. **Clear sensitive data on logout**
5. **Validate user input**

### Server-Side

1. **Use strong JWT secrets**
2. **Implement proper CORS**
3. **Validate all inputs**
4. **Use parameterized queries**
5. **Implement rate limiting**
6. **Log security events**

## Environment Variables

### Required for Authentication

```bash
# Backend
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your-cookie-secret-key-here
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Frontend
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

## Testing Authentication

### Manual Testing

1. **Register/Login**: Test with valid/invalid credentials
2. **Protected Routes**: Access without authentication
3. **Role-based Access**: Try accessing other role's resources
4. **Token Expiration**: Test expired token handling
5. **Logout**: Verify proper session cleanup

### Test Scenarios

- Valid login with reCAPTCHA
- Invalid email/password
- Missing reCAPTCHA token
- Expired JWT token
- Cross-role access attempts
- Logout and re-authentication

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
2. **OAuth Integration** (Google, Facebook)
3. **Refresh Token Mechanism**
4. **Password Reset via Email**
5. **Account Lockout** after failed attempts
6. **Session Management Dashboard**
7. **Activity Logging**
8. **Advanced Rate Limiting**
