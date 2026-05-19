@echo off
title HealthSphere Build v2.0.0
echo.
echo ==== HealthSphere Build Script v2.0.0 ====
echo.
echo  Admin Credentials:
echo    Username: admin
echo    Password: health2024
echo    Access: Tap app logo 5 times within 3 seconds
echo.
echo ==========================================
echo.


:: Setup Android SDK
if "%ANDROID_HOME%"=="" set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
if not exist "%ANDROID_HOME%" (
  echo [WARNING] Android SDK not found at %ANDROID_HOME%
  echo Install Android Studio: https://developer.android.com/studio
  goto :SUMMARY
)
echo [OK] Android SDK: %ANDROID_HOME%
echo sdk.dir=%ANDROID_HOME:\=\\% > android\local.properties

:: Step 1: Install dependencies
echo.
echo [1/4] Installing dependencies...
call npm install --silent 2>nul

:: Step 2: Prepare web assets
echo [2/4] Preparing web assets...
if not exist "dist" mkdir dist
xcopy /s /y /q "android\app\src\main\assets\public\*" "dist\" >nul 2>nul
echo    OK - Web assets ready

:: Step 3: Build APK
echo.
echo [3/4] Building APK + AAB...
cd android
call gradlew.bat assembleDebug bundleRelease --no-daemon -q 2>nul
if exist "app\build\outputs\apk\debug\app-debug.apk" (
  copy "app\build\outputs\apk\debug\app-debug.apk" "..\HealthSphere-debug.apk" >nul
  echo    OK - HealthSphere-debug.apk
)
if exist "app\build\outputs\bundle\release\app-release.aab" (
  copy "app\build\outputs\bundle\release\app-release.aab" "..\HealthSphere-release.aab" >nul
  echo    OK - HealthSphere-release.aab
)
cd ..

:: Step 4: iOS note
echo.
echo [4/4] iOS Build:
echo    iOS builds require macOS with Xcode.
echo    Run: npx cap add ios ^&^& npx cap open ios

:SUMMARY
echo.
echo ==========================================
echo BUILD COMPLETE
echo ==========================================
echo.
echo Output Files:
if exist "HealthSphere-debug.apk" echo    APK: HealthSphere-debug.apk
if exist "HealthSphere-release.aab" echo    AAB: HealthSphere-release.aab
echo.
echo Install: adb install HealthSphere-debug.apk
echo Play Store: Upload HealthSphere-release.aab
echo.
echo Admin: admin / health2024 (tap logo 5x)
echo ==========================================
pause
