/**
 * data.js — IronCoach Trainee App
 * All data constants used across modules.
 * Replace with real API calls when connecting to backend.
 */

const TRAINEE = {
  name:       'أحمد الراشد',
  nameEn:     'Ahmed Al-Rashid',
  avatar:     'أ',
  age:        26,
  weight:     82,
  height:     178,
  bodyFat:    18.2,
  muscleMass: 67.1,
  waterPct:   58.4,
  goal:       'Lean Bulk',
  plan:       'PPL — Week 3',
  streak:     12,
  coach:      'Coach Khaled',
  // Body measurements (cm)
  chest:  102,
  waist:  85,
  hip:    96,
  arm:    38,
  thigh:  58,
};

const NUTRITION = {
  targetCalories: 2850,
  protein: 164,
  carbs:   310,
  fat:     79,
  meals: [
    {
      id: 1, name: 'الفطور', time: '07:30',
      options: [
        { id: 'b1', label: 'خيار A', cal: 520, p: 38, c: 55, f: 14, foods: ['6 بيض مسلوق', 'شوفان 80g', 'موز'] },
        { id: 'b2', label: 'خيار B', cal: 510, p: 35, c: 58, f: 12, foods: ['بيض مخفوق 4', 'خبز قمح كامل', 'تفاح'] },
        { id: 'b3', label: 'خيار C', cal: 500, p: 40, c: 50, f: 13, foods: ['يوغرت يوناني 200g', 'شوفان 60g', 'توت'] },
      ],
    },
    {
      id: 2, name: 'الغداء', time: '13:00',
      options: [
        { id: 'l1', label: 'خيار A', cal: 720, p: 52, c: 88, f: 18, foods: ['دجاج مشوي 200g', 'أرز بني 150g', 'سلطة خضراء'] },
        { id: 'l2', label: 'خيار B', cal: 710, p: 48, c: 92, f: 16, foods: ['سمك سلمون 180g', 'بطاطا حلوة 200g', 'بروكلي'] },
        { id: 'l3', label: 'خيار C', cal: 730, p: 55, c: 82, f: 20, foods: ['لحم بقر 180g', 'أرز 140g', 'سبانخ'] },
      ],
    },
    {
      id: 3, name: 'وجبة ما قبل التمرين', time: '16:30',
      options: [
        { id: 'pw1', label: 'خيار A', cal: 380, p: 28, c: 48, f: 8,  foods: ['بروتين شيك', 'موز', 'شوفان 40g'] },
        { id: 'pw2', label: 'خيار B', cal: 360, p: 25, c: 52, f: 6,  foods: ['تمر 5 حبات', 'بروتين شيك', 'تفاح'] },
      ],
    },
    {
      id: 4, name: 'العشاء', time: '20:00',
      options: [
        { id: 'd1', label: 'خيار A', cal: 680, p: 58, c: 72, f: 18, foods: ['دجاج 220g', 'كينوا 130g', 'خضروات مشوية'] },
        { id: 'd2', label: 'خيار B', cal: 670, p: 54, c: 78, f: 16, foods: ['تونة 200g', 'مكرونة 130g', 'طماطم'] },
        { id: 'd3', label: 'خيار C', cal: 690, p: 60, c: 70, f: 19, foods: ['لحم ديك رومي 210g', 'بطاطا 180g', 'فاصولياء'] },
      ],
    },
    {
      id: 5, name: 'السناك', time: '22:30',
      options: [
        { id: 's1', label: 'خيار A', cal: 280, p: 24, c: 20, f: 10, foods: ['كوتج تشيز 150g', 'عسل', 'مكسرات 20g'] },
        { id: 's2', label: 'خيار B', cal: 260, p: 22, c: 18, f: 12, foods: ['كازيين بروتين', 'زبدة فول سوداني 15g'] },
      ],
    },
  ],
};

const WORKOUT = {
  dayName:       'يوم الصدر والكتف',
  dayNameEn:     'Push Day — Chest & Shoulders',
  muscles:       ['الصدر', 'الكتف', 'الترايسبس'],
  totalSets:     22,
  estimatedTime: 70,
  exercises: [
    {
      id: 1, nameAr: 'ضغط الصدر بالبار', nameEn: 'Bench Press',
      muscle: 'Chest', sets: 4, reps: '8-10', rest: 120, level: 'advanced', emoji: '🏋️',
      history: [
        { week: 1, sets: [{w:60,r:10},{w:65,r:9},{w:65,r:8},{w:60,r:8}] },
        { week: 2, sets: [{w:65,r:10},{w:67.5,r:9},{w:67.5,r:8},{w:65,r:8}] },
      ],
    },
    {
      id: 2, nameAr: 'ضغط المائل بالدمبل', nameEn: 'Incline DB Press',
      muscle: 'Chest', sets: 3, reps: '10-12', rest: 90, level: 'advanced', emoji: '💪',
      history: [
        { week: 1, sets: [{w:28,r:12},{w:30,r:11},{w:30,r:10}] },
        { week: 2, sets: [{w:30,r:12},{w:32.5,r:11},{w:32.5,r:10}] },
      ],
    },
    {
      id: 3, nameAr: 'كابل فلاي', nameEn: 'Cable Fly',
      muscle: 'Chest', sets: 3, reps: '12-15', rest: 75, level: 'beginner', emoji: '🔄',
      history: [
        { week: 1, sets: [{w:20,r:15},{w:22,r:14},{w:22,r:12}] },
        { week: 2, sets: [{w:22,r:15},{w:24,r:13},{w:24,r:12}] },
      ],
    },
    {
      id: 4, nameAr: 'ضغط الكتف بالبار', nameEn: 'OHP Barbell',
      muscle: 'Shoulders', sets: 4, reps: '8-10', rest: 120, level: 'advanced', emoji: '🤸',
      history: [
        { week: 1, sets: [{w:50,r:10},{w:52.5,r:9},{w:52.5,r:8},{w:50,r:8}] },
        { week: 2, sets: [{w:52.5,r:10},{w:55,r:9},{w:55,r:8},{w:52.5,r:8}] },
      ],
    },
    {
      id: 5, nameAr: 'رفعات جانبية', nameEn: 'Lateral Raises',
      muscle: 'Shoulders', sets: 4, reps: '12-15', rest: 60, level: 'beginner', emoji: '↔️',
      history: [
        { week: 1, sets: [{w:10,r:15},{w:10,r:14},{w:10,r:13},{w:8,r:15}] },
        { week: 2, sets: [{w:10,r:15},{w:12,r:14},{w:12,r:13},{w:10,r:14}] },
      ],
    },
    {
      id: 6, nameAr: 'سكل كراشر', nameEn: 'Skull Crusher',
      muscle: 'Triceps', sets: 3, reps: '10-12', rest: 90, level: 'advanced', emoji: '🔱',
      history: [
        { week: 1, sets: [{w:30,r:12},{w:32.5,r:11},{w:32.5,r:10}] },
        { week: 2, sets: [{w:32.5,r:12},{w:35,r:11},{w:35,r:10}] },
      ],
    },
    {
      id: 7, nameAr: 'كابل تراي', nameEn: 'Tricep Pushdown',
      muscle: 'Triceps', sets: 3, reps: '12-15', rest: 60, level: 'beginner', emoji: '⬇️',
      history: [
        { week: 1, sets: [{w:25,r:15},{w:27,r:14},{w:27,r:12}] },
        { week: 2, sets: [{w:27,r:15},{w:30,r:14},{w:30,r:12}] },
      ],
    },
  ],
};

const CHART_DATA = {
  weight: [{d:'Jan 1',v:85},{d:'Jan 8',v:84.2},{d:'Jan 15',v:83.5},{d:'Jan 22',v:83},{d:'Feb 1',v:82.5},{d:'Feb 8',v:82}],
  fat:    [{d:'Jan 1',v:20.1},{d:'Jan 8',v:19.5},{d:'Jan 15',v:19},{d:'Jan 22',v:18.8},{d:'Feb 1',v:18.5},{d:'Feb 8',v:18.2}],
  muscle: [{d:'Jan 1',v:68},{d:'Jan 8',v:68.2},{d:'Jan 15',v:68.5},{d:'Jan 22',v:68.7},{d:'Feb 1',v:67.8},{d:'Feb 8',v:67.1}],
};

const CHAT_HISTORY = [
  { from: 'coach', text: 'عمل ممتاز اليوم! حافظ على هذا الزخم 💪', time: '10:30' },
  { from: 'me',    text: 'شكراً كوتش! الضغط كان ثقيل اليوم بس كملتها', time: '10:35' },
  { from: 'coach', text: 'الأسبوع الجاي نرفع الوزن 2.5 كيلو على البنش', time: '10:40' },
  { from: 'me',    text: 'حاضر، جاهز 🔥', time: '10:42' },
  { from: 'coach', text: 'لا تنسى النوم الكافي، مهم للتعافي', time: '11:00' },
];
