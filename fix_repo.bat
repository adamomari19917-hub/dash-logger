@echo off
echo ==========================================
echo      Fix GitHub Repo (Website Only)
echo ==========================================

:: Hardcoded user info
set name=adamomari19917-hub
set email=adamomari19917@gmail.com
set repoUrl=https://github.com/adamomari19917-hub/dash-logger

:: Go up one level to the root 'dash' folder
cd ..

:: Check if .git exists in the root and delete it
if exist ".git" (
    echo [INFO] Removing old Git repository from root folder...
    rmdir /s /q .git
)

:: Go back to the website folder
cd dash

:: Reset local git if it exists to be safe
if exist ".git" (
    echo [INFO] Resetting local git...
    rmdir /s /q .git
)

:: Initialize new git
echo.
echo [INFO] Initializing new Git repository...
call git init

:: Configure user BEFORE commit (This was the error)
echo.
echo [INFO] Configuring Git user...
call git config user.name "%name%"
call git config user.email "%email%"

echo.
echo [INFO] Committing files...
call git add .
call git commit -m "Deploying website only"

:: Ensure branch is master
call git branch -M master

:: Setup remote
echo.
echo [INFO] Setting up remote...
call git remote remove origin 2>nul
call git remote add origin %repoUrl%

:: Push
echo.
echo [INFO] Pushing to GitHub...
call git push -f origin master

echo.
echo [SUCCESS] Done! Now your GitHub repo only contains the website.
echo You can now go to Vercel and deploy it.
echo.
pause
