@echo off
echo Starting ctfproject

:: Now start all development servers in separate windows
echo Starting development servers...
start powershell.exe -NoExit -Command "cd ./ctfproject; pnpm i; pnpm  dev"

:: Wait for 30 seconds (shorter wait since dependencies are already installed)
timeout /t 30 /nobreak > nul

:: Open default browser to localhost:3000
start http://localhost:3000

echo Browser opened to localhost:3000