@echo off
echo ========================================
echo   Building AquaTune APK
echo ========================================
echo.

REM Check if gradlew exists
if not exist "gradlew.bat" (
    echo ✗ Error: gradlew.bat not found!
    echo Please make sure you're in the android-app directory.
    pause
    exit /b 1
)

REM Check if local.properties exists
if not exist "local.properties" (
    echo ✗ Error: local.properties not found!
    echo Please run setup-sdk-path.bat first to configure Android SDK.
    pause
    exit /b 1
)

echo [1/4] Cleaning project...
call gradlew.bat clean
if %errorlevel% neq 0 (
    echo ✗ Clean failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Building debug APK...
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo ✗ Debug build failed!
    pause
    exit /b 1
)

echo.
echo [3/4] Building release APK...
call gradlew.bat assembleRelease
if %errorlevel% neq 0 (
    echo ✗ Release build failed!
    pause
    exit /b 1
)

echo.
echo [4/4] Checking output files...
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo ✓ Debug APK created successfully!
) else (
    echo ✗ Debug APK not found!
)

if exist "app\build\outputs\apk\release\app-release-unsigned.apk" (
    echo ✓ Release APK created successfully!
) else (
    echo ✗ Release APK not found!
)

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo 📱 APK Files:
echo   Debug APK:   app\build\outputs\apk\debug\app-debug.apk
echo   Release APK: app\build\outputs\apk\release\app-release-unsigned.apk
echo.
echo 📋 Next Steps:
echo   1. For testing: Install app-debug.apk directly
echo   2. For distribution: Sign the release APK first
echo.
echo 💡 To install debug APK:
echo   adb install app\build\outputs\apk\debug\app-debug.apk
echo.
pause