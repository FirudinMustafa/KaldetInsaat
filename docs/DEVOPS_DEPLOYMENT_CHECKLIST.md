# KalDet Insaat DevOps Deployment Checklist

## Scope

This document standardizes local development, CI/CD and deployment checks for the SE DevOps task scope.

## Local Development Commands

npm install
npm run db:generate
npm run db:push
npm run typecheck
npm run lint
npm run build

## Local Database

The local PostgreSQL service runs on an isolated port to avoid conflicts with other local projects.

Docker command:

docker compose -f docker-compose.dev.yml up -d

Local DATABASE_URL example:

DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:55432/kaldet_insaat?schema=public"

## Required Environment Variables

DATABASE_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SITE_NAME

Secret values must not be committed to the repository.

## Build Strategy

The build command does not run prisma db push.

Correct separation:

npm run db:push
Synchronizes the database schema.

npm run build
Generates Prisma Client and runs Next.js production build.

This separation makes CI/CD and Vercel deployment safer.

## CI Pipeline

GitHub Actions checks:

1. npm ci
2. Prisma Client generate
3. Prisma schema validate
4. Prisma db push
5. ESLint
6. TypeScript check
7. Next.js production build

## Deployment Notes

Production environment variables must be configured in Vercel.

.env must never be committed.

Pull requests should pass CI before merge.

Major dependency upgrades should be handled in a separate branch and pull request.
