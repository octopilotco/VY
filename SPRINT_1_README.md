# Vyxlo Backend - Sprint 1 Implementation

## Overview

Sprint 1 implements the foundational serverless backend infrastructure for Vyxlo using only Vercel services. This includes authentication, user management, and core API structure.

## Architecture

### Technology Stack
- **Runtime**: Node.js 20.x (Vercel Serverless Functions)
- **Database**: Neon PostgreSQL (Vercel Integration)
- **Auth**: Custom JWT-based authentication with bcrypt
- **API**: REST endpoints in `/api/v1/`
- **Frontend**: React hooks for API integration

### Database Schema

The following tables have been created:

1. **users** - User accounts with email/password authentication
2. **organizations** - Multi-tenant organization structure
3. **projects** - AI projects within organizations
4. **sessions** - Secure session management with refresh tokens
5. **api_keys** - API key management for external access
6. **posts** - User-generated content system
7. **usage** - Token usage tracking for AI operations
8. **audit_logs** - Comprehensive audit trail

## Implemented Features

### Authentication System
- ✅ User registration with email validation
- ✅ Secure password hashing (bcrypt)
- ✅ JWT-based session management
- ✅ Access token (15min) + Refresh token (7 days)
- ✅ HTTP-only secure cookies
- ✅ Token refresh mechanism
- ✅ Logout with session cleanup

### API Endpoints

#### Health Check
- `GET /api/v1/health` - Service health status

#### Authentication
- `POST /api/v1/auth/register` - Create new user account
- `POST /api/v1/auth/login` - Authenticate user
- `POST /api/v1/auth/logout` - End user session
- `POST /api/v1/auth/refresh` - Refresh access token

#### User Management
- `GET /api/v1/users/me` - Get current user profile (protected)

### Security Features
- Password hashing with bcrypt (12 rounds)
- JWT tokens with secure signing (HS256)
- HTTP-only cookies with SameSite protection
- Session expiration and cleanup
- Input validation with Zod schemas
- SQL injection protection via parameterized queries
- Comprehensive error handling

## File Structure

```
/vercel/share/v0-project/
├── api/v1/                          # API endpoints
│   ├── health.ts                    # Health check
│   ├── auth/
│   │   ├── register.ts              # User registration
│   │   ├── login.ts                 # User login
│   │   ├── logout.ts                # User logout
│   │   └── refresh.ts               # Token refresh
│   └── users/
│       └── me.ts                    # User profile
├── src/
│   ├── server/
│   │   ├── db/
│   │   │   └── client.ts            # PostgreSQL client
│   │   ├── services/
│   │   │   └── auth.ts              # Auth business logic
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT verification
│   │   └── utils/
│   │       ├── errors.ts            # Error classes
│   │       ├── cookie.ts            # Cookie helpers
│   │       └── validators.ts        # Zod schemas
│   ├── types/
│   │   └── models.ts                # TypeScript types
│   └── hooks/
│       └── useAuthApi.tsx           # React auth hook
├── infra/
│   ├── migrations/
│   │   └── 20260217_000001_create_core_tables.sql
│   └── env.example                  # Environment template
└── vercel.json                      # Vercel configuration
```

## Environment Variables

Required environment variables (see `infra/env.example`):

```env
# Database (automatically set by Neon integration)
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...

# JWT Configuration
JWT_SECRET=your-secret-key-min-32-chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Application
NODE_ENV=production
VERCEL_URL=your-app.vercel.app
```

## Usage

### Frontend Integration

Use the `useAuthApi` hook in React components:

```tsx
import { useAuthApi } from '@/hooks/useAuthApi';

function MyComponent() {
  const { register, login, logout, getCurrentUser, loading, error } = useAuthApi();

  const handleRegister = async () => {
    const result = await register({
      email: 'user@example.com',
      password: 'securePassword123',
      username: 'john_doe',
      full_name: 'John Doe'
    });
    
    if (result.success) {
      console.log('User registered:', result.data);
    }
  };

  const handleLogin = async () => {
    const result = await login({
      email: 'user@example.com',
      password: 'securePassword123'
    });
    
    if (result.success) {
      console.log('Logged in:', result.data);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### API Usage Examples

#### Register a New User
```bash
curl -X POST https://your-app.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "username": "john_doe",
    "full_name": "John Doe"
  }'
```

#### Login
```bash
curl -X POST https://your-app.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }' \
  -c cookies.txt
```

#### Get Current User (Protected)
```bash
curl https://your-app.vercel.app/api/v1/users/me \
  -b cookies.txt
```

#### Refresh Token
```bash
curl -X POST https://your-app.vercel.app/api/v1/auth/refresh \
  -b cookies.txt \
  -c cookies.txt
```

#### Logout
```bash
curl -X POST https://your-app.vercel.app/api/v1/auth/logout \
  -b cookies.txt
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {}
  }
}
```

Error codes:
- `VALIDATION_ERROR` - Invalid input data
- `UNAUTHORIZED` - Missing or invalid authentication
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `INTERNAL_ERROR` - Server error

## Database Operations

The system uses parameterized queries with `pg` for all database operations:

```typescript
import { query } from '@/server/db/client';

// Example query
const result = await query(
  'SELECT * FROM users WHERE email = $1',
  ['user@example.com']
);
```

## Security Best Practices Implemented

1. **Password Security**
   - Bcrypt hashing with 12 rounds
   - Minimum 8 characters required
   - Never stored in plain text

2. **Token Security**
   - JWT with HS256 signing
   - Short-lived access tokens (15 minutes)
   - Secure refresh tokens (7 days)
   - Automatic token rotation

3. **Cookie Security**
   - HTTP-only cookies (no JS access)
   - Secure flag in production
   - SameSite=Strict protection
   - Proper path scoping

4. **SQL Injection Protection**
   - All queries use parameterized statements
   - No string concatenation in SQL

5. **Input Validation**
   - Zod schema validation on all inputs
   - Email format validation
   - Password strength requirements

## Testing

### Manual Testing
1. Start the dev server: `npm run dev`
2. Test health endpoint: `http://localhost:3000/api/v1/health`
3. Use the provided curl examples above

### Database Verification
Check tables were created correctly:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

## Next Steps (Sprint 2+)

- [ ] Organization management endpoints
- [ ] Project CRUD operations
- [ ] API key generation and validation
- [ ] File upload with Vercel Blob
- [ ] Rate limiting with Vercel KV
- [ ] AI integration endpoints
- [ ] Usage tracking and billing
- [ ] Admin dashboard

## Troubleshooting

### Database Connection Issues
- Verify `POSTGRES_URL` is set correctly
- Check Neon integration is connected in Vercel
- Ensure database is not sleeping (Neon free tier)

### Authentication Issues
- Verify `JWT_SECRET` is at least 32 characters
- Check cookies are being sent with requests
- Ensure `VERCEL_URL` matches your deployment URL

### CORS Issues
- Add your frontend domain to `vercel.json` headers
- Verify credentials are included in fetch requests

## Support

For issues or questions:
1. Check the error logs in Vercel dashboard
2. Verify environment variables are set
3. Review the API documentation above
4. Check database connection and schema

## License

Proprietary - Vyxlo Backend System
