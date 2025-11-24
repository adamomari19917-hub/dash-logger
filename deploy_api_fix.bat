@echo off
echo ====================================
echo Deploying API Fix to Vercel
echo ====================================
echo.

cd /d "%~dp0"

echo [1/3] Staging changes...
git add .

echo.
echo [2/3] Committing changes...
git commit -m "Fix: Update API endpoints for bot connection"

echo.
echo [3/3] Pushing to GitHub (Vercel auto-deploy)...
git push origin main

echo.
echo ====================================
echo Deployment Complete!
echo ====================================
echo.
echo Vercel will automatically deploy the changes.
echo Check your Vercel dashboard for deployment status.
echo.
echo Once deployed, restart your bot to test the connection.
echo.
pause
