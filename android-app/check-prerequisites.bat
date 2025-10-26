@echo off
echo ========================================
echo   AquaTune APK Build Prerequisites Check
echo ========================================
echo.

REM Check Java
echo [1/4] Checking Java installation...
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Java is installed
    java -version
) else (
    echo ✗ Java is NOT installed
    echo Please install Java JDK 8 or higher
)
echo.

REM Check Android SDK
echo [2/4] Checking Android SDK...
if exist "%ANDROID_HOME%\platform-tools\adb.exe" (
    echo ✓ Android SDK found at: %ANDROID_HOME%
) else if exist "%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" (
    echo ✓ Android SDK found at: %LOCALAPPDATA%\Android\Sdk
) else (
    echo ✗ Android SDK not found
    echo Please install Android Studio or Android SDK
)
echo.

REM Check Gradle Wrapper
echo [3/4] Checking Gradle Wrapper...
if exist "gradlew.bat" (
    echo ✓ Gradle Wrapper found
) else (
    echo ✗ Gradle Wrapper not found
    echo Please ensure you're in the android-app directory
)
echo.

REM Check project structure
echo [4/4] Checking project structure...
if exist "app\build.gradle.kts" (
    echo ✓ Project structure is correct
) else (
    echo ✗ Project structure issue
    echo Please ensure you're in the android-app directory
)
echo.

echo ========================================
echo Prerequisites check complete!
echo ========================================
pause