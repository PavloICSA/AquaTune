@echo off
echo ========================================
echo   Accepting Licenses and Building APK
echo ========================================
echo.

set "SDKMANAGER=F:\Android\cmdline-tools\latest\bin\sdkmanager.bat"

echo [1/5] Accepting all licenses...
echo y | "%SDKMANAGER%" --licenses

echo.
echo [2/5] Installing platform-tools...
"%SDKMANAGER%" "platform-tools"

echo.
echo [3/5] Installing build-tools...
"%SDKMANAGER%" "build-tools;34.0.0"

echo.
echo [4/5] Installing Android platforms...
"%SDKMANAGER%" "platforms;android-34"
"%SDKMANAGER%" "platforms;android-24"

echo.
echo [5/5] Building APK...
.\gradlew.bat clean assembleDebug

echo.
echo ========================================
echo   Complete!
echo ========================================
echo.

if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo ✓ APK created successfully!
    echo Location: app\build\outputs\apk\debug\app-debug.apk
) else (
    echo ✗ APK build failed
)

echo.
pause