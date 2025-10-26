@echo off
echo Building AquaTune Web Application for Netlify...
cd web-app
call npm install
call npm run build

echo Copying deployment files...
copy _redirects dist\_redirects
copy netlify.toml dist\netlify.toml

echo.
echo ========================================
echo BUILD COMPLETE!
echo ========================================
echo.
echo Your app is ready for deployment in: web-app\dist\
echo.
echo MANUAL DEPLOYMENT OPTIONS:
echo.
echo 1. NETLIFY DRAG & DROP:
echo    - Go to https://app.netlify.com/drop
echo    - Drag the 'web-app\dist' folder to the deployment area
echo    - Your app will be deployed instantly
echo.
echo 2. NETLIFY CLI (if authenticated):
echo    - Run: netlify deploy --prod --dir=dist
echo.
echo 3. GITHUB INTEGRATION:
echo    - Push to GitHub repository
echo    - Connect repository in Netlify dashboard
echo    - Auto-deploy on commits
echo.
echo Files ready for deployment:
dir dist
echo.
pause