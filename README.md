# Looply — QR Code Loyalty Rewards Application

Looply is a full-stack web application that allows users to earn and track loyalty points by scanning dynamically generated QR codes. Built with Next.js, PostgreSQL, Prisma, and Auth.js, Looply demonstrates user authentication, time-limited QR generation, point transaction tracking, and database-driven dashboards.

The project is designed as a functional prototype of a digital loyalty rewards system, with a simple and accessible user experience.

## Features

### User Authentication
- User registration and login using email and password
- Secure password hashing with bcrypt
- JWT-based sessions managed through Auth.js (NextAuth)
- Protected dashboard and QR claiming routes

### QR Code Generation
- Dynamically generated QR codes with unique UUID tokens
- Automatic QR rotation every 30 seconds
- Time-limited tokens stored in PostgreSQL
- Demo display with a clickable claim URL for testing

### Automatic Point Claiming
- Automatically processes QR claims when authenticated users open a valid claim URL
- Redirects unauthenticated users to the login page
- Validates QR token existence and expiration
- Prevents repeated claims of the same QR code using database uniqueness constraints
- Records successful claims as point transactions

### User Dashboard
- Displays the authenticated user's total earned points
- Shows the five most recent point transactions
- Retrieves transaction records directly from PostgreSQL
- Updates the displayed balance when the dashboard loads after a successful claim

### User Interface
- Responsive layout using Tailwind CSS
- Custom purple-themed branding and typography
- Landing page with scroll-reveal animations
- Dedicated login, registration, dashboard, and demo QR display pages

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, JavaScript |
| Styling | Tailwind CSS, Nunito |
| Backend | Next.js Route Handlers |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Auth.js (NextAuth v5), bcryptjs |
| QR Generation | qrcode.react |
| Version Control | Git, GitHub |

## How It Works

1. **Register or log in:** Users create an account and authenticate using their credentials.
2. **Generate a QR code:** The demo display requests a unique QR token from the backend.
3. **Scan or open the QR:** Users navigate to a URL containing the generated token.
4. **Validate the claim:** The backend checks authentication, QR expiration, and previous claims.
5. **Earn points:** A successful claim creates a transaction in PostgreSQL.
6. **View the dashboard:** Users are redirected to their dashboard, where their updated points balance and recent activity are displayed.

### QR Claim Flow

```text
QR Code Generated
       |
       v
User Opens Claim URL
       |
       v
Authentication Check
       |
       +--- Not Logged In ---> Login
       |                        |
       |<-----------------------+
       |
       v
QR Token Validation
       |
       +--- Invalid / Expired ---> Claim Rejected
       |
       v
Duplicate Claim Check
       |
       +--- Already Claimed ---> Claim Rejected
       |
       v
Save Point Transaction
       |
       v
Redirect to Dashboard
       |
       v
Display Updated Balance
```

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js
│   │   ├── claim/
│   │   │   └── route.js
│   │   ├── display/
│   │   │   └── route.js
│   │   └── signup/
│   │       └── route.js
│   ├── claim/
│   │   └── [token]/
│   │       ├── page.js
│   │       └── ClaimClient.js
│   ├── dashboard/
│   │   └── page.js
│   ├── display/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── signup/
│   │   └── page.js
│   └── page.js
├── components/
│   └── ScrollReveal.js
├── generated/
│   └── prisma/
├── lib/
│   └── prisma.js
└── auth.js

prisma/
└── schema.prisma

public/
└── looply-logo.png
```

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL (local or hosted)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Crific/looply.git
cd looply
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the following variables:

```dotenv
DATABASE_URL="your-postgresql-connection-string"
AUTH_SECRET="your-secure-random-secret"
```

A secure Auth.js secret can be generated using:

```bash
openssl rand -base64 32
```

Depending on your Prisma setup, database connection settings may also be configured in `prisma.config.ts`.

Never commit `.env` files or real credentials to version control.

### 4. Start PostgreSQL

Make sure your configured PostgreSQL database is running.

If using Prisma's local development database, start it with:

```bash
npx prisma dev start default
```

### 5. Set up Prisma

Apply the existing database migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 6. Start the application

```bash
npm run dev
```

Open:

http://localhost:3000

## Testing the Demo

1. Create an account through `/signup`.
2. Log in through `/login`.
3. Visit `/display` to access the Demo QR Display.
4. Click the generated claim URL before the QR code expires.
5. The application validates the claim and awards 10 points.
6. After a successful claim, the application redirects to `/dashboard`.
7. Verify the updated balance and recent transaction activity.

To inspect database records during development, run:

```bash
npx prisma studio
```

**Note:** The QR code currently expires after 30 seconds. A QR may expire during login or before the user completes the claim.

## Current Limitations

Looply is an MVP intended for learning and portfolio demonstration rather than production use.

- QR generation is currently accessible through the demo endpoint without merchant-specific authorization.
- Points can be earned from successive newly generated QR codes.
- Rate limiting and comprehensive abuse prevention are not yet implemented.
- Merchant management and reward redemption are not yet available.
- Error handling and edge-case testing are still being improved.

## Planned Improvements

- Merchant authentication and QR generation permissions
- Improved claim validation and anti-abuse protections
- QR expiration and refresh improvements
- Reward redemption functionality
- Expanded user dashboard features
- Additional testing and production deployment

## Project Goals

Looply was developed to explore full-stack application development using Next.js and PostgreSQL, with a focus on:

- Integrating authentication into protected application workflows
- Designing REST-style API endpoints using Next.js Route Handlers
- Modeling and querying relational data with Prisma
- Implementing time-sensitive QR tokens and point-claim validation
- Connecting frontend interactions to persistent backend data
- Building a consistent, responsive user interface

## Author

**Justin Ryan Isidro**

B.S. Computer Science — San Francisco State University

GitHub: https://github.com/Crific


