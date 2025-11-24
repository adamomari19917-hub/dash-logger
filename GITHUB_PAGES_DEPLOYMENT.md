# GitHub Pages Deployment Guide

This document explains how to deploy the Logger Bot Dashboard to GitHub Pages.

## Overview

The dashboard is configured to automatically deploy to GitHub Pages whenever you push to the `main` branch. The deployment is handled by GitHub Actions.

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/adamomari19917-hub/dash-logger
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Push Changes to GitHub

Once you've enabled GitHub Pages, push your changes:

```bash
cd c:\Users\Anass\Desktop\Version 1.5\dash\dash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see the workflow running ("Deploy to GitHub Pages")
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, your site will be live at: **https://adamomari19917-hub.github.io/dash-logger**

## Important Notes

### API Hosting

> [!WARNING]
> GitHub Pages only hosts **static files** (HTML, CSS, JavaScript). Your API backend must be hosted separately.

**Current Setup:**
- Frontend (React): GitHub Pages
- Backend API: Vercel (based on existing `vercel.json` configuration)

Make sure your API remains hosted on Vercel or another platform that supports Node.js applications.

### Environment Variables

The React client uses environment variables for API configuration. Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=https://your-api-url.vercel.app
```

For GitHub Pages deployment, you may need to update the API URL in your React code to point to your production API.

## Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) automatically:
1. Checks out your code
2. Installs dependencies
3. Builds the React application
4. Deploys to GitHub Pages

## Troubleshooting

### Build Failures

If the build fails, check the Actions tab for error logs. Common issues:
- Missing dependencies
- Build errors in React code
- Node.js version mismatch

### 404 Errors

If you get 404 errors when navigating:
1. Ensure the `homepage` field in `client/package.json` matches your GitHub Pages URL
2. Use `HashRouter` instead of `BrowserRouter` in React Router (if applicable)

### API Connection Issues

If the frontend can't connect to the API:
1. Check that your API is running on Vercel
2. Verify CORS settings allow requests from your GitHub Pages domain
3. Update API URLs in your React code to use production endpoints

## Manual Deployment

To manually trigger a deployment:
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages"
3. Click **Run workflow**
4. Select `main` branch and click **Run workflow**
