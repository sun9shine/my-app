#!/bin/bash
set -e
echo "🏥 HealthSphere Build Script v2.0.0"
echo "===================================="

# Auto-detect Android SDK
for d in "$HOME/Library/Android/sdk" "$HOME/Android/Sdk" "$HOME/AppData/Local/Android/Sdk" "/usr/local/android-sdk"; do
  [ -d "$d" ] && export ANDROID_HOME="$d" && break
done
[ -z "$ANDROID_HOME" ] && { echo "❌ Android SDK not found. Install Android Studio."; exit 1; }
echo "✅ SDK: $ANDROID_HOME"
echo "sdk.dir=$ANDROID_HOME" > android/local.properties

echo "📦 npm install..."
npm install

echo "🔨 Building web app..."
npm run build

echo "🔄 Syncing Capacitor..."
npx cap sync android

echo "📱 Building APK (debug)..."
cd android && chmod +x gradlew
./gradlew assembleDebug --no-daemon -q
APK="app/build/outputs/apk/debug/app-debug.apk"
[ -f "$APK" ] && cp "$APK" "../HealthSphere-debug.apk" && echo "✅ APK: HealthSphere-debug.apk ($(du -sh "../HealthSphere-debug.apk"|cut -f1))"

echo "📦 Building AAB (release)..."
./gradlew bundleRelease --no-daemon -q
AAB="app/build/outputs/bundle/release/app-release.aab"
[ -f "$AAB" ] && cp "$AAB" "../HealthSphere-release.aab" && echo "✅ AAB: HealthSphere-release.aab ($(du -sh "../HealthSphere-release.aab"|cut -f1))"

cd ..
echo ""
echo "===================================="
echo "✅ BUILD COMPLETE"
ls -lh HealthSphere*.apk HealthSphere*.aab 2>/dev/null
echo ""
echo "Install APK:  adb install HealthSphere-debug.apk"
echo "Google Play:  Upload HealthSphere-release.aab"
