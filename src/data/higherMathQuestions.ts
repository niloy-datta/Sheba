// Higher Mathematics Chapter-wise Questions for SSC Level (NCTB Curriculum)
// Each chapter has 50+ questions (enough for multiple sets of 15 questions)

export const higherMathQuestions = {
  // Chapter 1: বাস্তব সংখ্যা (Real Numbers)
  1: [
    { id: 1, question: 'কোন সংখ্যা ত্রিকোণমিতিক ফাংশনের মান হতে পারে?', options: ['√2', 'π', 'sin 30°', 'e'], correct: 2 },
    { id: 2, question: 'sin 0° = ?', options: ['0', '1', '1/2', '√3/2'], correct: 0 },
    { id: 3, question: 'cos 90° = ?', options: ['0', '1', '1/2', '√3/2'], correct: 0 },
    { id: 4, question: 'tan 45° = ?', options: ['0', '1', '√3', '1/√3'], correct: 1 },
    { id: 5, question: 'sin²θ + cos²θ = ?', options: ['0', '1', '2', 'θ'], correct: 1 },
    // Add more questions for each chapter...
  ],

  // Board Questions: ঢাকা বোর্ড (Dhaka Board) - SSC 2025 Higher Mathematics
  board_dhaka_2025: [
    { id: 1, question: '3x = 5y + 15 হলে, রেখাটির ঢাল কত?', options: ['-3/5', '-1/3', '3/5', '5/3'], correct: 2, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 2, question: '3x = 5y + 15 হলে, রেখাটির y ছেদক কত?', options: ['-15', '-3', '3', '15'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 3, question: 'চিত্রে, D ও E মধ্যবিন্দু হলে- i. PE = PD + DE, ii. PQ + QR + RP = 0, iii. QR = 2 ED। নিচের কোনটি সঠিক?', options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'], correct: 2, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 4, question: '22 সে.মি. ধারবিশিষ্ট ঘনক আকৃতির বাক্সে একটি গোলক ঠিকভাবে এঁটে যায়। গোলকটির পৃষ্ঠতলের ক্ষেত্রফল কত?', options: ['484π বর্গ সে.মি.', '1936π বর্গ সে.মি.', '2904π বর্গ সে.মি.', '7744π বর্গ সে.মি.'], correct: 0, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 5, question: '22 সে.মি. ধারবিশিষ্ট ঘনক আকৃতির বাক্সে একটি গোলক ঠিকভাবে এঁটে যায়। বাক্সটির অনধিকৃত অংশের আয়তন কত?', options: ['506.84 ঘন সে.মি. (প্রায়)', '5072.71 ঘন সে.মি. (প্রায়)', '9127.47 ঘন সে.মি. (প্রায়)', '33954.34 ঘন সে.মি. (প্রায়)'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 6, question: 'একটি ছককা নিক্ষেপে 4 উঠার সম্ভাবনা কোনটি?', options: ['1/6', '1/4', '2/3', '5/6'], correct: 0, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 7, question: 'কিছু সংখ্যক লোকের মধ্যে 60 জন বাংলা, 35 জন ইংরেজি এবং 15 জন বাংলা ও ইংরেজি বলতে পারে। দুইটি ভাষার অন্তত একটি ভাষা কতজন বলতে পারে?', options: ['10', '40', '60', '80'], correct: 3, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 8, question: 'S = {(x, y) : x² + y² = 36 এবং y ≥ 0} হলে- i. অন্বয়টি ফাংশন, ii. অন্বয়টির লেখচিত্র একটি অর্ধবৃত্ত, iii. অন্বয়টির লেখচিত্র x অক্ষের উপরি অর্ধতলে থাকবে। নিচের কোনটি সঠিক?', options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'], correct: 2, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 9, question: 'F(x)=√2x-3 ফাংশনটির ডোমেন নিচের কোনটি?', options: ['{x ∈ R : x ≠ 3/2}', '{x ∈ R : x > 3/2}', '{x ∈ R : x ≥ 3/2}', '{x ∈ R : x ≤ 3/2}'], correct: 2, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 10, question: 'P(x, y, z) = x²y + y²z + z²x হলে- i. P(x, y, z) সমমাত্রিক বহুপদী, ii. P(x, y, z) প্রতিসম রাশি, iii. P(x, y, z) চক্র-ক্রমিক রাশি। নিচের কোনটি সঠিক?', options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 11, question: 'O কেন্দ্র বিশিষ্ট অর্ধবৃত্তে OB = 2.5 সে.মি. হলে, ABC ত্রিভুজের নববিন্দু বৃত্তের ব্যাসার্ধ কত?', options: ['1.25 সে.মি.', '2.50 সে.মি.', '5 সে.মি.', '10 সে.মি.'], correct: 0, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 12, question: 'O কেন্দ্র বিশিষ্ট অর্ধবৃত্তে OB = 2.5 সে.মি. এবং AB = 4 সে.মি. হলে, AC এর উপর BC এর লম্ব অভিক্ষেপ কত?', options: ['0 সে.মি.', '3 সে.মি.', '4 সে.মি.', '5 সে.মি.'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 13, question: 'x²-3x-2= 0 সমীকরণের নিশ্চায়ক কত?', options: ['(3-√17)/2', '(3+√17)/2', '√17', '17'], correct: 3, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 14, question: '7^(2x-3) = 6^(2x-3) সমীকরণের সমাধান কোনটি?', options: ['2/3', '6/7', '7/6', '3/2'], correct: 3, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 15, question: '3x+7 ≤ 5x+3 অসমতাটির সমাধান সেট কোনটি?', options: ['S = {x∈R: x≥2}', 'S = {x∈R: x>2}', 'S = {x∈R: x≤2}', 'S = {x∈R: x≥-2}'], correct: 0, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 16, question: '2+0.2+0.02+.........ধারাটির অসীমতক সমষ্টি কত?', options: ['9/20', '20/9', '111/50', '20/9'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 17, question: '∠x = 80° হলে ∠x এর সম্পূরক কোণের এক পঞ্চমাংশ কত?', options: ['100°', '50°', '22°', '20°'], correct: 3, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 18, question: 'sinθ = -√3/2 এবং -π/2 < θ < π/2 হলে θ এর মান কত?', options: ['π/3', '4π/3', '5π/3', '11π/6'], correct: 0, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 19, question: '-1560° কোণটি কোন চতুর্ভাগে থাকবে?', options: ['প্রথম', 'দ্বিতীয়', 'তৃতীয়', 'চতুর্থ'], correct: 3, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 20, question: '12:30 টায় ঘড়ির ঘণ্টার কাঁটা ও মিনিটের কাঁটার অন্তর্গত কোণ কত ডিগ্রি?', options: ['150°', '165°', '180°', '195°'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 21, question: '25^(3x) = 125^y হলে তবে x/y এর মান কত?', options: ['2/5', '3/5', '5/3', '5/2'], correct: 3, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 22, question: 'f(x)=1-3^x হলে f এর রেঞ্জ কত?', options: ['(-∞, 1)', '(-∞, 1]', '(1, ∞)', '(-∞, ∞)'], correct: 0, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 23, question: '(x²-4x+4)² এর বিস্তৃতিতে পদসংখ্যা কত?', options: ['2', '3', '4', '5'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 24, question: '(x - k/3)^4 এর বিস্তৃতিতে x³ এর সহগ -12 হলে k এর মান কত?', options: ['-36', '-9', '9', '36'], correct: 3, board: 'ঢাকা বোর্ড', year: '2025' },
    { id: 25, question: 'A (5,-3) এবং B (-3, 2) হলে AB এর- i. দৈর্ঘ্য √89 একক, ii. ঢাল 5/8, iii. সমীকরণ 5x + 8y = 1। নিচের কোনটি সঠিক?', options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'], correct: 1, board: 'ঢাকা বোর্ড', year: '2025' }
  ]
}
