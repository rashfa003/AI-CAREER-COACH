@echo off
echo === Prisma EPERM Fix for Windows ===
echo.

REM Step 1: Kill all Node processes
echo Step 1: Stopping Node.js processes...
taskkill /f /im node.exe /t 2>nul
taskkill /f /im npm.cmd /t 2>nul
taskkill /f /im npx.cmd /t 2>nul
timeout /t 3 /nobreak >nul
echo ✓ Processes stopped
echo.

REM Step 2: Clean up files
echo Step 2: Cleaning up locked files...
if exist ".next" (
    echo Removing .next...
    rmdir /s /q ".next" 2>nul
)
if exist "node_modules\.prisma" (
    echo Removing Prisma cache...
    rmdir /s /q "node_modules\.prisma" 2>nul
)
if exist "node_modules\@prisma\client" (
    echo Removing Prisma client...
    rmdir /s /q "node_modules\@prisma\client" 2>nul
)
echo ✓ Files cleaned
echo.

REM Step 3: Clear npm cache
echo Step 3: Clearing npm cache...
call npm cache clean --force
echo ✓ Cache cleared
echo.

REM Step 4: Reinstall dependencies
echo Step 4: Reinstalling dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Step 5: Generate Prisma client
echo Step 5: Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate Prisma client
    pause
    exit /b 1
)
echo ✓ Prisma client generated
echo.

REM Step 6: Start dev server
echo Step 6: Starting development server...
echo The dev server will start in a new window...
start cmd /k "npm run dev"
echo ✓ Dev server starting...
echo.

echo 🎉 FIX COMPLETED!
echo Your Prisma EPERM error should be resolved.
echo Check http://localhost:3000 in your browser.
echo.
pause