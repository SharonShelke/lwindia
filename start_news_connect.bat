@echo off
echo ========================================================
echo   Starting NEWS CONNECT: International News Aggregator
echo ========================================================
echo.
echo Opening browser at http://localhost:3000 ...
start http://localhost:3000
echo Starting local aggregation server...
node server.js
pause

