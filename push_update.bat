@echo off
echo ==========================================
echo      Update Vercel Config
echo ==========================================

:: Hardcoded user info
set name=adamomari19917-hub
set email=adamomari19917@gmail.com

:: Configure local git user
call git config user.name "%name%"
call git config user.email "%email%"

echo.
echo [INFO] Committing changes...
call git add .
call git commit -m "Refactor: Use standard Vercel API structure"

echo.
echo [INFO] Pushing to GitHub...
call git push origin master

echo.
echo [SUCCESS] Changes pushed!
echo.
echo IMPORTANT: You might need to update Vercel Settings.
echo Please read the instructions in the chat.
echo.
pause
