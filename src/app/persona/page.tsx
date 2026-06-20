'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { createClient } from '@/lib/supabase';

// ==================== تایپ‌ها ====================
type Answer = string | number | string[];

interface Question {
  id: number;
  text: string;
  type: 'single' | 'multi' | 'text' | 'number' | 'range' | 'name';
  options?: string[];
}

interface PersonaResult {
  name: string;
  age: string;
  job: string;
  activity: string;
  techLevel: string;
  goals: string[];
  challenges: string[];
  needs: string[];
  motivations: string[];
  workBehavior: string;
  techAdoption: string;
  quote: string;
}

// ==================== سوالات ====================
const questions: Question[] = [
  {
    id: 0,
    text: 'لطفاً نام خود را وارد کنید',
    type: 'name',
  },
  {
    id: 1,
    text: 'سن شما در کدام بازه قرار دارد؟',
    type: 'single',
    options: ['زیر 25 سال', '25 تا 35 سال', '35 تا 45 سال', '45 تا 55 سال', 'بالای 55 سال'],
  },
  {
    id: 2,
    text: 'شغل شما چیست؟',
    type: 'text',
  },
  {
    id: 3,
    text: 'آیا مالک مزرعه هستید؟',
    type: 'single',
    options: ['بله', 'خیر', 'مدیر یا ناظر مزرعه'],
  },
  {
    id: 4,
    text: 'وسعت زمین یا مزرعه شما چقدر است؟',
    type: 'single',
    options: ['کمتر از 1 هکتار', '1 تا 5 هکتار', '5 تا 20 هکتار', 'بیش از 20 هکتار'],
  },
  {
    id: 5,
    text: 'مهم‌ترین محصول یا فعالیت شما چیست؟',
    type: 'single',
    options: ['زراعت', 'باغداری', 'گلخانه', 'دامداری', 'سایر'],
  },
  {
    id: 6,
    text: 'در حال حاضر وضعیت مزرعه را چگونه پایش می‌کنید؟ (چند گزینه)',
    type: 'multi',
    options: ['مراجعه حضوری', 'تماس با کارگران', 'سنسورها و تجهیزات دیجیتال', 'دوربین‌های مداربسته', 'روش‌های دیگر'],
  },
  {
    id: 7,
    text: 'بزرگ‌ترین مشکل شما در مدیریت مزرعه چیست؟',
    type: 'text',
  },
  {
    id: 8,
    text: 'چند بار در هفته به مزرعه سر می‌زنید؟',
    type: 'text',
  },
  {
    id: 9,
    text: 'آیا تاکنون از سنسورها یا تجهیزات هوشمند استفاده کرده‌اید؟',
    type: 'single',
    options: ['بله', 'خیر'],
  },
  {
    id: 10,
    text: 'چقدر به کنترل تجهیزات از راه دور علاقه دارید؟ (از 1 تا 5)',
    type: 'range',
  },
  {
    id: 11,
    text: 'چقدر به مشاهده داده‌های لحظه‌ای مزرعه علاقه دارید؟ (از 1 تا 5)',
    type: 'range',
  },
  {
    id: 12,
    text: 'مهم‌ترین اطلاعاتی که دوست دارید مشاهده کنید چیست؟ (چند گزینه)',
    type: 'multi',
    options: ['رطوبت خاک', 'دما و رطوبت هوا', 'وضعیت آبیاری', 'مصرف آب', 'وضعیت تجهیزات', 'پیش‌بینی آب و هوا', 'سایر'],
  },
  {
    id: 13,
    text: 'اگر سامانه‌ای بتواند زمان و هزینه مدیریت مزرعه را کاهش دهد، چقدر احتمال دارد از آن استفاده کنید؟ (از 1 تا 5)',
    type: 'range',
  },
  {
    id: 14,
    text: 'مهم‌ترین عامل در انتخاب چنین سامانه‌ای چیست؟',
    type: 'single',
    options: ['قیمت', 'سادگی استفاده', 'قابلیت اطمینان', 'امکانات', 'پشتیبانی'],
  },
  {
    id: 15,
    text: 'اگر بخواهید یک قابلیت به کشت‌یار اضافه شود، آن قابلیت چیست؟',
    type: 'text',
  },
];

// ==================== تحلیل پاسخ‌ها ====================
function analyzeAnswers(answers: Record<number, Answer>, userName: string): PersonaResult {
  const age = answers[1] as string || 'نامشخص';
  const job = answers[2] as string || 'نامشخص';
  const ownership = answers[3] as string || '';
  const landSize = answers[4] as string || '';
  const activity = answers[5] as string || '';
  const currentMethod = answers[6] as string[] || [];
  const mainProblem = answers[7] as string || '';
  const visitCount = answers[8] as string || '';
  const usedSmart = answers[9] as string || 'خیر';
  const remoteControl = Number(answers[10]) || 0;
  const realtimeData = Number(answers[11]) || 0;
  const importantInfo = answers[12] as string[] || [];
  const adoptionLikelihood = Number(answers[13]) || 0;
  const importantFactor = answers[14] as string || '';
  const extraFeature = answers[15] as string || '';

  let techLevel = 'پایین';
  if (usedSmart === 'بله' || remoteControl >= 4 || realtimeData >= 4) {
    techLevel = 'بالا';
  } else if (remoteControl >= 3 || realtimeData >= 3 || currentMethod.some(m => m.includes('سنسور') || m.includes('دوربین'))) {
    techLevel = 'متوسط';
  }

  let techAdoption = 'پایین';
  if (adoptionLikelihood >= 4 || remoteControl >= 4 || realtimeData >= 4) {
    techAdoption = 'بالا';
  } else if (adoptionLikelihood >= 3) {
    techAdoption = 'متوسط';
  }

  const goals: string[] = [];
  if (landSize.includes('بیش از') || landSize.includes('5 تا')) goals.push('مدیریت بهتر مزرعه بزرگ');
  if (importantInfo.some(i => i.includes('رطوبت') || i.includes('آبیاری'))) goals.push('بهبود مدیریت آبیاری');
  if (realtimeData >= 4) goals.push('دسترسی به داده‌های لحظه‌ای');
  if (remoteControl >= 4) goals.push('کنترل تجهیزات از راه دور');
  if (adoptionLikelihood >= 4) goals.push('کاهش هزینه و زمان مدیریت');
  if (goals.length === 0) goals.push('بهبود کلی مدیریت مزرعه');

  const challenges: string[] = [];
  if (mainProblem) challenges.push(mainProblem);
  if (ownership === 'خیر') challenges.push('نبود مالکیت مستقیم بر مزرعه');
  if (visitCount && Number(visitCount) < 3) challenges.push('سر زدن محدود به مزرعه');
  if (currentMethod.includes('مراجعه حضوری')) challenges.push('نیاز به حضور فیزیکی');
  if (landSize.includes('بیش از')) challenges.push('وسعت زیاد مزرعه');
  if (challenges.length === 0) challenges.push('نیاز به بهبود فرآیندهای مدیریتی');

  const needs: string[] = [];
  if (realtimeData >= 4) needs.push('پایش لحظه‌ای');
  if (remoteControl >= 4) needs.push('کنترل از راه دور');
  if (importantInfo.some(i => i.includes('رطوبت'))) needs.push('اطلاع از رطوبت خاک');
  if (importantInfo.some(i => i.includes('آبیاری'))) needs.push('مدیریت هوشمند آبیاری');
  if (importantInfo.some(i => i.includes('مصرف'))) needs.push('مدیریت مصرف آب');
  if (importantInfo.some(i => i.includes('پیش‌بینی'))) needs.push('پیش‌بینی آب و هوا');
  if (needs.length === 0) needs.push('دسترسی به اطلاعات دقیق مزرعه');

  const motivations: string[] = [];
  if (adoptionLikelihood >= 4) motivations.push('کاهش هزینه‌ها');
  if (remoteControl >= 4) motivations.push('راحتی و صرفه‌جویی در زمان');
  if (realtimeData >= 4) motivations.push('اطلاعات دقیق و به‌روز');
  if (importantFactor === 'قابلیت اطمینان') motivations.push('اطمینان از عملکرد سیستم');
  if (importantFactor === 'سادگی استفاده') motivations.push('استفاده آسان');
  if (motivations.length === 0) motivations.push('بهبود کارایی مزرعه');

  const quotes = [
    'دوست دارم همه چیز رو از راه دور کنترل کنم و دیگه نگران نباشم.',
    'وقت و هزینه زیادی صرف سرکشی به مزرعه می‌کنم، باید راهی پیدا کنم.',
    'اگر سیستمی باشه که بتونه به من کمک کنه، حتماً استفاده می‌کنم.',
    'می‌خوام بدونم چه خبره توی مزرعه، بدون اینکه برم اونجا.',
    'فناوری می‌تونه زندگی رو برای کشاورزها راحت‌تر کنه.',
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    name: userName || 'کاربر گرامی',
    age,
    job,
    activity: activity || 'کشاورزی',
    techLevel,
    goals,
    challenges,
    needs,
    motivations,
    workBehavior: currentMethod.join('، ') || 'مراجعه حضوری و بررسی مستقیم',
    techAdoption,
    quote,
  };
}

// ==================== کامپوننت اصلی ====================
export default function PersonaPage() {
  const [step, setStep] = useState<'questions' | 'result'>('questions');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [userName, setUserName] = useState('');
  const [persona, setPersona] = useState<PersonaResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleAnswer = (value: Answer) => {
    const q = questions[currentQuestion];
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);

    if (currentQuestion === 0 && q.type === 'name') {
      setUserName(value as string);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // پایان پرسشنامه - تحلیل و ذخیره در دیتابیس
      const result = analyzeAnswers(newAnswers, userName);
      setPersona(result);
      saveToDatabase(newAnswers, userName, result);
      setStep('result');
    }
  };

  const saveToDatabase = async (answersData: Record<number, Answer>, name: string, personaData: PersonaResult) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('persona_responses').insert({
        user_name: name,
        age: answersData[1] as string || '',
        job: answersData[2] as string || '',
        ownership: answersData[3] as string || '',
        land_size: answersData[4] as string || '',
        activity: answersData[5] as string || '',
        monitoring_methods: answersData[6] as string[] || [],
        main_problem: answersData[7] as string || '',
        visit_count: answersData[8] as string || '',
        used_smart: answersData[9] as string || '',
        remote_control: Number(answersData[10]) || 0,
        realtime_data: Number(answersData[11]) || 0,
        important_info: answersData[12] as string[] || [],
        adoption_likelihood: Number(answersData[13]) || 0,
        important_factor: answersData[14] as string || '',
        extra_feature: answersData[15] as string || '',
        persona_result: personaData,
      });

      if (error) {
        console.error('❌ خطا در ذخیره:', error);
        setError('خطا در ذخیره پاسخ‌ها. لطفاً دوباره تلاش کنید.');
      } else {
        console.log('✅ پاسخ‌ها با موفقیت ذخیره شدند');
      }
    } catch (err) {
      console.error('❌ خطا:', err);
      setError('خطا در ارتباط با سرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMultiToggle = (option: string) => {
    const q = questions[currentQuestion];
    const current = (answers[q.id] as string[]) || [];
    let newMulti;
    if (current.includes(option)) {
      newMulti = current.filter((i: string) => i !== option);
    } else {
      newMulti = [...current, option];
    }
    setAnswers({ ...answers, [q.id]: newMulti });
  };

  const confirmMulti = () => {
    const q = questions[currentQuestion];
    const current = (answers[q.id] as string[]) || [];
    if (current.length > 0) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const result = analyzeAnswers(answers, userName);
        setPersona(result);
        saveToDatabase(answers, userName, result);
        setStep('result');
      }
    }
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement;
    if (input?.value.trim()) {
      handleAnswer(input.value.trim());
    }
  };

  const handleRangeSubmit = (value: number) => {
    handleAnswer(value);
  };

  const q = questions[currentQuestion];
  const isMulti = q?.type === 'multi';
  const currentMultiAnswers = (answers[q?.id] as string[]) || [];

  // ==================== رندر پرسشنامه ====================
  if (step === 'questions' && q) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <div className="flex justify-between text-sm text-text-tertiary mb-2">
                <span>سوال {currentQuestion + 1} از {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.02)]"
            >
              <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-6">{q.text}</h2>

              {q.type === 'name' && (
                <form onSubmit={handleTextSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-primary transition-all"
                    autoFocus
                  />
                  <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-background font-medium hover:bg-primary/90 transition-all">
                    تأیید
                  </button>
                </form>
              )}

              {q.type === 'single' && q.options && (
                <div className="space-y-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-right px-4 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'multi' && q.options && (
                <div className="space-y-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleMultiToggle(opt)}
                      className={`w-full text-right px-4 py-3 rounded-xl border transition-all ${
                        currentMultiAnswers.includes(opt)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                  {currentMultiAnswers.length > 0 && (
                    <button
                      onClick={confirmMulti}
                      className="w-full mt-4 px-4 py-3 rounded-xl bg-primary text-background font-medium hover:bg-primary/90 transition-all"
                    >
                      تأیید و ادامه
                    </button>
                  )}
                </div>
              )}

              {q.type === 'text' && (
                <form onSubmit={handleTextSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="پاسخ خود را بنویسید..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-text-primary focus:outline-none focus:border-primary transition-all"
                    autoFocus
                  />
                  <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-background font-medium hover:bg-primary/90 transition-all">
                    تأیید
                  </button>
                </form>
              )}

              {q.type === 'range' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-text-tertiary">
                    <span>۱ (کم)</span>
                    <span>۵ (زیاد)</span>
                  </div>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleRangeSubmit(num)}
                        className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all text-lg font-medium"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </main>
    );
  }

  // ==================== رندر نتیجه ====================
  if (step === 'result' && persona) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">🎯 پرسونای مشتری کشت‌یار</h1>
            <p className="text-text-tertiary">بر اساس پاسخ‌های شما</p>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.4),-6px_-6px_12px_rgba(255,255,255,0.02)] max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center text-5xl md:text-6xl text-primary mx-auto shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),4px_4px_8px_rgba(0,0,0,0.3)]">
                  👨‍🌾
                </div>
              </div>

              <div className="flex-1 space-y-4 text-right">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary">{persona.name}</h3>
                  <p className="text-text-tertiary text-sm">
                    {persona.age} · {persona.job} · {persona.activity}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-text-tertiary">سطح فناوری:</span>
                    <span className={`mr-2 font-medium ${
                      persona.techLevel === 'بالا' ? 'text-green-400' :
                      persona.techLevel === 'متوسط' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {persona.techLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-tertiary">پذیرش فناوری:</span>
                    <span className={`mr-2 font-medium ${
                      persona.techAdoption === 'بالا' ? 'text-green-400' :
                      persona.techAdoption === 'متوسط' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {persona.techAdoption}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-text-secondary text-sm">
                    <span className="font-semibold text-text-primary">رفتار کاری: </span>
                    {persona.workBehavior}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">اهداف</h4>
                    <ul className="space-y-1">
                      {persona.goals.map((goal, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">چالش‌ها</h4>
                    <ul className="space-y-1">
                      {persona.challenges.map((challenge, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400/50 flex-shrink-0"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">نیازها</h4>
                    <ul className="space-y-1">
                      {persona.needs.map((need, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50 flex-shrink-0"></span>
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">انگیزه‌ها</h4>
                    <ul className="space-y-1">
                      {persona.motivations.map((motivation, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 flex-shrink-0"></span>
                          {motivation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
                  <p className="text-sm text-text-secondary italic text-center">
                    &quot;{persona.quote}&quot;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.02)]">
              <h2 className="text-2xl font-bold text-text-primary text-center mb-4">📊 جمع‌بندی و پیشنهاد برای توسعه کشت‌یار</h2>
              <div className="space-y-4 text-text-secondary text-base leading-relaxed">
                <p>
                  بر اساس تحلیل پاسخ‌ها، این مشتری به عنوان <span className="text-text-primary font-medium">{persona.name}</span> 
                  {' '}با سن {persona.age} و شغل {persona.job} شناسایی شد.
                  {' '}فعالیت اصلی ایشان در حوزه <span className="text-text-primary">{persona.activity}</span> است.
                </p>
                
                <p>
                  <span className="text-text-primary font-medium">سطح آشنایی با فناوری:</span> {persona.techLevel} 
                  {' '}و <span className="text-text-primary font-medium">میزان پذیرش فناوری:</span> {persona.techAdoption} است.
                </p>

                <div>
                  <p className="text-text-primary font-medium mb-2">نیازهای کلیدی که کشت‌یار باید پوشش دهد:</p>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    {persona.needs.map((need, i) => (
                      <li key={i}>{need}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-text-primary font-medium mb-2">پیشنهادات برای توسعه:</p>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>تمرکز بر <span className="text-text-primary">پایش لحظه‌ای</span> و <span className="text-text-primary">کنترل از راه دور</span></li>
                    <li>توسعه <span className="text-text-primary">هشدارهای هوشمند</span> برای کاهش نیاز به حضور فیزیکی</li>
                    <li>ارائه <span className="text-text-primary">داشبورد ساده و کاربرپسند</span> برای مشاهده سریع داده‌ها</li>
                    <li>قابلیت <span className="text-text-primary">مدیریت مصرف آب</span> و <span className="text-text-primary">آبیاری هوشمند</span></li>
                    <li>ارائه <span className="text-text-primary">پشتیبانی و آموزش</span> برای کاربران با سطح فناوری پایین‌تر</li>
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4 text-center">
                  <p className="text-sm text-text-secondary">
                    🚀 کشت‌یار می‌تواند با ارائه این امکانات، نیازهای این مشتری و مشتریان مشابه را به خوبی پوشش دهد.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-text-secondary hover:text-text-primary"
              >
                🔄 شروع مجدد
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-xl bg-primary text-background font-medium hover:bg-primary/90 transition-all"
              >
                🏠 بازگشت به صفحه اصلی
              </a>
            </div>
          </motion.div>
        </Container>
      </main>
    );
  }

  return null;
}
