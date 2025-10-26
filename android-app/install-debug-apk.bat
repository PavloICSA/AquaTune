@echo off
echo ========================================
echo   Installing AquaTune Debug APK
echo ========================================
echo.

REM Check if APK exists
if not exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo ✗ Debug APK not found!
    echo Please run build-apk.bat first to build the APK.
    pause
    exit /b 1
)

REM Check if ADB is available
adb version >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ ADB not found!
    echo Please ensure Android SDK is properly installed and in PATH.
    pause
    exit /b 1
)

echo Checking connected devices...
adb devices
echo.

echo Installing APK...
adb install -r app\build\outputs\apk\debug\app-debug.apk

if %errorlevel% equ 0 (
    echo.
    echo ✓ APK installed successfully!
    echo You can now find "AquaTune" in your device's app drawer.
) else (
    echo.
    echo ✗ Installation failed!
    echo Make sure:
    echo   1. USB debugging is enabled on your device
    echo   2. Device is connected and authorized
    echo   3. You have sufficient storage space
)

echo.
pause