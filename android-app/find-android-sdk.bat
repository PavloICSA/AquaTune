@echo off
echo ========================================
echo   Finding Android SDK on Your System
echo ========================================
echo.

echo Checking common locations...
echo.

REM Check environment variables first
if defined ANDROID_HOME (
    echo ✓ Found ANDROID_HOME: %ANDROID_HOME%
    if exist "%ANDROID_HOME%\platform-tools\adb.exe" (
        echo ✓ Valid SDK found at: %ANDROID_HOME%
        goto :found
    )
)

if defined ANDROID_SDK_ROOT (
    echo ✓ Found ANDROID_SDK_ROOT: %ANDROID_SDK_ROOT%
    if exist "%ANDROID_SDK_ROOT%\platform-tools\adb.exe" (
        echo ✓ Valid SDK found at: %ANDROID_SDK_ROOT%
        goto :found
    )
)

REM Check default locations
echo Checking default locations...

set "DEFAULT_PATH=C:\Users\%USERNAME%\AppData\Local\Android\Sdk"
if exist "%DEFAULT_PATH%\platform-tools\adb.exe" (
    echo ✓ Found Android SDK at: %DEFAULT_PATH%
    goto :found
)

set "STUDIO_PATH=C:\Program Files\Android\Android Studio\sdk"
if exist "%STUDIO_PATH%\platform-tools\adb.exe" (
    echo ✓ Found Android SDK at: %STUDIO_PATH%
    goto :found
)

set "STUDIO_PATH2=C:\Android\Sdk"
if exist "%STUDIO_PATH2%\platform-tools\adb.exe" (
    echo ✓ Found Android SDK at: %STUDIO_PATH2%
    goto :found
)

REM Search in Program Files
echo Searching in Program Files...
for /d %%i in ("C:\Program Files\Android\*") do (
    if exist "%%i\sdk\platform-tools\adb.exe" (
        echo ✓ Found Android SDK at: %%i\sdk
        goto :found
    )
)

REM Search user directory
echo Searching user directories...
for /d %%i in ("C:\Users\%USERNAME%\*Android*") do (
    if exist "%%i\Sdk\platform-tools\adb.exe" (
        echo ✓ Found Android SDK at: %%i\Sdk
        goto :found
    )
)

echo.
echo ✗ Android SDK not found automatically.
echo.
echo Please check these locations manually:
echo   1. C:\Users\%USERNAME%\AppData\Local\Android\Sdk
echo   2. C:\Program Files\Android\Android Studio\sdk
echo   3. C:\Android\Sdk
echo   4. Where you installed Android Studio
echo.
echo Or install Android Studio from: https://developer.android.com/studio
goto :end

:found
echo.
echo ========================================
echo   SDK Found Successfully!
echo ========================================
echo.
echo Now creating local.properties file...
echo # Location of the SDK. This is only used by Gradle. > local.properties
echo sdk.dir=%SDK_PATH:\=\\% >> local.properties
echo.
echo ✓ local.properties created!
echo You can now run: .\build-apk.bat

:end
echo.
pause