# 📱 Building the Fertilizer Calculator APK

Since the development environment doesn't have Android SDK installed, here are the instructions to build the APK:

## 🔧 Prerequisites

### 1. Install Java Development Kit (JDK)
- Download and install **JDK 11** or **JDK 17** from:
  - [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
  - [OpenJDK](https://openjdk.org/install/)
- Add Java to your system PATH

### 2. Install Android Studio
- Download from: https://developer.android.com/studio
- Install Android SDK (API level 24 or higher)
- Set ANDROID_HOME environment variable

### 3. Alternative: Command Line Tools Only
If you don't want Android Studio:
- Download Android Command Line Tools
- Install SDK Platform and Build Tools via sdkmanager

## 🚀 Building the APK

### Method 1: Using Android Studio (Recommended)
1. Open Android Studio
2. Click "Open an existing project"
3. Navigate to the project folder and open it
4. Wait for Gradle sync to complete
5. Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
6. APK will be generated in `app/build/outputs/apk/debug/`

### Method 2: Command Line
1. Open Command Prompt/PowerShell in project root
2. Run the build script:
   ```bash
   build-apk.bat
   ```
   
   Or manually:
   ```bash
   # For debug APK
   gradlew.bat assembleDebug
   
   # For release APK
   gradlew.bat assembleRelease
   ```

## 📁 APK Locations

After successful build:
- **Debug APK**: `app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `app/build/outputs/apk/release/app-release-unsigned.apk`

## 📝 Notes

### Debug APK
- Ready to install immediately
- Larger file size
- Includes debugging information
- Use for testing

### Release APK
- Smaller, optimized file
- Needs to be signed before installation
- Better performance
- Use for distribution

## 🔐 Signing Release APK (Optional)

To sign the release APK for distribution:

1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Sign the APK:
   ```bash
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
   ```

3. Align the APK:
   ```bash
   zipalign -v 4 app-release-unsigned.apk FertilizerCalculator.apk
   ```

## 🐛 Troubleshooting

### Common Issues:
1. **"SDK not found"**: Set ANDROID_HOME environment variable
2. **"Java not found"**: Install JDK and add to PATH
3. **"Build failed"**: Check internet connection for dependency downloads
4. **"Gradle sync failed"**: Try "File → Invalidate Caches and Restart"

### System Requirements:
- **OS**: Windows 10/11, macOS 10.14+, or Linux
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 4GB free space for Android SDK
- **Internet**: Required for downloading dependencies

## 📲 Installing the APK

1. Enable "Unknown Sources" in Android settings
2. Transfer APK to your Android device
3. Tap the APK file to install
4. Grant necessary permissions

The app requires Android 7.0 (API 24) or higher.

---

**Happy farming! 🌾**