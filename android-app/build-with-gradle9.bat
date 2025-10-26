@echo off
echo ========================================
echo   Building with Gradle 9.0
echo ========================================
echo.

echo Stopping any running Gradle daemons...
gradle --stop

echo.
echo Cleaning project...
gradle clean

echo.
echo Building debug APK...
gradle assembleDebug

echo.
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo ✓ APK built successfully!
    echo Location: app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo File size:
    dir "app\build\outputs\apk\debug\app-debug.apk"
) else (
    echo ✗ APK build failed
    echo.
    echo Try running with more details:
    echo gradle assembleDebug --stacktrace --info
)

echo.
pause