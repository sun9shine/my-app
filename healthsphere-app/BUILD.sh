#!/bin/bash
set -e
echo "🏥 HealthSphere Build Script v2.0.0"
echo "===================================="
echo ""
echo "📋 Admin Credentials:"
echo "   Username: admin"
echo "   Password: health2024"
echo "   Access: Tap app logo 5 times within 3 seconds"
echo ""
echo "===================================="


# Auto-detect Android SDK
for d in "$HOME/Library/Android/sdk" "$HOME/Android/Sdk" "$HOME/AppData/Local/Android/Sdk" "/usr/local/android-sdk"; do
  [ -d "$d" ] && export ANDROID_HOME="$d" && break
done

if [ -z "$ANDROID_HOME" ]; then
  echo "⚠️  Android SDK not found. APK/AAB builds will be skipped."
  echo "   Install Android Studio: https://developer.android.com/studio"
  SKIP_ANDROID=1
else
  echo "✅ Android SDK: $ANDROID_HOME"
  echo "sdk.dir=$ANDROID_HOME" > android/local.properties
fi

# Check for Xcode (iOS)
SKIP_IOS=1
if command -v xcodebuild &>/dev/null; then
  echo "✅ Xcode detected - iOS build available"
  SKIP_IOS=0
else
  echo "⚠️  Xcode not found. iOS build will be skipped."
  echo "   Install Xcode from App Store (macOS only)"
fi

echo ""
echo "===================================="



# Step 1: Install dependencies
echo ""
echo "📦 [1/5] Installing dependencies..."
if [ -f "package.json" ]; then
  npm install --silent 2>/dev/null || echo "   (npm install skipped - no node_modules needed for static build)"
fi

# Step 2: Prepare web assets (copy to dist for Capacitor)
echo "🔨 [2/5] Preparing web assets..."
mkdir -p dist
cp -r android/app/src/main/assets/public/* dist/ 2>/dev/null || true
echo "   ✅ Web assets ready in dist/"

# Step 3: Build APK (Android Debug)
echo ""
if [ -z "$SKIP_ANDROID" ]; then
  echo "📱 [3/5] Building Android APK (debug)..."
  cd android
  chmod +x gradlew 2>/dev/null || true
  if [ -f "gradlew" ]; then
    ./gradlew assembleDebug --no-daemon -q 2>/dev/null
    APK="app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK" ]; then
      cp "$APK" "../HealthSphere-debug.apk"
      echo "   ✅ APK: HealthSphere-debug.apk ($(du -sh "../HealthSphere-debug.apk" | cut -f1))"
    else
      echo "   ⚠️  APK build failed - check Android Studio setup"
    fi
  else
    echo "   ⚠️  gradlew not found - run 'npx cap sync android' first"
  fi
  cd ..
else
  echo "⏭️  [3/5] Skipping APK build (no Android SDK)"
fi



# Step 4: Build AAB (Android App Bundle for Google Play)
if [ -z "$SKIP_ANDROID" ]; then
  echo "🏪 [4/5] Building Android AAB (release)..."
  cd android
  ./gradlew bundleRelease --no-daemon -q 2>/dev/null
  AAB="app/build/outputs/bundle/release/app-release.aab"
  if [ -f "$AAB" ]; then
    cp "$AAB" "../HealthSphere-release.aab"
    echo "   ✅ AAB: HealthSphere-release.aab ($(du -sh "../HealthSphere-release.aab" | cut -f1))"
  else
    echo "   ⚠️  AAB build failed - check signing config"
  fi
  cd ..
else
  echo "⏭️  [4/5] Skipping AAB build (no Android SDK)"
fi

# Step 5: Build iOS (if Xcode available)
if [ "$SKIP_IOS" = "0" ]; then
  echo "🍎 [5/5] Building iOS..."
  if [ -d "ios" ]; then
    cd ios/App
    xcodebuild -workspace App.xcworkspace -scheme App -configuration Release -archivePath build/HealthSphere.xcarchive archive -quiet 2>/dev/null
    if [ -d "build/HealthSphere.xcarchive" ]; then
      xcodebuild -exportArchive -archivePath build/HealthSphere.xcarchive -exportOptionsPlist exportOptions.plist -exportPath ../../HealthSphere-ios -quiet 2>/dev/null
      echo "   ✅ iOS: HealthSphere-ios/"
    else
      echo "   ⚠️  iOS archive failed - open in Xcode manually"
    fi
    cd ../..
  else
    echo "   ⚠️  iOS project not found. Run: npx cap add ios"
  fi
else
  echo "⏭️  [5/5] Skipping iOS build (no Xcode)"
fi



# Summary
echo ""
echo "===================================="
echo "✅ BUILD COMPLETE"
echo "===================================="
echo ""
echo "📁 Output Files:"
ls -lh HealthSphere*.apk HealthSphere*.aab 2>/dev/null || echo "   (no build outputs - check SDK setup)"
[ -d "HealthSphere-ios" ] && echo "   iOS: HealthSphere-ios/" || true
echo ""
echo "📱 Install APK on device:"
echo "   adb install HealthSphere-debug.apk"
echo ""
echo "🏪 Upload to Google Play:"
echo "   Upload HealthSphere-release.aab"
echo ""
echo "🍎 Upload to App Store:"
echo "   Open Xcode → Product → Archive → Distribute"
echo ""
echo "🔐 Admin Access:"
echo "   Username: admin"
echo "   Password: health2024"
echo "   Method: Tap app logo 5x in 3 seconds"
echo ""
echo "===================================="
