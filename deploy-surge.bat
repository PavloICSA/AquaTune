@echo off
echo Building AquaTune Web Application...
cd web-app
call npm install
call npm run build

echo Creating CNAME file for custom domain...
echo aqua-tune.surge.sh > dist\CNAME

echo Deploying to Surge.sh...
surge dist aqua-tune.surge.sh

echo.
echo Deployment complete!
echo Your app should be available at: https://aqua-tune.surge.sh
pause