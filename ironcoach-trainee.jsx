import { useState, useEffect, useRef } from "react";

const COLORS = {
  black: "#080808",
  carbon: "#111111",
  steel: "#1a1a1a",
  graphite: "#242424",
  border: "#2a2a2a",
  muted: "#444",
  dim: "#888",
  text: "#c8c8c8",
  white: "#f0f0f0",
  accent: "#e8ff00",
  blue: "#00d4ff",
  orange: "#ff6b35",
  red: "#ff3b3b",
  green: "#00e676",
};

const style = (obj) => obj;

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockTrainee = {
  name: "أحمد الراشد",
  nameEn: "Ahmed Al-Rashid",
  age: 26,
  weight: 82,
  height: 178,
  bodyFat: 18.2,
  muscleMass: 67.1,
  waterPct: 58.4,
  goal: "Lean Bulk",
  plan: "PPL — Week 3",
  avatar: "A",
  streak: 12,
  waist: 85,
  chest: 102,
  arm: 38,
  thigh: 58,
  hip: 96,
};

const mealPlan = {
  targetCalories: 2850,
  protein: 164,
  carbs: 310,
  fat: 79,
  meals: [
    {
      id: 1, name: "الفطور", nameEn: "Breakfast", time: "07:30",
      options: [
        { id: "b1", label: "خيار A", calories: 520, protein: 38, carbs: 55, fat: 14, foods: ["6 بيض مسلوق", "شوفان 80g", "موز"] },
        { id: "b2", label: "خيار B", calories: 510, protein: 35, carbs: 58, fat: 12, foods: ["بيض مخفوق 4", "خبز قمح كامل", "تفاح"] },
        { id: "b3", label: "خيار C", calories: 500, protein: 40, carbs: 50, fat: 13, foods: ["يوغرت يوناني 200g", "شوفان 60g", "توت"] },
      ],
    },
    {
      id: 2, name: "الغداء", nameEn: "Lunch", time: "13:00",
      options: [
        { id: "l1", label: "خيار A", calories: 720, protein: 52, carbs: 88, fat: 18, foods: ["دجاج مشوي 200g", "أرز بني 150g", "سلطة خضراء"] },
        { id: "l2", label: "خيار B", calories: 710, protein: 48, carbs: 92, fat: 16, foods: ["سمك سلمون 180g", "بطاطا حلوة 200g", "بروكلي"] },
        { id: "l3", label: "خيار C", calories: 730, protein: 55, carbs: 82, fat: 20, foods: ["لحم بقر قليل الدهن 180g", "أرز 140g", "سبانخ"] },
      ],
    },
    {
      id: 3, name: "وجبة ما قبل التمرين", nameEn: "Pre-Workout", time: "16:30",
      options: [
        { id: "pw1", label: "خيار A", calories: 380, protein: 28, carbs: 48, fat: 8, foods: ["بروتين شيك", "موز", "شوفان 40g"] },
        { id: "pw2", label: "خيار B", calories: 360, protein: 25, carbs: 52, fat: 6, foods: ["تمر 5 حبات", "بروتين شيك", "تفاح"] },
      ],
    },
    {
      id: 4, name: "العشاء", nameEn: "Dinner", time: "20:00",
      options: [
        { id: "d1", label: "خيار A", calories: 680, protein: 58, carbs: 72, fat: 18, foods: ["دجاج 220g", "كينوا 130g", "خضروات مشوية"] },
        { id: "d2", label: "خيار B", calories: 670, protein: 54, carbs: 78, fat: 16, foods: ["تونة 200g", "مكرونة قمح كامل 130g", "طماطم"] },
        { id: "d3", label: "خيار C", calories: 690, protein: 60, carbs: 70, fat: 19, foods: ["لحم ديك رومي 210g", "بطاطا 180g", "فاصولياء"] },
      ],
    },
    {
      id: 5, name: "السناك", nameEn: "Snack", time: "22:30",
      options: [
        { id: "s1", label: "خيار A", calories: 280, protein: 24, carbs: 20, fat: 10, foods: ["كوتج تشيز 150g", "عسل", "مكسرات 20g"] },
        { id: "s2", label: "خيار B", calories: 260, protein: 22, carbs: 18, fat: 12, foods: ["كازيين بروتين", "زبدة فول سوداني 15g"] },
      ],
    },
  ],
};

const todayWorkout = {
  dayName: "يوم الصدر والكتف",
  dayNameEn: "Push Day — Chest & Shoulders",
  muscles: ["الصدر", "الكتف", "الترايسبس"],
  musclesEn: ["Chest", "Shoulders", "Triceps"],
  totalSets: 22,
  estimatedTime: 70,
  exercises: [
    { id: 1, name: "Bench Press", nameAr: "ضغط الصدر بالبار", muscle: "Chest", sets: 4, reps: "8-10", rest: 120, level: "advanced", image: "🏋️", video: true, history: [{ week: 1, sets: [{w:60,r:10},{w:65,r:9},{w:65,r:8},{w:60,r:8}] }, { week: 2, sets: [{w:65,r:10},{w:67.5,r:9},{w:67.5,r:8},{w:65,r:8}] }] },
    { id: 2, name: "Incline DB Press", nameAr: "ضغط المائل بالدمبل", muscle: "Chest", sets: 3, reps: "10-12", rest: 90, level: "advanced", image: "💪", video: true, history: [{ week: 1, sets: [{w:28,r:12},{w:30,r:11},{w:30,r:10}] }, { week: 2, sets: [{w:30,r:12},{w:32.5,r:11},{w:32.5,r:10}] }] },
    { id: 3, name: "Cable Fly", nameAr: "كابل فلاي", muscle: "Chest", sets: 3, reps: "12-15", rest: 75, level: "beginner", image: "🔄", video: true, history: [{ week: 1, sets: [{w:20,r:15},{w:22,r:14},{w:22,r:12}] }, { week: 2, sets: [{w:22,r:15},{w:24,r:13},{w:24,r:12}] }] },
    { id: 4, name: "OHP Barbell", nameAr: "ضغط الكتف بالبار", muscle: "Shoulders", sets: 4, reps: "8-10", rest: 120, level: "advanced", image: "🤸", video: true, history: [{ week: 1, sets: [{w:50,r:10},{w:52.5,r:9},{w:52.5,r:8},{w:50,r:8}] }, { week: 2, sets: [{w:52.5,r:10},{w:55,r:9},{w:55,r:8},{w:52.5,r:8}] }] },
    { id: 5, name: "Lateral Raises", nameAr: "رفعات جانبية", muscle: "Shoulders", sets: 4, reps: "12-15", rest: 60, level: "beginner", image: "↔️", video: true, history: [{ week: 1, sets: [{w:10,r:15},{w:10,r:14},{w:10,r:13},{w:8,r:15}] }, { week: 2, sets: [{w:10,r:15},{w:12,r:14},{w:12,r:13},{w:10,r:14}] }] },
    { id: 6, name: "Skull Crusher", nameAr: "سكل كراشر", muscle: "Triceps", sets: 3, reps: "10-12", rest: 90, level: "advanced", image: "🔱", video: true, history: [{ week: 1, sets: [{w:30,r:12},{w:32.5,r:11},{w:32.5,r:10}] }, { week: 2, sets: [{w:32.5,r:12},{w:35,r:11},{w:35,r:10}] }] },
    { id: 7, name: "Tricep Pushdown", nameAr: "كابل تراي", muscle: "Triceps", sets: 3, reps: "12-15", rest: 60, level: "beginner", image: "⬇️", video: true, history: [{ week: 1, sets: [{w:25,r:15},{w:27,r:14},{w:27,r:12}] }, { week: 2, sets: [{w:27,r:15},{w:30,r:14},{w:30,r:12}] }] },
  ],
};

const progressHistory = [
  { date: "Jan 1", weight: 85.0, bodyFat: 20.1, muscle: 68.0 },
  { date: "Jan 8", weight: 84.2, bodyFat: 19.5, muscle: 68.2 },
  { date: "Jan 15", weight: 83.5, bodyFat: 19.0, muscle: 68.5 },
  { date: "Jan 22", weight: 83.0, bodyFat: 18.8, muscle: 68.7 },
  { date: "Feb 1", weight: 82.5, bodyFat: 18.5, muscle: 67.8 },
  { date: "Feb 8", weight: 82.0, bodyFat: 18.2, muscle: 67.1 },
];

const messages = [
  { id: 1, from: "coach", name: "Coach Khaled", text: "عمل ممتاز اليوم! حافظ على هذا الزخم 💪", time: "10:30" },
  { id: 2, from: "me", text: "شكراً كوتش! الضغط كان ثقيل اليوم بس كملتها", time: "10:35" },
  { id: 3, from: "coach", name: "Coach Khaled", text: "الأسبوع الجاي نرفع الوزن 2.5 كيلو على البنش", time: "10:40" },
  { id: 4, from: "me", text: "حاضر، جاهز 🔥", time: "10:42" },
  { id: 5, from: "coach", name: "Coach Khaled", text: "لا تنسى النوم الكافي، مهم للتعافي", time: "11:00" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function MacroRing({ value, max, color, label, unit = "g", size = 72 }) {
  const pct = Math.min(value / max, 1);
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#2a2a2a" strokeWidth={6} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }} />
        <text x={size/2} y={size/2 + 1} textAnchor="middle" dominantBaseline="middle"
          fill={COLORS.white} fontSize={size > 80 ? 14 : 11} fontWeight="700"
          style={{ transform: "rotate(90deg)", transformOrigin: `${size/2}px ${size/2}px` }}>
          {value}
        </text>
        <text x={size/2} y={size/2 + (size > 80 ? 14 : 11)} textAnchor="middle" dominantBaseline="middle"
          fill={color} fontSize={8}
          style={{ transform: "rotate(90deg)", transformOrigin: `${size/2}px ${size/2}px` }}>
          {unit}
        </text>
      </svg>
      <span style={{ fontSize: 11, color: COLORS.dim, textAlign: "center" }}>{label}</span>
    </div>
  );
}

function Badge({ children, color = COLORS.accent }) {
  return (
    <span style={{ background: color + "20", border: `1px solid ${color}40`, color, borderRadius: 6,
      padding: "2px 8px", fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function NutritionPage() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [expanded, setExpanded] = useState(null);

  const totalConsumed = Object.values(selectedOptions).reduce((acc, opt) => {
    return { cal: acc.cal + (opt?.calories||0), p: acc.p + (opt?.protein||0), c: acc.c + (opt?.carbs||0), f: acc.f + (opt?.fat||0) };
  }, { cal: 0, p: 0, c: 0, f: 0 });

  return (
    <div style={{ padding: "0 0 100px" }}>
      {/* Macro Header */}
      <div style={{ background: "linear-gradient(135deg, #111 0%, #1a1a0a 100%)", padding: "24px 20px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: COLORS.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>التغذية اليومية</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.white }}>خطة الغذاء</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.accent, lineHeight: 1 }}>{totalConsumed.cal}</div>
            <div style={{ fontSize: 10, color: COLORS.dim }}>/ {mealPlan.targetCalories} kcal</div>
          </div>
        </div>

        {/* Calorie Progress Bar */}
        <div style={{ background: COLORS.border, borderRadius: 999, height: 6, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(totalConsumed.cal / mealPlan.targetCalories * 100, 100)}%`,
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.orange})`, borderRadius: 999,
            transition: "width 0.6s ease" }} />
        </div>

        {/* Macro Rings */}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <MacroRing value={totalConsumed.p} max={mealPlan.protein} color={COLORS.blue} label="بروتين" size={80} />
          <MacroRing value={totalConsumed.c} max={mealPlan.carbs} color={COLORS.accent} label="كارب" size={80} />
          <MacroRing value={totalConsumed.f} max={mealPlan.fat} color={COLORS.orange} label="دهون" size={80} />
        </div>

        {/* Macro numbers */}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 12 }}>
          {[
            { label: "بروتين", val: totalConsumed.p, max: mealPlan.protein, color: COLORS.blue },
            { label: "كارب", val: totalConsumed.c, max: mealPlan.carbs, color: COLORS.accent },
            { label: "دهون", val: totalConsumed.f, max: mealPlan.fat, color: COLORS.orange },
          ].map(m => (
            <div key={m.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: m.color, fontWeight: 700 }}>{m.val}g <span style={{ color: COLORS.dim, fontWeight: 400 }}>/ {m.max}g</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Meals */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 12, color: COLORS.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>الوجبات اليومية</div>
        {mealPlan.meals.map(meal => (
          <div key={meal.id} style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 16, marginBottom: 12, overflow: "hidden" }}>
            {/* Meal Header */}
            <div onClick={() => setExpanded(expanded === meal.id ? null : meal.id)}
              style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white }}>{meal.name}</div>
                <div style={{ fontSize: 11, color: COLORS.dim, marginTop: 2 }}>🕐 {meal.time} · {meal.options.length} خيارات</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {selectedOptions[meal.id] && (
                  <div style={{ background: COLORS.accent + "15", border: `1px solid ${COLORS.accent}30`, borderRadius: 8, padding: "4px 10px" }}>
                    <span style={{ fontSize: 12, color: COLORS.accent, fontWeight: 700 }}>{selectedOptions[meal.id].calories} kcal</span>
                  </div>
                )}
                <div style={{ color: COLORS.dim, fontSize: 16, transition: "transform 0.2s",
                  transform: expanded === meal.id ? "rotate(180deg)" : "rotate(0)" }}>▼</div>
              </div>
            </div>

            {/* Options */}
            {expanded === meal.id && (
              <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "12px 16px 16px" }}>
                <div style={{ fontSize: 10, color: COLORS.dim, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>اختر وجبتك</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {meal.options.map(opt => {
                    const isSelected = selectedOptions[meal.id]?.id === opt.id;
                    return (
                      <div key={opt.id} onClick={() => setSelectedOptions(prev => ({ ...prev, [meal.id]: isSelected ? null : opt }))}
                        style={{ border: `1px solid ${isSelected ? COLORS.accent : COLORS.border}`,
                          background: isSelected ? COLORS.accent + "08" : COLORS.steel,
                          borderRadius: 12, padding: "12px 14px", cursor: "pointer",
                          transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isSelected ? COLORS.accent : COLORS.muted}`,
                              background: isSelected ? COLORS.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.black }} />}
                            </div>
                            <span style={{ fontWeight: 700, color: COLORS.white, fontSize: 13 }}>{opt.label}</span>
                          </div>
                          <span style={{ fontWeight: 700, color: COLORS.accent, fontSize: 14 }}>{opt.calories} kcal</span>
                        </div>
                        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                          {[{l:"P", v:opt.protein, c:COLORS.blue}, {l:"C", v:opt.carbs, c:COLORS.accent}, {l:"F", v:opt.fat, c:COLORS.orange}].map(m => (
                            <div key={m.l} style={{ fontSize: 11, color: m.c }}><span style={{ fontWeight: 700 }}>{m.v}g</span> <span style={{ color: COLORS.dim }}>{m.l}</span></div>
                          ))}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {opt.foods.map((f, i) => (
                            <span key={i} style={{ fontSize: 11, color: COLORS.dim, background: COLORS.graphite, borderRadius: 6, padding: "2px 8px" }}>{f}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutPage() {
  const [activeExercise, setActiveExercise] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentSets, setCurrentSets] = useState({});
  const [completedExercises, setCompletedExercises] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  useEffect(() => {
    if (activeExercise) {
      setTimer(0);
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
      setTimer(0);
    }
  }, [activeExercise]);

  const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const updateSet = (exId, setIdx, field, value) => {
    setCurrentSets(prev => {
      const ex = prev[exId] || {};
      const sets = ex.sets ? [...ex.sets] : [];
      if (!sets[setIdx]) sets[setIdx] = { weight: "", reps: "" };
      sets[setIdx] = { ...sets[setIdx], [field]: value };
      return { ...prev, [exId]: { ...ex, sets } };
    });
  };

  const completeExercise = (exId) => {
    setCompletedExercises(prev => [...prev, exId]);
    setActiveExercise(null);
  };

  if (activeExercise) {
    const ex = todayWorkout.exercises.find(e => e.id === activeExercise);
    const sets = currentSets[ex.id]?.sets || [];
    const lastWeek = ex.history[ex.history.length - 1];

    return (
      <div style={{ minHeight: "100vh", background: COLORS.black, paddingBottom: 100 }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(180deg, #1a1a0a 0%, #111 100%)", padding: "20px 20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <button onClick={() => setActiveExercise(null)}
              style={{ background: COLORS.graphite, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 14px",
                color: COLORS.text, fontSize: 13, cursor: "pointer" }}>← رجوع</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.graphite, borderRadius: 10,
              padding: "6px 14px", border: `1px solid ${COLORS.accent}30` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent, animation: "pulse 1.5s infinite" }} />
              <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: 16, fontFamily: "monospace" }}>{formatTime(timer)}</span>
            </div>
            <button onClick={() => setShowHistory(!showHistory)}
              style={{ background: COLORS.graphite, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 14px",
                color: COLORS.dim, fontSize: 12, cursor: "pointer" }}>📊 السجل</button>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.white }}>{ex.nameAr}</div>
          <div style={{ fontSize: 13, color: COLORS.dim, marginTop: 2 }}>{ex.name} · {ex.sets} sets × {ex.reps} reps</div>
        </div>

        {/* Exercise Video/Image */}
        <div style={{ background: "linear-gradient(135deg, #1a1a0a, #0a0a1a)", height: 200, display: "flex",
          alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 80 }}>{ex.image}</div>
          <div style={{ position: "absolute", bottom: 12, right: 16, background: COLORS.black + "cc", borderRadius: 8,
            padding: "4px 10px", fontSize: 11, color: COLORS.accent, border: `1px solid ${COLORS.accent}30` }}>
            ▶ فيديو توضيحي
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 16 }}>
            <Badge color={ex.level === "advanced" ? COLORS.accent : COLORS.green}>{ex.level}</Badge>
          </div>
        </div>

        {/* Last Week History */}
        {showHistory && lastWeek && (
          <div style={{ margin: "12px 16px", background: COLORS.carbon, border: `1px solid ${COLORS.accent}30`, borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, color: COLORS.accent, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
              📅 الأسبوع الماضي (Week {lastWeek.week})
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {lastWeek.sets.map((s, i) => (
                <div key={i} style={{ flex: 1, background: COLORS.graphite, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 4 }}>Set {i+1}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>{s.w}kg</div>
                  <div style={{ fontSize: 11, color: COLORS.blue }}>{s.r} reps</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sets Logger */}
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ fontSize: 12, color: COLORS.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>سجل الجولات</div>
          <div style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr 44px", padding: "10px 14px",
              borderBottom: `1px solid ${COLORS.border}`, gap: 8 }}>
              <div style={{ fontSize: 10, color: COLORS.dim, textAlign: "center" }}>#</div>
              <div style={{ fontSize: 10, color: COLORS.dim, textAlign: "center" }}>الوزن (kg)</div>
              <div style={{ fontSize: 10, color: COLORS.dim, textAlign: "center" }}>التكرار</div>
              <div style={{ fontSize: 10, color: COLORS.dim, textAlign: "center" }}>✓</div>
            </div>
            {Array.from({ length: ex.sets }, (_, i) => {
              const setData = sets[i] || {};
              const isDone = setData.done;
              const lastSet = lastWeek?.sets[i];
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr 44px", padding: "10px 14px",
                  borderBottom: i < ex.sets - 1 ? `1px solid ${COLORS.border}` : "none",
                  background: isDone ? COLORS.accent + "08" : "transparent", gap: 8, alignItems: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: isDone ? COLORS.accent : COLORS.muted, textAlign: "center" }}>{i+1}</div>
                  <div>
                    <input type="number" value={setData.weight || ""} placeholder={lastSet ? `${lastSet.w}` : "0"}
                      onChange={e => updateSet(ex.id, i, "weight", e.target.value)}
                      style={{ width: "100%", background: COLORS.graphite, border: `1px solid ${isDone ? COLORS.accent + "40" : COLORS.border}`,
                        borderRadius: 8, padding: "8px 10px", color: COLORS.white, fontSize: 15, fontWeight: 700,
                        textAlign: "center", outline: "none" }} />
                    {lastSet && <div style={{ fontSize: 9, color: COLORS.dim, textAlign: "center", marginTop: 2 }}>prev: {lastSet.w}kg</div>}
                  </div>
                  <div>
                    <input type="number" value={setData.reps || ""} placeholder={lastSet ? `${lastSet.r}` : ex.reps.split("-")[0]}
                      onChange={e => updateSet(ex.id, i, "reps", e.target.value)}
                      style={{ width: "100%", background: COLORS.graphite, border: `1px solid ${isDone ? COLORS.accent + "40" : COLORS.border}`,
                        borderRadius: 8, padding: "8px 10px", color: COLORS.white, fontSize: 15, fontWeight: 700,
                        textAlign: "center", outline: "none" }} />
                    {lastSet && <div style={{ fontSize: 9, color: COLORS.dim, textAlign: "center", marginTop: 2 }}>prev: {lastSet.r}</div>}
                  </div>
                  <button onClick={() => updateSet(ex.id, i, "done", !isDone)}
                    style={{ width: 36, height: 36, borderRadius: 10, border: `2px solid ${isDone ? COLORS.accent : COLORS.border}`,
                      background: isDone ? COLORS.accent : COLORS.graphite, cursor: "pointer", fontSize: 16,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isDone ? "✓" : ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rest Timer hint */}
        <div style={{ margin: "12px 16px", background: COLORS.steel, borderRadius: 10, padding: "10px 14px",
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: COLORS.dim }}>وقت الراحة بين الجولات</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.blue }}>{ex.rest}s</span>
        </div>

        <div style={{ padding: "0 16px" }}>
          <button onClick={() => completeExercise(ex.id)}
            style={{ width: "100%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.orange})`,
              border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 800,
              color: COLORS.black, cursor: "pointer", letterSpacing: 0.5 }}>
            ✓ إنهاء التمرين
          </button>
        </div>
      </div>
    );
  }

  const completedCount = completedExercises.length;
  const totalEx = todayWorkout.exercises.length;

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #111 100%)", padding: "24px 20px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 11, color: COLORS.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>تمرين اليوم</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.white, marginBottom: 4 }}>{todayWorkout.dayName}</div>
        <div style={{ fontSize: 13, color: COLORS.dim, marginBottom: 16 }}>{todayWorkout.dayNameEn}</div>

        {/* Stats Row */}
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { label: "تمارين", val: totalEx, icon: "💪" },
            { label: "جولات", val: todayWorkout.totalSets, icon: "🔄" },
            { label: "دقيقة", val: todayWorkout.estimatedTime, icon: "⏱" },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: COLORS.graphite, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white, lineHeight: 1.2 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: COLORS.dim }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Target muscles */}
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {todayWorkout.muscles.map(m => <Badge key={m} color={COLORS.blue}>{m}</Badge>)}
        </div>

        {/* Progress */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: COLORS.dim }}>التقدم</span>
            <span style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700 }}>{completedCount}/{totalEx}</span>
          </div>
          <div style={{ background: COLORS.border, borderRadius: 999, height: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(completedCount/totalEx)*100}%`,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.green})`, borderRadius: 999, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div style={{ padding: "16px 16px 0" }}>
        {todayWorkout.exercises.map((ex, i) => {
          const isDone = completedExercises.includes(ex.id);
          return (
            <div key={ex.id} onClick={() => !isDone && setActiveExercise(ex.id)}
              style={{ background: isDone ? COLORS.accent + "08" : COLORS.carbon,
                border: `1px solid ${isDone ? COLORS.accent + "40" : COLORS.border}`,
                borderRadius: 16, marginBottom: 10, padding: "14px 16px", cursor: isDone ? "default" : "pointer",
                display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s",
                opacity: isDone ? 0.7 : 1 }}>
              <div style={{ fontSize: 36, width: 48, textAlign: "center" }}>{ex.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white }}>{ex.nameAr}</div>
                  {isDone && <span style={{ color: COLORS.green, fontSize: 18 }}>✓</span>}
                </div>
                <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 6 }}>{ex.name}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: COLORS.blue, background: COLORS.blue + "15", borderRadius: 6, padding: "2px 8px" }}>{ex.sets} sets</span>
                  <span style={{ fontSize: 11, color: COLORS.accent, background: COLORS.accent + "15", borderRadius: 6, padding: "2px 8px" }}>{ex.reps} reps</span>
                  <span style={{ fontSize: 11, color: COLORS.dim, background: COLORS.graphite, borderRadius: 6, padding: "2px 8px" }}>⏱ {ex.rest}s</span>
                  <Badge color={ex.muscle === "Chest" ? COLORS.orange : ex.muscle === "Shoulders" ? COLORS.blue : COLORS.muted}>{ex.muscle}</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProgressPage() {
  const [activeMetric, setActiveMetric] = useState("weight");

  const bmi = (mockTrainee.weight / ((mockTrainee.height / 100) ** 2)).toFixed(1);
  const bmiStatus = bmi < 18.5 ? "نحيف" : bmi < 25 ? "طبيعي" : bmi < 30 ? "زيادة وزن" : "سمنة";
  const bmiColor = bmi < 18.5 ? COLORS.blue : bmi < 25 ? COLORS.green : bmi < 30 ? COLORS.accent : COLORS.red;

  const metrics = progressHistory.map(h => ({ date: h.date, weight: h.weight, bodyFat: h.bodyFat, muscle: h.muscle }));
  const latest = metrics[metrics.length - 1];
  const prev = metrics[metrics.length - 2];
  const delta = { weight: (latest.weight - prev.weight).toFixed(1), bodyFat: (latest.bodyFat - prev.bodyFat).toFixed(1), muscle: (latest.muscle - prev.muscle).toFixed(1) };

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #111 100%)", padding: "24px 20px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 11, color: COLORS.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>التطور والمقاسات</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.white }}>تتبع التقدم</div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* BMI Card */}
        <div style={{ background: COLORS.carbon, border: `1px solid ${bmiColor}40`, borderRadius: 16, padding: 18, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.dim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>مؤشر كتلة الجسم — BMI</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 52, fontWeight: 900, color: bmiColor, lineHeight: 1 }}>{bmi}</span>
                <span style={{ fontSize: 16, color: bmiColor, fontWeight: 700 }}>{bmiStatus}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.dim, marginTop: 4 }}>الوزن: {mockTrainee.weight}kg · الطول: {mockTrainee.height}cm</div>
            </div>
            <div>
              <svg width={80} height={80} viewBox="0 0 80 80">
                <circle cx={40} cy={40} r={34} fill="none" stroke={COLORS.border} strokeWidth={7} />
                <circle cx={40} cy={40} r={34} fill="none" stroke={bmiColor} strokeWidth={7}
                  strokeDasharray={`${Math.min((bmi / 40) * 213, 213)} 213`}
                  strokeLinecap="round" style={{ transform: "rotate(-90deg)", transformOrigin: "40px 40px" }} />
                <text x={40} y={44} textAnchor="middle" fill={COLORS.white} fontSize={14} fontWeight="800">{bmi}</text>
              </svg>
            </div>
          </div>
          {/* BMI Scale */}
          <div style={{ marginTop: 14 }}>
            <div style={{ height: 6, borderRadius: 999, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.green}, ${COLORS.accent}, ${COLORS.orange}, ${COLORS.red})`, position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)",
                left: `${Math.min(Math.max(((bmi - 14) / 26) * 100, 2), 98)}%`,
                width: 12, height: 12, borderRadius: "50%", background: COLORS.white,
                boxShadow: `0 0 0 2px ${bmiColor}`, marginLeft: -6 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 9, color: COLORS.dim }}>
              <span>نحيف &lt;18.5</span><span>طبيعي 18.5–25</span><span>زيادة 25–30</span><span>سمنة &gt;30</span>
            </div>
          </div>
        </div>

        {/* Body Composition */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[
            { label: "العضلات", val: mockTrainee.muscleMass, unit: "kg", color: COLORS.blue, icon: "💪",
              delta: delta.muscle, max: 90 },
            { label: "الدهون", val: mockTrainee.bodyFat, unit: "%", color: COLORS.orange, icon: "🔥",
              delta: delta.bodyFat, max: 40 },
            { label: "الماء", val: mockTrainee.waterPct, unit: "%", color: COLORS.blue, icon: "💧",
              delta: 0, max: 70 },
          ].map(m => (
            <div key={m.label} style={{ background: COLORS.carbon, border: `1px solid ${m.color}30`, borderRadius: 14, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{m.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: m.color, lineHeight: 1.2 }}>{m.val}</div>
              <div style={{ fontSize: 10, color: m.color, marginBottom: 4 }}>{m.unit}</div>
              <div style={{ fontSize: 11, color: COLORS.dim }}>{m.label}</div>
              {m.delta !== 0 && (
                <div style={{ fontSize: 10, color: m.delta < 0 ? COLORS.green : COLORS.red, marginTop: 4 }}>
                  {m.delta > 0 ? "+" : ""}{m.delta}{m.unit}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Weight & Height */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[
            { label: "الوزن", val: mockTrainee.weight, unit: "kg", color: COLORS.white, delta: delta.weight },
            { label: "الطول", val: mockTrainee.height, unit: "cm", color: COLORS.blue, delta: null },
          ].map(m => (
            <div key={m.label} style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 11, color: COLORS.dim, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: m.color }}>{m.val}</div>
              <div style={{ fontSize: 12, color: COLORS.dim }}>{m.unit} {m.delta && <span style={{ color: parseFloat(m.delta) < 0 ? COLORS.green : COLORS.red }}>{m.delta > 0 ? "+" : ""}{m.delta}kg</span>}</div>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>منحنى التقدم</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[{k:"weight",l:"الوزن"},{k:"bodyFat",l:"الدهون"},{k:"muscle",l:"العضلات"}].map(m => (
                <button key={m.k} onClick={() => setActiveMetric(m.k)}
                  style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${activeMetric === m.k ? COLORS.accent : COLORS.border}`,
                    background: activeMetric === m.k ? COLORS.accent + "20" : "transparent",
                    color: activeMetric === m.k ? COLORS.accent : COLORS.dim, fontSize: 10, cursor: "pointer" }}>
                  {m.l}
                </button>
              ))}
            </div>
          </div>
          {/* Mini Chart */}
          <div style={{ height: 80, display: "flex", alignItems: "flex-end", gap: 4 }}>
            {metrics.map((m, i) => {
              const val = m[activeMetric];
              const allVals = metrics.map(x => x[activeMetric]);
              const min = Math.min(...allVals);
              const max = Math.max(...allVals);
              const h = ((val - min) / (max - min || 1)) * 60 + 10;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ fontSize: 9, color: COLORS.dim }}>{val}</div>
                  <div style={{ width: "80%", height: h, background: i === metrics.length - 1 ? COLORS.accent : COLORS.blue + "60",
                    borderRadius: "4px 4px 0 0", transition: "height 0.5s ease" }} />
                  <div style={{ fontSize: 8, color: COLORS.dim, textAlign: "center" }}>{m.date.split(" ")[0]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Body Measurements */}
        <div style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>📏 مقاسات الجسم</div>
          </div>
          {[
            { label: "الصدر", val: mockTrainee.chest, unit: "cm", icon: "💪" },
            { label: "الخصر", val: mockTrainee.waist, unit: "cm", icon: "〰️" },
            { label: "الأرداف", val: mockTrainee.hip, unit: "cm", icon: "🍑" },
            { label: "الذراع", val: mockTrainee.arm, unit: "cm", icon: "✊" },
            { label: "الفخذ", val: mockTrainee.thigh, unit: "cm", icon: "🦵" },
          ].map((m, i, arr) => (
            <div key={m.label} style={{ display: "flex", alignItems: "center", padding: "12px 16px",
              borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <span style={{ fontSize: 20, width: 32 }}>{m.icon}</span>
              <span style={{ flex: 1, color: COLORS.text, fontSize: 14 }}>{m.label}</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.white }}>{m.val}</span>
              <span style={{ fontSize: 12, color: COLORS.dim, marginLeft: 4 }}>{m.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatPage({ onBack }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(messages);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { id: Date.now(), from: "me", text: input, time: new Date().toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: COLORS.black }}>
      {/* Header */}
      <div style={{ background: COLORS.carbon, borderBottom: `1px solid ${COLORS.border}`, padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.accent, fontSize: 20, cursor: "pointer" }}>←</button>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.accent})`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: COLORS.black }}>K</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white }}>Coach Khaled</div>
          <div style={{ fontSize: 11, color: COLORS.green }}>● متصل الآن</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {msgs.map(msg => (
          <div key={msg.id} style={{ display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            <div style={{ maxWidth: "75%" }}>
              <div style={{ background: msg.from === "me" ? COLORS.accent : COLORS.graphite,
                color: msg.from === "me" ? COLORS.black : COLORS.white,
                borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "10px 14px", fontSize: 14, lineHeight: 1.5 }}>
                {msg.text}
              </div>
              <div style={{ fontSize: 10, color: COLORS.dim, marginTop: 4, textAlign: msg.from === "me" ? "right" : "left" }}>{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px", background: COLORS.carbon, borderTop: `1px solid ${COLORS.border}`,
        display: "flex", gap: 10, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="اكتب رسالة..."
          style={{ flex: 1, background: COLORS.graphite, border: `1px solid ${COLORS.border}`, borderRadius: 24,
            padding: "12px 18px", color: COLORS.white, fontSize: 14, outline: "none" }} />
        <button onClick={send}
          style={{ width: 46, height: 46, borderRadius: "50%", background: COLORS.accent, border: "none",
            color: COLORS.black, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          ↑
        </button>
      </div>
    </div>
  );
}

function ProfilePanel({ onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
      <div onClick={onClose} style={{ flex: 1, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
      <div style={{ width: "85%", maxWidth: 360, background: COLORS.carbon, height: "100vh", overflowY: "auto",
        borderLeft: `1px solid ${COLORS.border}`, animation: "slideIn 0.3s ease" }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
        <div style={{ padding: "48px 24px 24px" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: COLORS.graphite,
            border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "6px 12px", color: COLORS.dim, cursor: "pointer" }}>✕</button>

          {/* Avatar */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.orange})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900,
              color: COLORS.black, margin: "0 auto 12px" }}>
              {mockTrainee.avatar}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.white }}>{mockTrainee.name}</div>
            <div style={{ fontSize: 12, color: COLORS.dim }}>{mockTrainee.nameEn}</div>
            <div style={{ marginTop: 8 }}>
              <Badge color={COLORS.accent}>{mockTrainee.plan}</Badge>
            </div>
          </div>

          {/* Info */}
          {[
            { label: "العمر", val: `${mockTrainee.age} سنة` },
            { label: "الوزن", val: `${mockTrainee.weight} kg` },
            { label: "الطول", val: `${mockTrainee.height} cm` },
            { label: "الهدف", val: mockTrainee.goal },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0",
              borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ color: COLORS.dim, fontSize: 13 }}>{item.label}</span>
              <span style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>{item.val}</span>
            </div>
          ))}

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "📋 تعديل الملف الشخصي", color: COLORS.blue },
              { label: "🔔 الإشعارات", color: COLORS.text },
              { label: "🌐 اللغة / Language", color: COLORS.text },
              { label: "💳 الاشتراك", color: COLORS.accent },
              { label: "🔐 تغيير كلمة المرور", color: COLORS.text },
              { label: "🚪 تسجيل الخروج", color: COLORS.red },
            ].map(item => (
              <button key={item.label} style={{ background: COLORS.steel, border: `1px solid ${COLORS.border}`,
                borderRadius: 12, padding: "14px 16px", textAlign: "right", color: item.color, fontSize: 14,
                cursor: "pointer", width: "100%" }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function IronCoachTrainee() {
  const [page, setPage] = useState("home");
  const [showProfile, setShowProfile] = useState(false);

  // Swipe to open profile
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff < -80) setShowProfile(true); // swipe right
      touchStartX.current = null;
    }
  };

  if (page === "chat") return <ChatPage onBack={() => setPage("home")} />;

  const tabs = [
    { id: "home", icon: "🏠", label: "الرئيسية" },
    { id: "workout", icon: "💪", label: "التمرين" },
    { id: "nutrition", icon: "🥗", label: "التغذية" },
    { id: "progress", icon: "📈", label: "التطور" },
  ];

  return (
    <div style={{ background: COLORS.black, minHeight: "100vh", maxWidth: 430, margin: "0 auto",
      position: "relative", fontFamily: "'DM Sans', sans-serif", direction: "rtl" }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}

      {/* TOP BAR */}
      <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430, zIndex: 100,
        background: "rgba(8,8,8,0.92)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${COLORS.border}`, padding: "12px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div onClick={() => setShowProfile(true)}
            style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.orange})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700,
              color: COLORS.black, cursor: "pointer" }}>
            {mockTrainee.avatar}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>{mockTrainee.name}</div>
            <div style={{ fontSize: 10, color: COLORS.dim }}>اسحب يميناً للملف الشخصي</div>
          </div>
        </div>
        <button onClick={() => setPage("chat")}
          style={{ background: COLORS.graphite, border: `1px solid ${COLORS.border}`, borderRadius: 12,
            padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
          <span style={{ fontSize: 16 }}>💬</span> كوتش
        </button>
      </div>

      {/* PAGE CONTENT */}
      <div style={{ paddingTop: 65 }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "workout" && <WorkoutPage />}
        {page === "nutrition" && <NutritionPage />}
        {page === "progress" && <ProgressPage />}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430, background: "rgba(8,8,8,0.96)", backdropFilter: "blur(20px)",
        borderTop: `1px solid ${COLORS.border}`, padding: "10px 0 16px",
        display: "flex", justifyContent: "space-around", zIndex: 100 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setPage(tab.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 16px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, color: page === tab.id ? COLORS.accent : COLORS.dim,
              fontWeight: page === tab.id ? 700 : 400 }}>{tab.label}</span>
            {page === tab.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.accent }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  const bmi = (mockTrainee.weight / ((mockTrainee.height / 100) ** 2)).toFixed(1);

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a0a 50%, #0d0d0d 100%)", padding: "24px 20px 20px" }}>
        <div style={{ fontSize: 12, color: COLORS.dim, marginBottom: 4 }}>مرحباً،</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.white, marginBottom: 2 }}>{mockTrainee.name} 👋</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <Badge color={COLORS.accent}>🔥 {mockTrainee.streak} يوم متتالي</Badge>
          <Badge color={COLORS.blue}>{mockTrainee.goal}</Badge>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "الوزن", val: mockTrainee.weight, unit: "kg", color: COLORS.white },
            { label: "BMI", val: bmi, unit: "", color: COLORS.green },
            { label: "الدهون", val: `${mockTrainee.bodyFat}%`, unit: "", color: COLORS.orange },
          ].map(s => (
            <div key={s.label} style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 9, color: COLORS.dim, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Today's Workout Card */}
        <div onClick={() => setPage("workout")}
          style={{ background: `linear-gradient(135deg, #0a0a1a, #1a1a0a)`,
            border: `1px solid ${COLORS.accent}40`, borderRadius: 18, padding: 20, marginBottom: 12, cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>تمرين اليوم</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white }}>{todayWorkout.dayName}</div>
              <div style={{ fontSize: 12, color: COLORS.dim, marginTop: 4 }}>{todayWorkout.exercises.length} تمارين · {todayWorkout.totalSets} جولات</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                {todayWorkout.muscles.map(m => <Badge key={m} color={COLORS.blue}>{m}</Badge>)}
              </div>
            </div>
            <div style={{ fontSize: 48 }}>🏋️</div>
          </div>
          <div style={{ marginTop: 16, background: COLORS.accent, borderRadius: 10, padding: "10px 16px",
            textAlign: "center", color: COLORS.black, fontWeight: 800, fontSize: 14 }}>
            ابدأ التمرين →
          </div>
        </div>

        {/* Nutrition Card */}
        <div onClick={() => setPage("nutrition")}
          style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 18, marginBottom: 12, cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>التغذية اليومية</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white }}>{mealPlan.targetCalories} <span style={{ fontSize: 13, color: COLORS.dim, fontWeight: 400 }}>kcal</span></div>
            </div>
            <div style={{ fontSize: 40 }}>🥗</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[{l:"بروتين", v:mealPlan.protein, c:COLORS.blue}, {l:"كارب", v:mealPlan.carbs, c:COLORS.accent}, {l:"دهون", v:mealPlan.fat, c:COLORS.orange}].map(m => (
              <div key={m.l} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: m.c }}>{m.v}g</div>
                <div style={{ fontSize: 10, color: COLORS.dim }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <div onClick={() => setPage("progress")}
          style={{ background: COLORS.carbon, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 18, cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.dim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>التطور</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white }}>تتبع مقاساتك</div>
              <div style={{ fontSize: 12, color: COLORS.green, marginTop: 4 }}>↓ 3kg منذ البداية</div>
            </div>
            <div style={{ fontSize: 40 }}>📈</div>
          </div>
        </div>
      </div>
    </div>
  );
}
