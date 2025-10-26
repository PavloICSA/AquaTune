@echo off
echo ========================================
echo   Fixing Gradle Wrapper
========================================
echo.

REM Check if gradle wrapper exists
if not exist "gradle\wrapper\gradle-wrapper.jar" (
    echo ✗ Gradle wrapper jar missing
    echo Downloading gradle wrapper...
    
    REM Create gradle wrapper directory
    if not exist "gradle\wrapper" mkdir "gradle\wrapper"
    
    REM Download gradle wrapper jar
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/gradle/gradle/raw/v8.4.0/gradle/wrapper/gradle-wrapper.jar' -OutFile 'gradle\wrapper\gradle-wrapper.jar'"
    
    if exist "gradle\wrapper\gradle-wrapper.jar" (
        echo ✓ Gradle wrapper jar downloaded
    ) else (
        echo ✗ Failed to download gradle wrapper jar
        pause
        exit /b 1
    )
)

REM Check if gradle wrapper properties exist
if not exist "gradle\wrapper\gradle-wrapper.properties" (
    echo Creating gradle-wrapper.properties...
    echo distributionBase=GRADLE_USER_HOME > gradle\wrapper\gradle-wrapper.properties
    echo distributionPath=wrapper/dists >> gradle\wrapper\gradle-wrapper.properties
    echo distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip >> gradle\wrapper\gradle-wrapper.properties
    echo zipStoreBase=GRADLE_USER_HOME >> gradle\wrapper\gradle-wrapper.properties
    echo zipStorePath=wrapper/dists >> gradle\wrapper\gradle-wrapper.properties
)

REM Check if gradlew.bat exists
if not exist "gradlew.bat" (
    echo Creating gradlew.bat...
    echo @rem > gradlew.bat
    echo @rem Copyright 2015 the original author or authors. >> gradlew.bat
    echo @rem >> gradlew.bat
    echo @if "%%DEBUG%%" == "" @echo off >> gradlew.bat
    echo @rem ########################################################################## >> gradlew.bat
    echo @rem >> gradlew.bat
    echo @rem  Gradle start up script for Windows >> gradlew.bat
    echo @rem >> gradlew.bat
    echo @rem ########################################################################## >> gradlew.bat
    echo. >> gradlew.bat
    echo @rem Set local scope for the variables with windows NT shell >> gradlew.bat
    echo if "%%OS%%"=="Windows_NT" setlocal >> gradlew.bat
    echo. >> gradlew.bat
    echo set DIRNAME=%%~dp0 >> gradlew.bat
    echo if "%%DIRNAME%%" == "" set DIRNAME=. >> gradlew.bat
    echo set APP_BASE_NAME=%%~n0 >> gradlew.bat
    echo set APP_HOME=%%DIRNAME%% >> gradlew.bat
    echo. >> gradlew.bat
    echo @rem Resolve any "." and ".." in APP_HOME to make it shorter. >> gradlew.bat
    echo for %%%%i in ("%%APP_HOME%%") do set APP_HOME=%%%%~fi >> gradlew.bat
    echo. >> gradlew.bat
    echo @rem Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script. >> gradlew.bat
    echo set DEFAULT_JVM_OPTS="-Xmx64m" "-Xms64m" >> gradlew.bat
    echo. >> gradlew.bat
    echo @rem Find java.exe >> gradlew.bat
    echo if defined JAVA_HOME goto findJavaFromJavaHome >> gradlew.bat
    echo. >> gradlew.bat
    echo set JAVA_EXE=java.exe >> gradlew.bat
    echo %%JAVA_EXE%% -version ^>NUL 2^>^&1 >> gradlew.bat
    echo if "%%ERRORLEVEL%%" == "0" goto execute >> gradlew.bat
    echo. >> gradlew.bat
    echo echo. >> gradlew.bat
    echo echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. >> gradlew.bat
    echo echo. >> gradlew.bat
    echo echo Please set the JAVA_HOME variable in your environment to match the >> gradlew.bat
    echo echo location of your Java installation. >> gradlew.bat
    echo. >> gradlew.bat
    echo goto fail >> gradlew.bat
    echo. >> gradlew.bat
    echo :findJavaFromJavaHome >> gradlew.bat
    echo set JAVA_HOME=%%JAVA_HOME:"=%% >> gradlew.bat
    echo set JAVA_EXE=%%JAVA_HOME%%/bin/java.exe >> gradlew.bat
    echo. >> gradlew.bat
    echo if exist "%%JAVA_EXE%%" goto execute >> gradlew.bat
    echo. >> gradlew.bat
    echo echo. >> gradlew.bat
    echo echo ERROR: JAVA_HOME is set to an invalid directory: %%JAVA_HOME%% >> gradlew.bat
    echo echo. >> gradlew.bat
    echo echo Please set the JAVA_HOME variable in your environment to match the >> gradlew.bat
    echo echo location of your Java installation. >> gradlew.bat
    echo. >> gradlew.bat
    echo goto fail >> gradlew.bat
    echo. >> gradlew.bat
    echo :execute >> gradlew.bat
    echo @rem Setup the command line >> gradlew.bat
    echo. >> gradlew.bat
    echo set CLASSPATH=%%APP_HOME%%\gradle\wrapper\gradle-wrapper.jar >> gradlew.bat
    echo. >> gradlew.bat
    echo @rem Execute Gradle >> gradlew.bat
    echo "%%JAVA_EXE%%" %%DEFAULT_JVM_OPTS%% %%JAVA_OPTS%% %%GRADLE_OPTS%% "-Dorg.gradle.appname=%%APP_BASE_NAME%%" -classpath "%%CLASSPATH%%" org.gradle.wrapper.GradleWrapperMain %%* >> gradlew.bat
    echo. >> gradlew.bat
    echo :end >> gradlew.bat
    echo @rem End local scope for the variables with windows NT shell >> gradlew.bat
    echo if "%%ERRORLEVEL%%"=="0" goto mainEnd >> gradlew.bat
    echo. >> gradlew.bat
    echo :fail >> gradlew.bat
    echo rem Set variable GRADLE_EXIT_CONSOLE if you need the _script_ return code instead of >> gradlew.bat
    echo rem the _cmd_ return code.  Not all _cmd_ return codes are _cmd_ return codes. >> gradlew.bat
    echo if not "" == "%%GRADLE_EXIT_CONSOLE%%" exit 1 >> gradlew.bat
    echo exit /b 1 >> gradlew.bat
    echo. >> gradlew.bat
    echo :mainEnd >> gradlew.bat
    echo if "%%OS%%"=="Windows_NT" endlocal >> gradlew.bat
    echo. >> gradlew.bat
    echo @rem End of script >> gradlew.bat
)

echo.
echo ========================================
echo   Gradle Wrapper Fixed!
echo ========================================
echo.
echo You can now try: .\gradlew.bat clean assembleDebug
echo.
pause