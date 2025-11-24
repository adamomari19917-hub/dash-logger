@echo off
echo ==========================================
echo      Push Debug Update
echo ==========================================

:: Hardcoded user info
set name=adamomari19917-hub
set email=adamomari19917@gmail.com

:: Configure local git user
call git config user.name "%name%"
call git config user.email "%email%"

echo.
echo [INFO] Committing debug changes...
call git add .
call git commit -m "Debug: Add health check endpoint"

echo.
echo [INFO] Pushing to GitHub...
call git push origin master

echo.
echo [SUCCESS] Debug update pushed! Vercel is redeploying.
echo.
pause
