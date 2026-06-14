@echo off
setlocal
title H2 Architecture AI Dev Server
cd /d "%~dp0"

echo.
echo ========================================
echo  H2 Architecture AI Dev Server
echo ========================================
echo.
echo Project folder:
echo %~dp0
echo.
echo Starting...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-dev.ps1"

echo.
echo Helper exited with code %ERRORLEVEL%.
echo If the browser did not open, copy this URL:
echo http://127.0.0.1:3000
echo.
pause
endlocal
