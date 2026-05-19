@echo off
title HealthSphere Build
echo HealthSphere Build Script v2.0.0
echo ==================================
if "%ANDROID_HOME%"=="" set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
echo sdk.dir=%ANDROID_HOME:\=\\% > android\local.properties
echo [1/4] npm install...
call npm install
echo [2/4] Build web...
call npm run build
echo [3/4] Capacitor sync...
call npx cap sync android
echo [4/4] Building APK + AAB...
cd android
call gradlew.bat assembleDebug bundleRelease --no-daemon -q
if exist "app\build\outputs\apk\debug\app-debug.apk" copy "app\build\outputs\apk\debug\app-debug.apk" "..\HealthSphere-debug.apk"
if exist "app\build\outputs\bundle\release\app-release.aab" copy "app\build\outputs\bundle\release\app-release.aab" "..\HealthSphere-release.aab"
cd ..
echo ==================================
echo DONE. Check HealthSphere*.apk / *.aab
pause
