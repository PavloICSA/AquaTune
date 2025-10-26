@echo off
echo ========================================
echo   Setting up Android SDK from Command Line Tools
echo ========================================
echo.

REM Ask user for command line tools path
set /p CMDTOOLS_PATH="Enter your Android command line tools path (e.g., C:\Android\cmdline-tools): "

if not exist "%CMDTOOLS_PATH%\bin\sdkmanager.bat" (
    echo ✗ Error: sdkmanager.bat not found at %CMDTOOLS_PATH%\bin\
    echo Please check the path and try again.
    pause
    exit /b 1
)

REM Set SDK root (parent of cmdline-tools)
for %%i in ("%CMDTOOLS_PATH%") do set "SDK_ROOT=%%~dpi"
set "SDK_ROOT=%SDK_ROOT:~0,-1%"

echo ✓ Command line tools found at: %CMDTOOLS_PATH%
echo ✓ SDK root will be: %SDK_ROOT%
echo.

REM Create SDK directory structure
echo Creating SDK directory structure...
if not exist "%SDK_ROOT%" mkdir "%SDK_ROOT%"

REM Set ANDROID_HOME temporarily
set ANDROID_HOME=%SDK_ROOT%

echo Installing required SDK components...
echo This may take several minutes...
echo.

REM Install platform-tools (includes adb)
echo [1/4] Installing platform-tools...
"%CMDTOOLS_PATH%\bin\sdkmanager.bat" "platform-tools"

REM Install build-tools (latest version)
echo [2/4] Installing build-tools...
"%CMDTOOLS_PATH%\bin\sdkmanager.bat" "build-tools;34.0.0"

REM Install Android platform (API 34 for target SDK)
echo [3/4] Installing Android platform...
"%CMDTOOLS_PATH%\bin\sdkmanager.bat" "platforms;android-34"

REM Install Android platform (API 24 for min SDK)
echo [4/4] Installing minimum Android platform...
"%CMDTOOLS_PATH%\bin\sdkmanager.bat" "platforms;android-24"

echo.
echo ========================================
echo   SDK Setup Complete!
echo ========================================
echo.

REM Create local.properties
echo Creating local.properties file...
echo # Location of the SDK. This is only used by Gradle. > local.properties
echo sdk.dir=%SDK_ROOT:\=\\% >> local.properties

echo ✓ local.properties created with SDK path: %SDK_ROOT%
echo.

REM Verify installation
if exist "%SDK_ROOT%\platform-tools\adb.exe" (
    echo ✓ Platform tools installed successfully
) else (
    echo ✗ Platform tools installation failed
)

if exist "%SDK_ROOT%\build-tools\34.0.0" (
    echo ✓ Build tools installed successfully
) else (
    echo ✗ Build tools installation failed
)

echo.
echo You can now run: .\build-apk.bat
echo.
pause