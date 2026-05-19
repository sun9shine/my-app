/**
 * HealthSphere v2.0.0 - منصة الصحة الذكية
 * Built from scratch - Full bilingual AR/EN support
 * Admin panel with Keystore generation
 */
(function() {
'use strict';

// ========== TRANSLATION SYSTEM ==========
const translations = {
  ar: {
    appName: 'HealthSphere',
    appSubtitle: 'منصة الصحة الذكية',
    home: 'الرئيسية',
    tools: 'الأدوات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'English',
    switchLang: 'تبديل اللغة',
    darkMode: 'الوضع الداكن',
    welcome: 'مرحباً بك في HealthSphere',
    welcomeDesc: 'منصة صحية ذكية مدعومة بالذكاء الاصطناعي',
    healthTools: 'أدوات صحية',
    aiAnalysis: 'تحليل بالذكاء الاصطناعي',
    heartRate: 'معدل ضربات القلب',
    bloodPressure: 'ضغط الدم',
    skinAnalysis: 'تحليل البشرة',
    eyeAnalysis: 'تحليل العين',
    nutrition: 'التغذية',
    sleep: 'النوم',
    exercise: 'التمارين',
    mentalHealth: 'الصحة النفسية',

    bmi: 'مؤشر كتلة الجسم',
    water: 'شرب الماء',
    steps: 'الخطوات',
    calories: 'السعرات',
    admin: 'لوحة الإدارة',
    adminLogin: 'دخول الأدمن',
    adminPanel: 'لوحة التحكم',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    keystoreGen: 'إنشاء Keystore',
    keystoreAlias: 'الاسم المستعار',
    keystorePass: 'كلمة مرور المفتاح',
    storePass: 'كلمة مرور المخزن',
    orgName: 'اسم المؤسسة',
    generateKey: 'إنشاء المفتاح',
    saveKey: 'حفظ المفتاح',
    downloadKey: 'تحميل المفتاح',
    keyGenerated: 'تم إنشاء المفتاح بنجاح!',
    keySaved: 'تم حفظ المفتاح!',
    buildApk: 'بناء APK',
    buildAab: 'بناء AAB',
    buildIos: 'بناء iOS',
    buildInfo: 'معلومات البناء',
    appVersion: 'إصدار التطبيق',
    buildDate: 'تاريخ البناء',
    platform: 'المنصة',
    status: 'الحالة',
    ready: 'جاهز',
    building: 'جارٍ البناء...',
    success: 'نجاح',
    error: 'خطأ',
    adminCredentials: 'بيانات الأدمن',
    cancel: 'إلغاء',
    save: 'حفظ',
    close: 'إغلاق',
    tapToAccess: 'اضغط 5 مرات على الشعار للدخول',
    noKeyYet: 'لم يتم إنشاء مفتاح بعد',
    validity: 'صلاحية (سنوات)',
    keySize: 'حجم المفتاح',
    algorithm: 'الخوارزمية',
  },

  en: {
    appName: 'HealthSphere',
    appSubtitle: 'The Intelligent Health Platform',
    home: 'Home',
    tools: 'Tools',
    profile: 'Profile',
    settings: 'Settings',
    language: 'Language',
    arabic: 'العربية',
    english: 'English',
    switchLang: 'Switch Language',
    darkMode: 'Dark Mode',
    welcome: 'Welcome to HealthSphere',
    welcomeDesc: 'AI-Powered Intelligent Health Platform',
    healthTools: 'Health Tools',
    aiAnalysis: 'AI Analysis',
    heartRate: 'Heart Rate',
    bloodPressure: 'Blood Pressure',
    skinAnalysis: 'Skin Analysis',
    eyeAnalysis: 'Eye Analysis',
    nutrition: 'Nutrition',
    sleep: 'Sleep',
    exercise: 'Exercise',
    mentalHealth: 'Mental Health',
    bmi: 'BMI Calculator',
    water: 'Water Intake',
    steps: 'Steps',
    calories: 'Calories',
    admin: 'Admin Panel',
    adminLogin: 'Admin Login',
    adminPanel: 'Control Panel',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    logout: 'Logout',
    keystoreGen: 'Generate Keystore',
    keystoreAlias: 'Key Alias',
    keystorePass: 'Key Password',
    storePass: 'Store Password',
    orgName: 'Organization Name',
    generateKey: 'Generate Key',
    saveKey: 'Save Key',
    downloadKey: 'Download Key',
    keyGenerated: 'Key generated successfully!',
    keySaved: 'Key saved!',
    buildApk: 'Build APK',
    buildAab: 'Build AAB',
    buildIos: 'Build iOS',
    buildInfo: 'Build Info',
    appVersion: 'App Version',
    buildDate: 'Build Date',
    platform: 'Platform',
    status: 'Status',
    ready: 'Ready',
    building: 'Building...',
    success: 'Success',
    error: 'Error',
    adminCredentials: 'Admin Credentials',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    tapToAccess: 'Tap logo 5 times to access',
    noKeyYet: 'No key generated yet',
    validity: 'Validity (years)',
    keySize: 'Key Size',
    algorithm: 'Algorithm',
  }
};


// ========== STATE MANAGEMENT ==========
let state = {
  lang: localStorage.getItem('hsp_lang') || 'ar',
  page: 'home',
  adminMode: false,
  adminLoggedIn: false,
  tapCount: 0,
  tapTimer: null,
  keystore: JSON.parse(localStorage.getItem('hsp_keystore') || 'null'),
  adminUser: localStorage.getItem('hsp_admin_user') || 'admin',
  adminPass: localStorage.getItem('hsp_admin_pass') || 'health2024',
};

function t(key) {
  return translations[state.lang][key] || key;
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem('hsp_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  render();
}

function navigate(page) {
  state.page = page;
  render();
}


// ========== ADMIN TAP DETECTION ==========
function handleLogoTap() {
  state.tapCount++;
  if (state.tapTimer) clearTimeout(state.tapTimer);
  state.tapTimer = setTimeout(() => { state.tapCount = 0; }, 3000);
  if (state.tapCount >= 5) {
    state.tapCount = 0;
    state.adminMode = true;
    render();
  }
}

// ========== KEYSTORE GENERATOR ==========
function generateKeystore(alias, keyPass, storePass, org, validity, keySize) {
  // Simulate keystore generation (in real app this would use native bridge)
  const keyData = {
    alias: alias || 'healthsphere',
    keyPassword: keyPass || 'changeit',
    storePassword: storePass || 'changeit',
    organization: org || 'HealthSphere Inc.',
    validity: validity || 25,
    keySize: keySize || 2048,
    algorithm: 'RSA',
    createdAt: new Date().toISOString(),
    fingerprint: generateFingerprint(),
    id: 'ks_' + Date.now(),
  };
  state.keystore = keyData;
  localStorage.setItem('hsp_keystore', JSON.stringify(keyData));
  return keyData;
}

function generateFingerprint() {
  const chars = '0123456789ABCDEF';
  let fp = '';
  for (let i = 0; i < 40; i++) {
    fp += chars[Math.floor(Math.random() * 16)];
    if (i % 2 === 1 && i < 39) fp += ':';
  }
  return fp;
}

function downloadKeystore() {
  if (!state.keystore) return;
  const data = JSON.stringify(state.keystore, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'healthsphere-keystore.json';
  a.click();
  URL.revokeObjectURL(url);
}


// ========== CSS STYLES ==========
const styles = `
<style>
:root{--bg:#050c1a;--card:#0a1628;--card2:#0f1d32;--accent:#00d4ff;--accent2:#7c3aed;--text:#e0e8f5;--text2:#8a9ab5;--border:#1a2a42;--success:#10b981;--danger:#ef4444;--radius:14px;--shadow:0 4px 20px rgba(0,0,0,.3)}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:'Tajawal',system-ui,sans-serif;min-height:100vh}
.app{min-height:100vh;display:flex;flex-direction:column}
.header{background:var(--card);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;backdrop-filter:blur(10px)}
.header-logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.header-logo span{font-size:24px}
.header-title{font-size:18px;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.header-actions{display:flex;gap:8px}
.btn{padding:8px 16px;border-radius:8px;border:1px solid var(--border);background:var(--card2);color:var(--text);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
.btn:hover{background:var(--accent);color:#000;border-color:var(--accent)}
.btn-primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none}
.btn-primary:hover{opacity:.9;transform:scale(1.02)}
.btn-danger{background:var(--danger);color:#fff;border:none}
.btn-success{background:var(--success);color:#fff;border:none}
.btn-sm{padding:6px 12px;font-size:12px}
.content{flex:1;padding:20px;max-width:600px;margin:0 auto;width:100%}
.nav{display:flex;justify-content:space-around;background:var(--card);border-top:1px solid var(--border);padding:10px 0;position:fixed;bottom:0;left:0;right:0;z-index:100}
.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:6px 12px;border-radius:10px;transition:all .2s;font-size:11px;color:var(--text2)}
.nav-item.active{color:var(--accent);background:rgba(0,212,255,.1)}
.nav-item span:first-child{font-size:20px}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:16px;transition:all .2s}
.card:hover{border-color:var(--accent);box-shadow:var(--shadow)}
.card-title{font-size:16px;font-weight:700;margin-bottom:8px}
.card-desc{font-size:13px;color:var(--text2);line-height:1.7}
.tools-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:16px 0}
.tool-item{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 8px;text-align:center;cursor:pointer;transition:all .2s}
.tool-item:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:var(--shadow)}
.tool-item span{font-size:28px;display:block;margin-bottom:8px}
.tool-item p{font-size:11px;color:var(--text2);font-weight:600}
.section-title{font-size:18px;font-weight:900;margin:20px 0 12px;display:flex;align-items:center;gap:8px}
.input{width:100%;padding:12px 16px;border-radius:10px;border:1px solid var(--border);background:var(--card2);color:var(--text);font-size:14px;font-family:inherit;margin-bottom:12px;transition:border-color .2s}
.input:focus{outline:none;border-color:var(--accent)}
.input-label{display:block;font-size:12px;color:var(--text2);margin-bottom:6px;font-weight:600}
.lang-switch{display:flex;gap:8px;margin:12px 0}
.lang-btn{flex:1;padding:12px;border-radius:10px;border:2px solid var(--border);background:var(--card);color:var(--text);font-size:14px;font-weight:700;cursor:pointer;text-align:center;transition:all .2s}
.lang-btn.active{border-color:var(--accent);background:rgba(0,212,255,.1);color:var(--accent)}
.badge{display:inline-block;padding:3px 8px;border-radius:6px;font-size:10px;font-weight:700}
.badge-success{background:rgba(16,185,129,.15);color:var(--success)}
.badge-warning{background:rgba(245,158,11,.15);color:#f59e0b}
.key-display{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:14px;margin:12px 0;font-family:monospace;font-size:11px;word-break:break-all;color:var(--accent)}
.build-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0}
.build-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center;cursor:pointer;transition:all .2s}
.build-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.build-card span{font-size:32px;display:block;margin-bottom:8px}
.build-card p{font-size:12px;font-weight:700;color:var(--text)}
.build-card small{font-size:10px;color:var(--text2)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;max-width:400px;width:100%;max-height:80vh;overflow-y:auto}
.modal-title{font-size:18px;font-weight:900;margin-bottom:16px;text-align:center}
.info-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px}
.info-row:last-child{border-bottom:none}
.info-label{color:var(--text2)}
.info-value{font-weight:700;color:var(--accent)}
.pb-80{padding-bottom:80px}
.fade-in{animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
</style>
`;


// ========== PAGE RENDERERS ==========
function renderHome() {
  const tools = [
    { icon: '❤️', key: 'heartRate' },
    { icon: '🩺', key: 'bloodPressure' },
    { icon: '🧴', key: 'skinAnalysis' },
    { icon: '👁️', key: 'eyeAnalysis' },
    { icon: '🥗', key: 'nutrition' },
    { icon: '😴', key: 'sleep' },
    { icon: '🏃', key: 'exercise' },
    { icon: '🧠', key: 'mentalHealth' },
    { icon: '⚖️', key: 'bmi' },
    { icon: '💧', key: 'water' },
    { icon: '👣', key: 'steps' },
    { icon: '🔥', key: 'calories' },
  ];
  return `
    <div class="fade-in pb-80">
      <div class="card" style="text-align:center;padding:30px 20px">
        <div style="font-size:48px;margin-bottom:12px">🏥</div>
        <h2 style="font-size:20px;font-weight:900;margin-bottom:8px">${t('welcome')}</h2>
        <p class="card-desc">${t('welcomeDesc')}</p>
      </div>
      <div class="section-title">🛠️ ${t('healthTools')}</div>
      <div class="tools-grid">
        ${tools.map(tool => `
          <div class="tool-item" onclick="alert('${t(tool.key)}')">
            <span>${tool.icon}</span>
            <p>${t(tool.key)}</p>
          </div>
        `).join('')}
      </div>
      <div class="card" style="text-align:center;opacity:.6;padding:14px">
        <small>${t('tapToAccess')}</small>
      </div>
    </div>
  `;
}


function renderSettings() {
  return `
    <div class="fade-in pb-80">
      <div class="section-title">⚙️ ${t('settings')}</div>
      <div class="card">
        <div class="card-title">🌐 ${t('language')}</div>
        <div class="lang-switch">
          <button class="lang-btn ${state.lang==='ar'?'active':''}" onclick="setLang('ar')">
            🇸🇦 ${t('arabic')}
          </button>
          <button class="lang-btn ${state.lang==='en'?'active':''}" onclick="setLang('en')">
            🇬🇧 ${t('english')}
          </button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">📱 ${t('buildInfo')}</div>
        <div class="info-row"><span class="info-label">${t('appVersion')}</span><span class="info-value">2.0.0</span></div>
        <div class="info-row"><span class="info-label">${t('buildDate')}</span><span class="info-value">${new Date().toLocaleDateString()}</span></div>
        <div class="info-row"><span class="info-label">${t('platform')}</span><span class="info-value">Android / iOS / Web</span></div>
        <div class="info-row"><span class="info-label">${t('status')}</span><span class="badge badge-success">${t('ready')}</span></div>
      </div>
      <div class="card">
        <div class="card-title">🔐 ${t('admin')}</div>
        <p class="card-desc">${t('tapToAccess')}</p>
      </div>
    </div>
  `;
}

function renderProfile() {
  return `
    <div class="fade-in pb-80">
      <div class="section-title">👤 ${t('profile')}</div>
      <div class="card" style="text-align:center;padding:30px">
        <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:32px">👤</div>
        <h3 style="margin-bottom:4px">${state.lang==='ar'?'مستخدم HealthSphere':'HealthSphere User'}</h3>
        <p class="card-desc">v2.0.0</p>
      </div>
    </div>
  `;
}


// ========== ADMIN PANEL ==========
function renderAdminLogin() {
  return `
    <div class="fade-in pb-80">
      <div class="section-title">🔐 ${t('adminLogin')}</div>
      <div class="card">
        <label class="input-label">${t('username')}</label>
        <input class="input" id="admin-user" type="text" placeholder="${t('username')}" value="admin">
        <label class="input-label">${t('password')}</label>
        <input class="input" id="admin-pass" type="password" placeholder="${t('password')}">
        <button class="btn btn-primary" style="width:100%;padding:14px;font-size:16px" onclick="handleAdminLogin()">
          ${t('login')}
        </button>
        <div style="margin-top:12px;text-align:center">
          <button class="btn btn-sm" onclick="state.adminMode=false;navigate('home')">${t('cancel')}</button>
        </div>
      </div>
    </div>
  `;
}

function handleAdminLogin() {
  const user = document.getElementById('admin-user').value;
  const pass = document.getElementById('admin-pass').value;
  if (user === state.adminUser && pass === state.adminPass) {
    state.adminLoggedIn = true;
    state.page = 'admin';
    render();
  } else {
    alert(state.lang === 'ar' ? 'بيانات غير صحيحة!' : 'Invalid credentials!');
  }
}


function renderAdminPanel() {
  const ks = state.keystore;
  return `
    <div class="fade-in pb-80">
      <div class="section-title">🛡️ ${t('adminPanel')}</div>
      
      <!-- Admin Credentials -->
      <div class="card">
        <div class="card-title">👤 ${t('adminCredentials')}</div>
        <div class="info-row"><span class="info-label">${t('username')}</span><span class="info-value">${state.adminUser}</span></div>
        <div class="info-row"><span class="info-label">${t('password')}</span><span class="info-value">••••••</span></div>
      </div>

      <!-- Keystore Generation -->
      <div class="card">
        <div class="card-title">🔑 ${t('keystoreGen')}</div>
        ${ks ? `
          <div class="badge badge-success" style="margin-bottom:12px">${t('keyGenerated')}</div>
          <div class="key-display">
            <strong>Alias:</strong> ${ks.alias}<br>
            <strong>Fingerprint:</strong> ${ks.fingerprint}<br>
            <strong>Created:</strong> ${new Date(ks.createdAt).toLocaleString()}<br>
            <strong>Algorithm:</strong> ${ks.algorithm} ${ks.keySize}bit<br>
            <strong>Validity:</strong> ${ks.validity} years
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn-success" style="flex:1" onclick="downloadKeystore()">📥 ${t('downloadKey')}</button>
            <button class="btn btn-danger btn-sm" onclick="state.keystore=null;localStorage.removeItem('hsp_keystore');render()">🗑️</button>
          </div>
        ` : `
          <p class="card-desc" style="margin-bottom:12px">${t('noKeyYet')}</p>
          <label class="input-label">${t('keystoreAlias')}</label>
          <input class="input" id="ks-alias" placeholder="healthsphere" value="healthsphere">
          <label class="input-label">${t('keystorePass')}</label>
          <input class="input" id="ks-keypass" type="password" placeholder="••••••">
          <label class="input-label">${t('storePass')}</label>
          <input class="input" id="ks-storepass" type="password" placeholder="••••••">
          <label class="input-label">${t('orgName')}</label>
          <input class="input" id="ks-org" placeholder="HealthSphere Inc.">
          <label class="input-label">${t('validity')}</label>
          <input class="input" id="ks-validity" type="number" value="25" min="1" max="100">
          <label class="input-label">${t('keySize')}</label>
          <select class="input" id="ks-size">
            <option value="2048">RSA 2048</option>
            <option value="4096">RSA 4096</option>
          </select>
          <button class="btn btn-primary" style="width:100%;padding:14px" onclick="handleGenerate()">
            🔐 ${t('generateKey')}
          </button>
        `}
      </div>


      <!-- Build Targets -->
      <div class="card">
        <div class="card-title">📦 ${t('buildInfo')}</div>
        <div class="build-cards">
          <div class="build-card" onclick="handleBuild('apk')">
            <span>📱</span>
            <p>APK</p>
            <small>Android Debug</small>
          </div>
          <div class="build-card" onclick="handleBuild('aab')">
            <span>🏪</span>
            <p>AAB</p>
            <small>Google Play</small>
          </div>
          <div class="build-card" onclick="handleBuild('ios')">
            <span>🍎</span>
            <p>iOS</p>
            <small>App Store</small>
          </div>
        </div>
      </div>

      <!-- App Info -->
      <div class="card">
        <div class="card-title">ℹ️ ${t('buildInfo')}</div>
        <div class="info-row"><span class="info-label">${t('appVersion')}</span><span class="info-value">2.0.0</span></div>
        <div class="info-row"><span class="info-label">App ID</span><span class="info-value">com.healthsphere.app</span></div>
        <div class="info-row"><span class="info-label">${t('buildDate')}</span><span class="info-value">${new Date().toISOString().split('T')[0]}</span></div>
        <div class="info-row"><span class="info-label">${t('platform')}</span><span class="info-value">Android + iOS</span></div>
        <div class="info-row"><span class="info-label">Keystore</span><span class="badge ${ks?'badge-success':'badge-warning'}">${ks?t('ready'):t('noKeyYet')}</span></div>
      </div>

      <button class="btn btn-danger" style="width:100%;padding:14px;margin-top:8px" onclick="handleLogout()">
        🚪 ${t('logout')}
      </button>
    </div>
  `;
}

function handleGenerate() {
  const alias = document.getElementById('ks-alias').value;
  const keyPass = document.getElementById('ks-keypass').value;
  const storePass = document.getElementById('ks-storepass').value;
  const org = document.getElementById('ks-org').value;
  const validity = parseInt(document.getElementById('ks-validity').value);
  const keySize = parseInt(document.getElementById('ks-size').value);
  
  if (!keyPass || !storePass) {
    alert(state.lang === 'ar' ? 'يرجى إدخال كلمات المرور' : 'Please enter passwords');
    return;
  }
  generateKeystore(alias, keyPass, storePass, org, validity, keySize);
  render();
}

function handleBuild(type) {
  const names = { apk: 'APK', aab: 'AAB', ios: 'iOS IPA' };
  const msg = state.lang === 'ar' 
    ? `لبناء ${names[type]}، شغّل سكريبت البناء:\n\n./BUILD.sh\n\nأو استخدم Android Studio / Xcode`
    : `To build ${names[type]}, run the build script:\n\n./BUILD.sh\n\nOr use Android Studio / Xcode`;
  alert(msg);
}

function handleLogout() {
  state.adminLoggedIn = false;
  state.adminMode = false;
  state.page = 'home';
  render();
}


// ========== MAIN RENDER ==========
function render() {
  const root = document.getElementById('root');
  if (!root) return;

  let pageContent = '';
  if (state.adminMode && !state.adminLoggedIn) {
    pageContent = renderAdminLogin();
  } else if (state.adminLoggedIn) {
    pageContent = renderAdminPanel();
  } else {
    switch(state.page) {
      case 'tools': pageContent = renderHome(); break;
      case 'settings': pageContent = renderSettings(); break;
      case 'profile': pageContent = renderProfile(); break;
      default: pageContent = renderHome();
    }
  }

  root.innerHTML = styles + `
    <div class="app">
      <header class="header">
        <div class="header-logo" onclick="handleLogoTap()">
          <span>🏥</span>
          <span class="header-title">${t('appName')}</span>
        </div>
        <div class="header-actions">
          <button class="btn btn-sm" onclick="setLang(state.lang==='ar'?'en':'ar')">
            ${state.lang === 'ar' ? '🇬🇧' : '🇸🇦'}
          </button>
        </div>
      </header>
      <main class="content">
        ${pageContent}
      </main>
      ${!state.adminMode ? `
      <nav class="nav">
        <div class="nav-item ${state.page==='home'?'active':''}" onclick="navigate('home')">
          <span>🏠</span>${t('home')}
        </div>
        <div class="nav-item ${state.page==='tools'?'active':''}" onclick="navigate('tools')">
          <span>🛠️</span>${t('tools')}
        </div>
        <div class="nav-item ${state.page==='profile'?'active':''}" onclick="navigate('profile')">
          <span>👤</span>${t('profile')}
        </div>
        <div class="nav-item ${state.page==='settings'?'active':''}" onclick="navigate('settings')">
          <span>⚙️</span>${t('settings')}
        </div>
      </nav>` : ''}
    </div>
  `;
}

// ========== EXPOSE GLOBALS ==========
window.setLang = setLang;
window.navigate = navigate;
window.handleLogoTap = handleLogoTap;
window.handleAdminLogin = handleAdminLogin;
window.handleGenerate = handleGenerate;
window.handleBuild = handleBuild;
window.handleLogout = handleLogout;
window.downloadKeystore = downloadKeystore;
window.state = state;
window.render = render;

// ========== INITIALIZE ==========
document.documentElement.lang = state.lang;
document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
render();

})();
