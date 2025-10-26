# 📱 AquaTune Android APK Build Guide

This guide will walk you through building the AquaTune fertilizer calculator APK from source.

## 🔧 Prerequisites

Before building, you need:

1. **Java Development Kit (JDK) 8 or higher**
   - Download from: https://adoptium.net/
   - Verify: `java -version`

2. **Android SDK**
   - Option A: Install Android Studio (recommended)
   - Option B: Install SDK tools only
   - Default location: `C:\Users\%USERNAME%\AppData\Local\Android\Sdk`

3. **USB Debugging enabled** (for installation)
   - Enable Developer Options on your Android device
   - Turn on USB Debugging

## 🚀 Quick Start (Automated)

### Step 1: Check Prerequisites
```cmd
cd android-app
check-prerequisites.bat
```

### Step 2: Setup SDK Path
```cmd
setup-sdk-path.bat
```

### Step 3: Build APK
```cmd
build-apk.bat
```

### Step 4: Install (Optional)
```cmd
install-debug-apk.bat
```

## 📋 Manual Build Process

If you prefer manual control:

### 1. Navigate to Project Directory
```cmd
cd android-app
```

### 2. Configure Android SDK Path
Create `local.properties` file with your SDK path:
```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### 3. Clean Project
```cmd
gradlew.bat clean
```

### 4. Build Debug APK
```cmd
gradlew.bat assembleDebug
```

### 5. Build Release APK (Optional)
```cmd
gradlew.bat assembleRelease
```

## 📁 Output Locations

After successful build:

- **Debug APK**: `app\build\outputs\apk\debug\app-debug.apk`
- **Release APK**: `app\build\outputs\apk\release\app-release-unsigned.apk`

## 📱 Installation Options

### Option 1: ADB Install (Recommended)
```cmd
adb install app\build\outputs\apk\debug\app-debug.apk
```

### Option 2: Manual Install
1. Copy APK to your device
2. Enable "Install from Unknown Sources"
3. Tap the APK file to install

### Option 3: Use Installation Script
```cmd
install-debug-apk.bat
```

## 🔐 Release APK Signing

The release APK is unsigned and needs signing for distribution:

### Generate Keystore (One-time)
```cmd
keytool -genkey -v -keystore aquatune-release-key.keystore -alias aquatune -keyalg RSA -keysize 2048 -validity 10000
```

### Sign Release APK
```cmd
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore aquatune-release-key.keystore app\build\outputs\apk\release\app-release-unsigned.apk aquatune
```

### Align APK
```cmd
zipalign -v 4 app\build\outputs\apk\release\app-release-unsigned.apk aquatune-release.apk
```

## 🛠️ Troubleshooting

### Common Issues

**"SDK not found"**
- Run `setup-sdk-path.bat`
- Verify Android SDK installation
- Check `local.properties` file

**"Java not found"**
- Install JDK 8 or higher
- Add Java to system PATH

**"Build failed"**
- Check internet connection (for dependencies)
- Run `gradlew.bat clean` first
- Check error messages in console

**"Installation failed"**
- Enable USB debugging
- Authorize computer on device
- Check device storage space
- Try `adb kill-server` then `adb start-server`

### Build Variants

- **Debug**: For testing, includes debugging info
- **Release**: Optimized for distribution, needs signing

### Gradle Tasks

Common Gradle tasks you can run:

```cmd
gradlew.bat tasks              # List all available tasks
gradlew.bat assembleDebug      # Build debug APK
gradlew.bat assembleRelease    # Build release APK
gradlew.bat clean              # Clean build artifacts
gradlew.bat build              # Full build (both variants)
gradlew.bat installDebug       # Build and install debug APK
```

## 📊 App Information

- **Package Name**: `com.farmerapp.fertilizercalculator`
- **App Name**: AquaTune
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Architecture**: Universal (ARM, x86)

## 🎯 Features Included

- Advanced pH calculation engine
- 6 fertilizer types with scientific data
- Real-time cost calculations
- Expert mode with additional parameters
- Ukrainian localization
- Material 3 design
- Offline functionality

## 📞 Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Verify all prerequisites are installed
3. Try the automated scripts first
4. Check Android Studio's build output for detailed errors

---

**Happy Building! 🚀**