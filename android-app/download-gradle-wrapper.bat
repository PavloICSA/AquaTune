@echo off
echo ========================================
echo   Downloading Gradle Wrapper
echo ========================================
echo.

REM Create gradle wrapper directory
if not exist "gradle\wrapper" mkdir "gradle\wrapper"

echo Downloading gradle-wrapper.jar...
powershell -Command "try { Invoke-WebRequest -Uri 'https://github.com/gradle/gradle/raw/v8.4.0/gradle/wrapper/gradle-wrapper.jar' -OutFile 'gradle\wrapper\gradle-wrapper.jar' -UseBasicParsing } catch { Write-Host 'Download failed, trying alternative...' }"

if not exist "gradle\wrapper\gradle-wrapper.jar" (
    echo Trying alternative download...
    powershell -Command "try { (New-Object System.Net.WebClient).DownloadFile('https://github.com/gradle/gradle/raw/v8.4.0/gradle/wrapper/gradle-wrapper.jar', 'gradle\wrapper\gradle-wrapper.jar') } catch { Write-Host 'Alternative download failed' }"
)

echo Creating gradle-wrapper.properties...
echo distributionBase=GRADLE_USER_HOME > gradle\wrapper\gradle-wrapper.properties
echo distributionPath=wrapper/dists >> gradle\wrapper\gradle-wrapper.properties
echo distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip >> gradle\wrapper\gradle-wrapper.properties
echo zipStoreBase=GRADLE_USER_HOME >> gradle\wrapper\gradle-wrapper.properties
echo zipStorePath=wrapper/dists >> gradle\wrapper\gradle-wrapper.properties

echo.
if exist "gradle\wrapper\gradle-wrapper.jar" (
    echo ✓ Gradle wrapper downloaded successfully!
) else (
    echo ✗ Failed to download gradle wrapper
    echo.
    echo Manual solution:
    echo 1. Download: https://github.com/gradle/gradle/raw/v8.4.0/gradle/wrapper/gradle-wrapper.jar
    echo 2. Save to: gradle\wrapper\gradle-wrapper.jar
)

echo.
pause