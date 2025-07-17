# API Endpoints Documentation

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-backend-domain.com/api`

## Authentication

All protected routes require JWT authentication via HTTP-only cookies. The authentication token is automatically included in requests when using `withCredentials: true` in Axios.

## Common Response Format

```json
{
  "message": "Success message",
  "data": {}, // Optional data object
  "pagination": {}, // Optional pagination info
  "timestamp": "2025-01-17T10:30:00.000Z"
}
```

## Error Response Format

```json
{
  "message": "Error message",
  "stack": "Error stack trace (development only)",
  "timestamp": "2025-01-17T10:30:00.000Z"
}
```

---

## Patient Endpoints

### Authentication

#### Register Patient
- **POST** `/patients/register`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "phoneNumber": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "medicalHistory": "No known allergies",
    "recaptchaToken": "recaptcha-token-here"
  }
  ```
- **Response**: `201 Created` with success message and JWT token

#### Login Patient
- **POST** `/patients/login`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "recaptchaToken": "recaptcha-token-here"
  }
  ```
- **Response**: `200 OK` with success message

#### Logout Patient
- **POST** `/patients/logout`
- **Auth**: Required
- **Response**: `200 OK` with success message

### Profile Management

#### Get Patient Profile
- **GET** `/patients/profile`
- **Auth**: Required
- **Response**: `200 OK` with patient profile data

#### Get All Patients (Admin/Doctor Access)
- **GET** `/patients`
- **Auth**: Required (Admin/Doctor)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 6)
  - `search` (optional): Search term for name, email, or phone
- **Response**: `200 OK` with patients list and pagination info

### Appointments

#### Create Appointment
- **POST** `/patients/appointments`
- **Auth**: Required
- **Body**:
  ```json
  {
    "doctorId": "doctor-object-id",
    "date": "2025-01-20",
    "startTime": "09:00",
    "endTime": "09:30",
    "reason": "Regular checkup",
    "notes": "First time visit"
  }
  ```
- **Response**: `201 Created` with appointment details

#### Get Patient Appointments
- **GET** `/patients/appointments`
- **Auth**: Required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 6)
  - `status` (optional): Filter by status (pending, confirmed, completed, canceled)
  - `date` (optional): Filter by specific date
  - `search` (optional): Search by doctor name
- **Response**: `200 OK` with appointments list and pagination info

---

## Doctor Endpoints

### Authentication

#### Register Doctor
- **POST** `/doctors/register`
- **Body**:
  ```json
  {
    "fullName": "Dr. Jane Smith",
    "email": "jane.smith@example.com",
    "password": "SecurePassword123!",
    "specialization": "Cardiology",
    "qualifications": ["MD", "MBBS"],
    "phoneNumber": "+1234567890",
    "gender": "female",
    "availableTimeSlots": [
      {
        "day": "monday",
        "startTime": "09:00",
        "endTime": "17:00",
        "isAvailable": true
      }
    ],
    "recaptchaToken": "recaptcha-token-here"
  }
  ```
- **Response**: `201 Created` with success message

#### Login Doctor
- **POST** `/doctors/login`
- **Body**:
  ```json
  {
    "email": "jane.smith@example.com",
    "password": "SecurePassword123!",
    "recaptchaToken": "recaptcha-token-here"
  }
  ```
- **Response**: `200 OK` with success message

#### Logout Doctor
- **POST** `/doctors/logout`
- **Auth**: Required
- **Response**: `200 OK` with success message

### Profile Management

#### Get Doctor Profile
- **GET** `/doctors/profile`
- **Auth**: Required
- **Response**: `200 OK` with doctor profile data

#### Get All Doctors
- **GET** `/doctors`
- **Auth**: Required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 6)
  - `search` (optional): Search term for name, email, or phone
- **Response**: `200 OK` with doctors list and pagination info

### Appointments

#### Get Doctor Appointments
- **GET** `/doctors/appointments`
- **Auth**: Required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 6)
  - `status` (optional): Filter by status (pending, confirmed, completed, canceled)
  - `date` (optional): Filter by specific date
  - `search` (optional): Search by patient name
- **Response**: `200 OK` with appointments list and pagination info

---

## Admin Endpoints

### Authentication

#### Login Admin
- **POST** `/admins/login`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "AdminPassword123!",
    "recaptchaToken": "recaptcha-token-here"
  }
  ```
- **Response**: `200 OK` with success message

#### Logout Admin
- **POST** `/admins/logout`
- **Auth**: Required
- **Response**: `200 OK` with success message

### Profile Management

#### Get Admin Profile
- **GET** `/admins/profile`
- **Auth**: Required
- **Response**: `200 OK` with admin profile data

#### Get Patient by ID
- **GET** `/admins/patients/:id`
- **Auth**: Required (Admin)
- **Response**: `200 OK` with patient details

#### Get Doctor by ID
- **GET** `/admins/doctors/:id`
- **Auth**: Required (Admin)
- **Response**: `200 OK` with doctor details

### Admin Appointment Management

#### Create Appointment for Patient
- **POST** `/admins/patients/:id/appointments`
- **Auth**: Required (Admin)
- **Body**: Same as patient appointment creation
- **Response**: `201 Created` with appointment details

#### Get Patient Appointments
- **GET** `/admins/patients/:id/appointments`
- **Auth**: Required (Admin)
- **Query Parameters**: Same as patient appointments
- **Response**: `200 OK` with appointments list

#### Get Doctor Appointments
- **GET** `/admins/doctors/:id/appointments`
- **Auth**: Required (Admin)
- **Query Parameters**: Same as doctor appointments
- **Response**: `200 OK` with appointments list

---

## Common Endpoints

### Health Check
- **GET** `/check-server`
- **Response**: `200 OK` with server status

### Authentication Check
- **GET** `/check-auth`
- **Auth**: Required
- **Response**: `200 OK` with authentication status and user role

### 404 Handler
- **ALL** `/*` (unmatched routes)
- **Response**: `404 Not Found` with error details

---

## Response Status Codes

- **200 OK**: Successful GET request
- **201 Created**: Successful POST request (resource created)
- **400 Bad Request**: Invalid request data or validation errors
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Access denied (insufficient permissions)
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting middleware for production deployment.

## CORS Configuration

CORS is configured to allow requests from the frontend URL specified in the `FRONTEND_URL` environment variable. Credentials are enabled for cookie-based authentication.

## Security Headers

The API implements several security measures:
- HTTP-only cookies for JWT storage
- Secure cookie flags in production
- CORS origin validation
- Input validation and sanitization
- Password hashing with bcrypt
