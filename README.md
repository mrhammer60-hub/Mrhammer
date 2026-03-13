# IronCoach — Trainee App 🏋️

واجهة المتدرب لمنصة **IronCoach** — منصة تدريب رياضي SaaS متعددة المستأجرين.

---

## 📁 هيكل المشروع

```
ironcoach-trainee/
├── index.html          ← الصفحة الرئيسية (Shell + جميع الصفحات)
├── css/
│   ├── base.css        ← المتغيرات، Reset، Typography
│   ├── components.css  ← المكونات المشتركة (Navbar, Profile, Chat...)
│   └── pages.css       ← أنماط كل صفحة
├── js/
│   ├── data.js         ← جميع البيانات (استبدلها بـ API calls)
│   ├── nutrition.js    ← منطق صفحة التغذية
│   ├── workout.js      ← منطق صفحة التمرين
│   ├── progress.js     ← منطق صفحة التطور والرسم البياني
│   ├── chat.js         ← منطق الدردشة
│   └── app.js          ← التحكم الرئيسي (Page switching, Swipe, Init)
└── README.md
```

---

## 📱 الصفحات

| الصفحة | الوصف |
|--------|-------|
| 🏠 **الرئيسية** | ملخص الوزن والـ BMI والدهون + بطاقات سريعة |
| 🥗 **التغذية** | حلقات الماكرو، السعرات، الوجبات مع خيارات متعددة |
| 💪 **التمرين** | قائمة التمارين + تفاصيل كاملة مع تايمر وسجل الأوزان |
| 📈 **التطور** | BMI، تركيب الجسم، منحنى التقدم، مقاسات الجسم |

### مميزات إضافية
- 💬 **دردشة** مع الكوتش (زر أعلى اليمين)
- 👤 **الملف الشخصي** — اسحب يميناً أو اضغط على الاسم
- ⏱ **تايمر تلقائي** عند فتح أي تمرين
- 📊 **سجل الأسبوع الماضي** لمقارنة الأوزان
- 🔘 **خيارات متعددة** لكل وجبة (تحسب الماكرو تلقائياً)

---

## 🚀 التشغيل

### محلياً (بدون server)
```bash
# افتح index.html مباشرة في المتصفح
open index.html
```

### مع Live Server (VS Code)
1. ثبّت إضافة **Live Server**
2. اضغط كليك يمين على `index.html` → **Open with Live Server**

### مع Python
```bash
python -m http.server 3000
# ثم افتح: http://localhost:3000
```

---

## 🔗 الربط بالـ Backend

كل البيانات موجودة في `js/data.js`. لربطها بالـ API:

```javascript
// مثال: جلب خطة التغذية
async function fetchNutritionPlan(traineeId) {
  const res = await fetch(`/api/nutrition/plans?trainee=${traineeId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return res.json();
}
```

---

## 🛠 التقنيات

- **HTML5 / CSS3 / Vanilla JS** — بدون أي framework
- **Google Fonts** — Tajawal (عربي) + JetBrains Mono
- **SVG** للحلقات البيانية
- **CSS Grid & Flexbox** للتخطيط
- **CSS Custom Properties** لنظام الألوان

---

## 🎨 نظام الألوان

```css
--black:   #080808   /* الخلفية الرئيسية */
--accent:  #e8ff00   /* الأصفر / اللون الأساسي */
--blue:    #00d4ff   /* البروتين / المعلومات */
--orange:  #ff6b35   /* الدهون / التحذيرات */
--green:   #00e676   /* النجاح / الإنجاز */
--red:     #ff3b3b   /* الخطر / الحذف */
```

---

## 📋 الملاحظات للمطور

- جميع النصوص بالعربية مع دعم `dir="rtl"`
- مُحسَّن للموبايل (max-width: 430px)
- يمكن تحويله لـ PWA بإضافة `manifest.json` و `service-worker.js`
- الملف `js/data.js` هو نقطة الاتصال بالـ API — استبدل الـ constants بـ async functions

---

## 🗺 خارطة الطريق

- [ ] ربط بـ API الحقيقي (IronCoach Backend)
- [ ] إضافة PWA (offline support + push notifications)
- [ ] صفحة تسجيل الدخول
- [ ] دعم الرسوم المتحركة عند انتقال الصفحات
- [ ] تحديث الوزن والمقاسات من داخل التطبيق

---

**IronCoach Platform Blueprint v1.0 · March 2026**
