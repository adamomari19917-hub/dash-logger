@echo off
echo ==========================================
echo      Fix Server Crash
echo ==========================================

:: Hardcoded user info
set name=adamomari19917-hub
set email=adamomari19917@gmail.com

:: Configure local git user
call git config user.name "%name%"
call git config user.email "%email%"

echo.
echo [INFO] Committing crash fix...
call git add .
call git commit -m "Fix: Downgrade node-fetch and guard DB connection"

echo.
echo [INFO] Pushing to GitHub...
call git push origin master

echo.
echo [SUCCESS] Fix pushed! Vercel should redeploy automatically.
echo.
pause
