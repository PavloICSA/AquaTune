@echo off
echo ========================================
echo   Setting up SDK at F:\Android
echo ========================================
echo.

set "SDK_ROOT=F:\Android"
set "CMDTOOLS_PATH=F:\Android\cmdline-tools"

REM Check different possible structures
if exist "%CMDTOOLS_PATH%\bin\sdkmanager.bat" (
    set "SDKMANAGER=%CMDTOOLS_PATH%\bin\sdkmanager.bat"
    echo ✓ Found sdkmanager at: %SDKMANAGER%
) else if exist "%CMDTOOLS_PATH%\latest\bin\sdkmanager.bat" (
    set "SDKMANAGER=%CMDTOOLS_PATH%\latest\bin\sdkmanager.bat"
    echo ✓ Found sdkmanager at: %SDKMANAGER%
) else (
    echo ✗ sdkmanager.bat not found!
    echo Checked:
    echo   - %CMDTOOLS_PATH%\bin\sdkmanager.bat
    echo   - %CMDTOOLS_PATH%\latest\bin\sdkmanager.bat
    pause
    exit /b 1
)

echo.
echo Installing SDK components...
echo This will take a few minutes...
echo.

REM Accept licenses first
echo y | "%SDKMANAGER%" --licenses

REM Install required components
echo [1/4] Installing platform-tools...
"%SDKMANAGER%" "platform-tools"

echo [2/4] Installing build-tools...
"%SDKMANAGER%" "build-tools;34.0.0"

echo [3/4] Installing Android 14 platform...
"%SDKMANAGER%" "platforms;android-34"

echo [4/4] Installing Android 7 platform...
"%SDKMANAGER%" "platforms;android-24"

echo.
echo Creating local.properties...
echo # Location of the SDK. This is only used by Gradle. > local.properties
echo sdk.dir=F:\\Android >> local.properties

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.

REM Verify installation
if exist "F:\Android\platform-tools\adb.exe" (
    echo ✓ Platform tools installed
) else (
    echo ✗ Platform tools missing
)

if exist "F:\Android\build-tools\34.0.0" (
    echo ✓ Build tools installed
) else (
    echo ✗ Build tools missing
)

echo.
echo Ready to build! Run: .\gradlew.bat clean assembleDebug
echo.
pause