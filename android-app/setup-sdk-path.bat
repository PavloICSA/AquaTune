@echo off
echo ========================================
echo   Setting up Android SDK Path
echo ========================================
echo.

REM Try to find Android SDK automatically
set SDK_PATH=
if exist "%ANDROID_HOME%\platform-tools\adb.exe" (
    set SDK_PATH=%ANDROID_HOME%
) else if exist "%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" (
    set SDK_PATH=%LOCALAPPDATA%\Android\Sdk
) else if exist "C:\Users\%USERNAME%\AppData\Local\Android\Sdk\platform-tools\adb.exe" (
    set SDK_PATH=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
)

if defined SDK_PATH (
    echo Found Android SDK at: %SDK_PATH%
    echo.
    echo Creating local.properties file...
    echo # Location of the SDK. This is only used by Gradle. > local.properties
    echo # For customization when using a Version Control System, please read the >> local.properties
    echo # header note. >> local.properties
    echo sdk.dir=%SDK_PATH:\=\\% >> local.properties
    echo.
    echo ✓ local.properties created successfully!
) else (
    echo ✗ Android SDK not found automatically.
    echo.
    echo Please enter the path to your Android SDK:
    echo (Usually: C:\Users\%USERNAME%\AppData\Local\Android\Sdk)
    echo.
    set /p USER_SDK_PATH="SDK Path: "
    
    if exist "!USER_SDK_PATH!\platform-tools\adb.exe" (
        echo.
        echo Creating local.properties file...
        echo # Location of the SDK. This is only used by Gradle. > local.properties
        echo # For customization when using a Version Control System, please read the >> local.properties
        echo # header note. >> local.properties
        echo sdk.dir=!USER_SDK_PATH:\=\\! >> local.properties
        echo.
        echo ✓ local.properties created successfully!
    ) else (
        echo.
        echo ✗ Invalid SDK path. Please check and try again.
    )
)

echo.
pause