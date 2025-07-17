# Database Schema

## Overview

MediSchedule uses MongoDB with Mongoose ODM for data modeling. The database consists of four main collections: Users (Patients, Doctors, Admins) and Appointments.

## Collections

### 1. Patients Collection

```javascript
{
  _id: ObjectId,
  fullName: String,              // Required, min 3 chars, lowercase
  email: String,                 // Required, unique, validated
  password: String,              // Required, hashed, min 8 chars
  phoneNumber: String,           // Required, validated
  dateOfBirth: Date,             // Optional
  gender: String,                // Enum: ['male', 'female']
  role: String,                  // Default: 'patient'
  medicalHistory: String,        // Optional
  tokens: [
    {
      token: String              // JWT tokens for sessions
    }
  ],
  createdAt: Date,               // Auto-generated
  updatedAt: Date                // Auto-generated
}
```

**Indexes:**
- `email` (unique)
- `createdAt` (sorting)

**Validation:**
- Email format validation
- Phone number validation
- Password complexity requirements

### 2. Doctors Collection

```javascript
{
  _id: ObjectId,
  fullName: String,              // Required, min 3 chars, lowercase
  email: String,                 // Required, unique, validated
  password: String,              // Required, hashed, min 8 chars
  specialization: String,        // Required
  qualifications: [String],      // Array of qualifications
  phoneNumber: String,           // Required, validated
  gender: String,                // Enum: ['male', 'female']
  role: String,                  // Default: 'doctor'
  availableTimeSlots: [
    {
      day: String,               // Enum: ['sunday', 'monday', ...]
      startTime: String,         // Format: "HH:mm"
      endTime: String,           // Format: "HH:mm"
      isAvailable: Boolean       // Default: true
    }
  ],
  tokens: [
    {
      token: String              // JWT tokens for sessions
    }
  ],
  createdAt: Date,               // Auto-generated
  updatedAt: Date                // Auto-generated
}
```

**Indexes:**
- `email` (unique)
- `specialization` (filtering)
- `createdAt` (sorting)

**Validation:**
- Email format validation
- Phone number validation
- Password complexity requirements
- Day enum validation

### 3. Admins Collection

```javascript
{
  _id: ObjectId,
  fullName: String,              // Required, min 3 chars, lowercase
  email: String,                 // Required, unique, validated
  password: String,              // Required, hashed, min 8 chars
  phoneNumber: String,           // Optional, validated
  role: String,                  // Default: 'admin'
  tokens: [
    {
      token: String              // JWT tokens for sessions
    }
  ],
  createdAt: Date,               // Auto-generated
  updatedAt: Date                // Auto-generated
}
```

**Indexes:**
- `email` (unique)
- `createdAt` (sorting)

### 4. Appointments Collection

```javascript
{
  _id: ObjectId,
  patient: ObjectId,             // Ref: Patient, required
  doctor: ObjectId,              // Ref: Doctor, required
  date: Date,                    // Required
  startTime: String,             // Required, format: "HH:mm"
  endTime: String,               // Required, format: "HH:mm"
  status: String,                // Enum: ['pending', 'confirmed', 'completed', 'canceled']
  reason: String,                // Optional
  notes: String,                 // Optional, default: ""
  createdBy: String,             // Enum: ['admin', 'patient']
  createdAt: Date,               // Auto-generated
  updatedAt: Date                // Auto-generated
}
```

**Indexes:**
- `patient` (filtering)
- `doctor` (filtering)
- `date` (filtering and sorting)
- `status` (filtering)
- `createdAt` (sorting)

**Compound Indexes:**
- `{patient: 1, date: 1}` (patient appointments by date)
- `{doctor: 1, date: 1}` (doctor appointments by date)
- `{doctor: 1, date: 1, startTime: 1}` (conflict detection)

## Relationships

### Patient → Appointments
- **Type**: One-to-Many
- **Relationship**: One patient can have multiple appointments
- **Reference**: `appointment.patient` → `patient._id`

### Doctor → Appointments
- **Type**: One-to-Many
- **Relationship**: One doctor can have multiple appointments
- **Reference**: `appointment.doctor` → `doctor._id`

### Doctor → Available Time Slots
- **Type**: One-to-Many (Embedded)
- **Relationship**: Each doctor has multiple time slots
- **Storage**: Embedded array in doctor document

## Data Validation

### Password Complexity
```javascript
{
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
}
```

### Email Validation
- Uses validator.js `isEmail()` function
- Automatically converts to lowercase
- Unique constraint enforced

### Phone Number Validation
- Uses validator.js `isMobilePhone()` function
- Supports international formats

### Time Format Validation
- Format: "HH:mm" (24-hour format)
- Examples: "09:00", "14:30", "23:59"

## Security Features

### Password Hashing
```javascript
// Pre-save hook
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
```

### JWT Token Management
```javascript
UserSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
  
  this.tokens = this.tokens.concat({ token })
  await this.save()
  return token
}
```

### Data Sanitization
- Automatic trimming of string fields
- Lowercase conversion for emails and names
- XSS protection through validation

## Aggregation Pipelines

### Appointment Queries with Population
```javascript
const pipeline = [
  { $match: { patient: ObjectId(patientId) } },
  {
    $lookup: {
      from: 'patients',
      localField: 'patient',
      foreignField: '_id',
      as: 'patient'
    }
  },
  {
    $lookup: {
      from: 'doctors',
      localField: 'doctor',
      foreignField: '_id',
      as: 'doctor'
    }
  },
  { $unwind: '$patient' },
  { $unwind: '$doctor' },
  {
    $project: {
      date: 1,
      startTime: 1,
      endTime: 1,
      status: 1,
      reason: 1,
      notes: 1,
      'patient.fullName': 1,
      'doctor.fullName': 1,
      'doctor.specialization': 1
    }
  },
  { $sort: { date: 1, startTime: 1 } }
]
```

## Performance Considerations

### Query Optimization
- Use indexes for frequently queried fields
- Limit results with pagination
- Project only necessary fields
- Use aggregation for complex queries

### Data Size Management
- Implement soft deletes for historical data
- Archive old appointments
- Limit token array size per user
- Compress large text fields

## Backup and Recovery

### Backup Strategy
- Daily automated backups
- Point-in-time recovery
- Cross-region replication
- Regular backup testing

### Data Retention
- Appointments: 7 years (medical records)
- User sessions: 30 days
- Logs: 90 days
- Audit trails: 2 years

## Environment-Specific Configurations

### Development
```javascript
{
  mongoUri: "mongodb://localhost:27017/medischedule_dev",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}
```

### Production
```javascript
{
  mongoUri: process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority',
    ssl: true
  }
}
```

## Migration Scripts

### Initial Setup
```javascript
// Create admin user
const admin = new AdminModel({
  fullName: 'System Admin',
  email: 'admin@medischedule.com',
  password: 'AdminPassword123!',
  role: 'admin'
})
await admin.save()

// Create indexes
await PatientModel.collection.createIndex({ email: 1 }, { unique: true })
await DoctorModel.collection.createIndex({ email: 1 }, { unique: true })
await AdminModel.collection.createIndex({ email: 1 }, { unique: true })
```

### Data Migration
- Version-controlled migration scripts
- Rollback procedures
- Data validation after migration
- Backup before migration

## Monitoring and Alerts

### Database Metrics
- Connection pool usage
- Query performance
- Index usage statistics
- Storage utilization

### Alert Thresholds
- High query response times (>1s)
- Connection pool exhaustion
- Storage usage >80%
- Failed authentication attempts

This schema provides a robust foundation for the MediSchedule application with proper relationships, validation, and security measures.
