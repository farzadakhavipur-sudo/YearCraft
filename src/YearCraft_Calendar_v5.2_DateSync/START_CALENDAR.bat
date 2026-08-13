@echo off
setlocal
cd /d "%~dp0"
start "" http://127.0.0.1:8765/
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 8765 --bind 127.0.0.1
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 8765 --bind 127.0.0.1
  goto :eof
)
echo Python was not found. You can still double-click index.html to open the calendar.
pause
