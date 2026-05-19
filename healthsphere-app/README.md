# 🏥 HealthSphere — منصة الصحة الذكية

## 📦 محتوى هذا المشروع

مشروع كامل جاهز للبناء يتضمن:
- **تطبيق React** مع 40+ ميزة صحية مدعومة بـ Claude AI
- **مشروع Android** كامل (Capacitor)
- **سكريبتات بناء** تلقائية لـ Mac/Linux/Windows

---

## 🚀 البناء السريع (3 خطوات)

### المتطلبات
| الأداة | الإصدار | التنزيل |
|--------|---------|---------|
| Node.js | 18+ | https://nodejs.org |
| Android Studio | أي إصدار | https://developer.android.com/studio |
| JDK | 17+ | يأتي مع Android Studio |

### الخطوة 1: أعدّ Android SDK
```bash
# بعد تثبيت Android Studio، افتح Terminal وأضف:
# macOS/Linux:
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc

# Windows: Android SDK في:
# C:\Users\YourName\AppData\Local\Android\Sdk
```

### الخطوة 2: شغّل سكريبت البناء
```bash
# macOS / Linux
chmod +x BUILD.sh
./BUILD.sh

# Windows
BUILD.bat
```

### الخطوة 3: الملفات الناتجة
```
HealthSphere-debug.apk          ← للتجربة على هاتفك
HealthSphere-release-unsigned.apk ← Release بدون توقيع
HealthSphere-release.aab        ← للرفع على Google Play
```

---

## 📱 تثبيت APK مباشرة على الهاتف

```bash
# فعّل Developer Options في الهاتف
# Settings → About Phone → اضغط Build Number 7 مرات
# Settings → Developer Options → USB Debugging → ON

# وصّل الهاتف بالكابل
adb install HealthSphere-debug.apk
```

---

## 🔏 توقيع APK للنشر (اختياري)

```bash
# 1. أنشئ Keystore (مرة واحدة فقط)
keytool -genkey -v \
  -keystore healthsphere.keystore \
  -alias healthsphere \
  -keyalg RSA -keysize 2048 \
  -validity 10000

# 2. وقّع APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore healthsphere.keystore \
  HealthSphere-release-unsigned.apk healthsphere

# 3. Align APK
zipalign -v 4 \
  HealthSphere-release-unsigned.apk \
  HealthSphere-release-signed.apk
```

---

## 🔄 تحديث التطبيق

```bash
# عدّل src/App.jsx
# ثم:
npm run build
npx cap sync android
cd android && ./gradlew assembleRelease
```

---

## ⚙️ إعداد Android Studio يدوياً

```bash
npx cap open android
```
ثم في Android Studio:
- **APK:** `Build → Build Bundle(s)/APK(s) → Build APK(s)`
- **AAB:** `Build → Generate Signed Bundle/APK → Android App Bundle`
- **على الهاتف:** `Run → Run 'app'` (مع توصيل الهاتف)

---

## 📁 هيكل المشروع

```
healthsphere-app/
├── src/
│   ├── App.jsx          ← التطبيق الكامل (9705 سطر)
│   └── main.jsx         ← نقطة الدخول React
├── public/
│   └── manifest.json    ← PWA manifest
├── android/             ← مشروع Android Studio
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/
│   │       ├── AndroidManifest.xml  ← الصلاحيات
│   │       └── assets/public/       ← التطبيق مُضمَّن
├── BUILD.sh             ← سكريبت macOS/Linux
├── BUILD.bat            ← سكريبت Windows
├── vite.config.js
├── capacitor.config.json
└── package.json
```

---

## 🔐 دخول لوحة الأدمن

اضغط **أيقونة التطبيق 5 مرات** خلال 3 ثواني → صفحة تسجيل دخول الأدمن

---

## 📋 الميزات

- 40+ تحليل صحي بالذكاء الاصطناعي
- كشف الأوردة المباشر (Live Camera)
- SkinVision AI — فحص الشامات
- نظام CBG (Claude + GPT-4 + BioGPT)
- لوحة أدمن كاملة مع تحكم Freemium/Credits/Plans
- OTA Updates — تحديث بدون متاجر
- دعم 10 بوابات دفع
- PWA + Android APK

---

*Made with ❤️ — HealthSphere v2.0.0*
