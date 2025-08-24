// File: backend/seeders/seedDatabase.js
const mongoose = require('mongoose');
require('dotenv').config();

// Import all models
const Narrative = require('../models/Narrative');
const EducationalContent = require('../models/EducationalContent');
const Role = require('../models/Role');
const Topic = require('../models/Topic');
const Achievement = require('../models/Achievement');
const QRCode = require('../models/QRCode');
const NightAction = require('../models/NightAction');
const Question = require('../models/Question');
const User = require('../models/User');
const GameSession = require('../models/GameSession');
const GameHistory = require('../models/GameHistory');

// TODO: Import your sample data arrays here
const narratives = [];
const educationalContents = [];
const roles = [];
const topics = [];
const achievements = [];
const qrCodes = [];
const nightActions = [];
const questions = [];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB');

  // Clear collections
  await Promise.all([
    Narrative.deleteMany({}),
    EducationalContent.deleteMany({}),
    Role.deleteMany({}),
    Topic.deleteMany({}),
    Achievement.deleteMany({}),
    QRCode.deleteMany({}),
    NightAction.deleteMany({}),
    Question.deleteMany({}),
    User.deleteMany({}),
    GameSession.deleteMany({}),
    GameHistory.deleteMany({})
  ]);

  // Insert sample data
  await Narrative.insertMany(narratives);
  await EducationalContent.insertMany(educationalContents);
  await Role.insertMany(roles);
  await Topic.insertMany(topics);
  await Achievement.insertMany(achievements);
  await QRCode.insertMany(qrCodes);
  await NightAction.insertMany(nightActions);
  await Question.insertMany(questions);

  console.log('Database seeded!');
  mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  mongoose.disconnect();
});

// MongoDB Collections Schema untuk EcoSCha Game

// 1. NARRATIVES COLLECTION
const narrativeSchema = {
  _id: ObjectId,
  narrativeId: "pre_quiz_intro",
  phase: "pre_quiz", // pre_quiz, game_start, night_phase, morning_phase, good_wins, evil_wins, final_quiz, game_end
  title: "Sebelum Kuis Awal",
  content: `Sebelum permainan EcoSCha dimulai, kalian akan mengerjakan kuis seputar isu lingkungan. 
  Kuis ini sangat penting, karena seperti pesan karuhun (leluhur) kita, karena seperti pesan karuhun (leluhur) Sunda, 
  "Ulah sok ngahinakeun alam, sabab alam téh sakabehna titipan nu kudu dijaga" (jangan pernah merendahkan alam, 
  karena alam adalah titipan yang harus dijaga). Setiap langkah harus berlandaskan pengetahuan. 
  Nilai dari kuis ini akan menjadi poin awal kalian...`,
  language: "sundanese", // sundanese, indonesian, mixed
  isActive: true,
  createdAt: new Date()
};

// 2. EDUCATIONAL CONTENT COLLECTION
const educationalContentSchema = {
  _id: ObjectId,
  contentId: "env_video_1",
  type: "video", // video, news, article, infographic
  title: "Video Isu Lingkungan - Pencemaran Air",
  url: "https://www.youtube.com/watch?v=1BpsfWCNqlE",
  thumbnail: "https://img.youtube.com/vi/1BpsfWCNqlE/maxresdefault.jpg",
  description: "Video pembelajaran tentang dampak pencemaran air terhadap ekosistem",
  topics: ["water_crisis", "pollution"],
  duration: 600, // seconds
  source: "YouTube",
  publishDate: new Date("2024-01-15"),
  isActive: true,
  createdAt: new Date()
};

// 3. ROLES COLLECTION (Updated dengan karakter Sunda)
const rolesSchema = {
  _id: ObjectId,
  roleId: "green_guardian",
  roleName: "Green Guardian",
  displayName: "Kang Raka / Teh Rani",
  faction: "good", // good, evil, neutral
  count: 2,
  description: "Penjaga alam sejati yang melindungi lingkungan dari kerusakan",
  backstory: `Di sebuah desa bernama Dayeuhmanggung, di kaki Gunung Cikuray, tinggal seorang pemuda bernama Kang Raka. Sehari-hari ia bekerja sebagai petani, tapi di balik kesibukannya, ia juga dikenal sebagai juragan leuweung bukan karena punya hutan, tapi karena paling rajin merawat dan menjaga alam...`,
  abilities: [
    {
      abilityId: "protect",
      name: "Perlindungan Lingkungan",
      description: "Dapat melindungi satu pemain setiap malam dari eliminasi",
      phaseUsed: "night",
      cooldown: 0,
      usageLimit: 1 // per night
    }
  ],
  specialQuote: "Lamun leuweung rusak, cai moal aya. Lamun cai teu aya, kahirupan urang oge leungit.",
  cardImage: "/images/cards/green_guardian_1.jpg",
  alternateCards: [
    {
      characterName: "Kang Raka",
      cardImage: "/images/cards/green_guardian_raka.jpg",
      backstory: "Petani dan penjaga hutan..."
    },
    {
      characterName: "Teh Rani", 
      cardImage: "/images/cards/green_guardian_rani.jpg",
      backstory: "Guru yang mengajarkan cinta lingkungan..."
    }
  ],
  isActive: true,
  createdAt: new Date()
};

// 4. NIGHT ACTION INSTRUCTIONS COLLECTION
const nightActionsSchema = {
  _id: ObjectId,
  phase: "night_phase",
  sequence: 1,
  roleId: "quiz_winner",
  instruction: "Sekarang, pemain dengan skor kuis tertinggi, silakan buka mata. Pilih satu pemain yang ingin kamu ketahui perannya (Moderator akan memberi tahu peran pemain tersebut secara diam-diam)",
  moderatorNote: "Berikan informasi peran secara pribadi kepada pemain dengan skor tertinggi",
  isActive: true,
  createdAt: new Date()
};

// 5. ACHIEVEMENTS COLLECTION (Updated)
const achievementsSchema = {
  _id: ObjectId,
  achievementId: "eco_thinker",
  name: "The Best Eco Thinker",
  nameId: "Pemikir Lingkungan Terbaik",
  description: "Diberikan kepada pemain dengan skor kuis tertinggi",
  descriptionId: "Diraih oleh pemain yang menunjukkan pemahaman terbaik tentang isu lingkungan",
  icon: "/images/achievements/eco_thinker.png",
  category: "quiz_performance",
  rarity: "gold",
  points: 100,
  isActive: true,
  createdAt: new Date()
};

// 6. TOPICS COLLECTION (6 Environmental Topics)
const topicsSchema = {
  _id: ObjectId,
  topicId: "forest_fires",
  topicName: "Kebakaran Hutan dan Lahan",
  topicNameEn: "Forest Fires and Land Burning",
  description: "Isu tentang kebakaran hutan, penyebab, dampak, dan upaya pencegahan",
  icon: "/images/topics/forest_fires.png",
  color: "#FF6B35",
  difficulty: "medium",
  questionCount: 15,
  isActive: true,
  createdAt: new Date()
};

// 7. QR CODES COLLECTION
const qrCodesSchema = {
  _id: ObjectId,
  roleId: "green_guardian",
  qrData: "https://ecoscha.id/login?role=green_guardian&session=game123",
  qrImage: "/images/qr/green_guardian_qr.png",
  generatedAt: new Date(),
  expiresAt: new Date(Date.now() + 24*60*60*1000), // 24 hours
  isActive: true,
  usageCount: 0,
  maxUsage: 2 // sesuai jumlah role
};

// 8. GAME SESSIONS COLLECTION (Enhanced)
const gameSessionsSchema = {
  _id: ObjectId,
  sessionId: "SESS_20241120_001",
  roomCode: "ECO123",
  hostId: ObjectId("user_id"),
  
  gameConfig: {
    maxPlayers: 15,
    gameDuration: 60, // minutes
    quizDuration: 20, // minutes for initial quiz
    discussionDuration: 5, // minutes for discussion phase
    nightDuration: 10, // minutes for night phase
    topicsEnabled: [
      ObjectId("forest_fires_id"),
      ObjectId("industrial_waste_id"), 
      ObjectId("plastic_pollution_id"),
      ObjectId("water_crisis_id"),
      ObjectId("land_conversion_id"),
      ObjectId("climate_change_id")
    ],
    allowLateJoin: false,
    autoProgressPhases: true
  },
  
  players: [
    {
      userId: ObjectId("user_id"),
      username: "player1",
      roleId: "green_guardian",
      roleName: "Green Guardian",
      characterName: "Kang Raka",
      score: 850,
      quizScore: 480,
      gameScore: 370,
      isAlive: true,
      isReady: true,
      joinedAt: new Date(),
      lastActive: new Date(),
      votingHistory: [],
      actionHistory: []
    }
  ],
  
  gameState: {
    status: "in_progress", // waiting, quiz, night, day, discussion, voting, ended
    currentPhase: "quiz_phase",
    currentRound: 1,
    totalRounds: null, // determined by game flow
    timeRemaining: 1200, // seconds
    
    // Quiz state
    quizState: {
      availableTopics: [ObjectId("topic1"), ObjectId("topic2")],
      completedTopics: [],
      currentQuestion: ObjectId("question_id"),
      topicRotation: true
    },
    
    // Night phase state
    nightState: {
      actionsSubmitted: [],
      pendingActions: ["waste_villain", "green_guardian", "waste_manager"],
      revealTarget: ObjectId("user_id"), // for quiz winner
      eliminationTarget: ObjectId("user_id"),
      protectionTarget: ObjectId("user_id"),
      investigationTarget: ObjectId("user_id"),
      investigationResult: "villain" // or "innocent"
    },
    
    // Day phase state
    dayState: {
      eliminatedPlayer: ObjectId("user_id"),
      isProtected: false,
      educationalContent: ObjectId("content_id"),
      contentViewed: false
    },
    
    // Voting state
    votingState: {
      votes: new Map(), // userId -> targetUserId
      votingOpen: true,
      votingDeadline: new Date()
    }
  },
  
  startedAt: new Date(),
  endedAt: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

// 9. MONGOOSE MODELS SETUP
// Sudah dideklarasikan di atas, tidak perlu deklarasi ulang

// Define schemas using Mongoose
const NarrativeSchema = new mongoose.Schema({
  narrativeId: { type: String, unique: true, required: true },
  phase: { type: String, required: true },
  title: String,
  content: { type: String, required: true },
  language: { type: String, default: 'mixed' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const EducationalContentSchema = new mongoose.Schema({
  contentId: { type: String, unique: true, required: true },
  type: { type: String, enum: ['video', 'news', 'article', 'infographic'], required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: String,
  description: String,
  topics: [String],
  duration: Number, // in seconds for videos
  source: String,
  publishDate: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const RoleSchema = new mongoose.Schema({
  roleId: { type: String, unique: true, required: true },
  roleName: { type: String, required: true },
  displayName: String,
  faction: { type: String, enum: ['good', 'evil', 'neutral'], required: true },
  count: { type: Number, required: true },
  description: String,
  backstory: String,
  abilities: [{
    abilityId: String,
    name: String,
    description: String,
    phaseUsed: String,
    cooldown: Number,
    usageLimit: Number
  }],
  specialQuote: String,
  cardImage: String,
  alternateCards: [{
    characterName: String,
    cardImage: String,
    backstory: String
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const TopicSchema = new mongoose.Schema({
  topicId: { type: String, unique: true, required: true },
  topicName: { type: String, required: true },
  topicNameEn: String,
  description: String,
  icon: String,
  color: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  questionCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const AchievementSchema = new mongoose.Schema({
  achievementId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  nameId: String,
  description: String,
  descriptionId: String,
  icon: String,
  category: String,
  rarity: { type: String, enum: ['bronze', 'silver', 'gold', 'legendary'] },
  points: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const QRCodeSchema = new mongoose.Schema({
  roleId: { type: String, required: true },
  qrData: { type: String, required: true },
  qrImage: String,
  generatedAt: { type: Date, default: Date.now },
  expiresAt: Date,
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  maxUsage: Number
}, { timestamps: true });

const NightActionSchema = new mongoose.Schema({
  phase: { type: String, required: true },
  sequence: { type: Number, required: true },
  roleId: { type: String, required: true },
  instruction: { type: String, required: true },
  moderatorNote: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// 10. QUESTIONS COLLECTION (Enhanced with Sample Data)
const questionSchema = {
  _id: ObjectId,
  topicId: ObjectId("forest_fires_topic_id"),
  questionType: "multiple_choice", // "true_false", "short_essay"
  difficulty: "medium",
  question: "Di wilayah Sumatera Selatan, pembukaan lahan dengan cara dibakar menyebabkan kabut asap pekat menyebar ke berbagai daerah, mengganggu penerbangan dan kesehatan masyarakat. Apa jenis pencemaran dan sumber utama dalam kasus tersebut?",
  
  // For multiple choice
  options: [
    { id: "A", text: "Pencemaran air – limbah rumah tangga", isCorrect: false },
    { id: "B", text: "Pencemaran udara – pembakaran lahan", isCorrect: true },
    { id: "C", text: "Pencemaran tanah – limbah kimia", isCorrect: false },
    { id: "D", text: "Pencemaran udara – gas rumah kaca", isCorrect: false },
    { id: "E", text: "Pencemaran air – limbah industri", isCorrect: false }
  ],
  
  correctAnswer: "B",
  explanation: "Pembakaran lahan untuk pembukaan area pertanian atau perkebunan menghasilkan asap tebal yang mencemari udara. Asap ini mengandung partikel berbahaya yang dapat terbawa angin ke daerah lain.",
  points: 10,
  timeLimit: 60, // seconds
  tags: ["forest_fires", "air_pollution", "land_burning"],
  isActive: true,
  createdAt: new Date()
};

// SAMPLE QUESTIONS DATA BASED ON YOUR DOCUMENT
const sampleQuestions = [
  // KEBAKARAN HUTAN DAN LAHAN
  {
    topicId: "forest_fires",
    questionType: "multiple_choice",
    difficulty: "medium",
    question: "Di wilayah Sumatera Selatan, pembukaan lahan dengan cara dibakar menyebabkan kabut asap pekat menyebar ke berbagai daerah, mengganggu penerbangan dan kesehatan masyarakat. Apa jenis pencemaran dan sumber utama dalam kasus tersebut?",
    options: [
      { id: "A", text: "Pencemaran air – limbah rumah tangga", isCorrect: false },
      { id: "B", text: "Pencemaran udara – pembakaran lahan", isCorrect: true },
      { id: "C", text: "Pencemaran tanah – limbah kimia", isCorrect: false },
      { id: "D", text: "Pencemaran udara – gas rumah kaca", isCorrect: false },
      { id: "E", text: "Pencemaran air – limbah industri", isCorrect: false }
    ],
    correctAnswer: "B",
    explanation: "Pembakaran lahan menghasilkan asap tebal yang mencemari udara dan dapat terbawa angin ke daerah lain.",
    points: 10,
    timeLimit: 60,
    tags: ["forest_fires", "air_pollution"]
  },
  {
    topicId: "forest_fires",
    questionType: "true_false",
    difficulty: "easy",
    question: "Kebakaran hutan hanya berdampak di wilayah yang terbakar dan tidak mempengaruhi wilayah lain.",
    correctAnswer: false,
    explanation: "Asap dari kebakaran bisa terbawa angin ke daerah yang sangat jauh dari sumber api. Ini menyebabkan pencemaran udara lintas wilayah dan berdampak luas, termasuk pada transportasi dan kesehatan.",
    points: 8,
    timeLimit: 45,
    tags: ["forest_fires", "impact_assessment"]
  },
  {
    topicId: "forest_fires",
    questionType: "short_essay",
    difficulty: "medium",
    question: "Asap pekat akibat kebakaran hutan di Kalimantan membuat langit menjadi gelap meskipun siang hari. Banyak sekolah diliburkan karena siswa mengalami batuk dan sesak napas. Jenis pencemaran yang terjadi pada kasus tersebut adalah…",
    sampleAnswers: [
      "Pencemaran udara",
      "Polusi udara akibat kebakaran hutan",
      "Pencemaran atmosfer dari asap kebakaran"
    ],
    evaluationCriteria: ["accuracy", "understanding", "clarity"],
    points: 12,
    timeLimit: 90,
    tags: ["forest_fires", "air_pollution", "health_impact"]
  },
  {
    topicId: "forest_fires",
    questionType: "multiple_choice",
    difficulty: "medium",
    question: "Kabut asap tebal akibat kebakaran hutan di Riau menyebabkan puluhan warga dilarikan ke rumah sakit karena gangguan pernapasan. Dampak utama dari pencemaran ini terhadap manusia adalah…",
    options: [
      { id: "A", text: "Menurunnya kualitas tanah", isCorrect: false },
      { id: "B", text: "Gangguan sistem pencernaan", isCorrect: false },
      { id: "C", text: "Gangguan pernapasan", isCorrect: true },
      { id: "D", text: "Kematian tanaman", isCorrect: false },
      { id: "E", text: "Penurunan suhu udara", isCorrect: false }
    ],
    correctAnswer: "C",
    explanation: "Asap kebakaran mengandung partikel berbahaya yang langsung mempengaruhi sistem pernapasan manusia.",
    points: 10,
    timeLimit: 60,
    tags: ["forest_fires", "health_impact"]
  },
  {
    topicId: "forest_fires",
    questionType: "multiple_choice",
    difficulty: "easy",
    question: "Langkah sederhana yang dapat dilakukan masyarakat untuk mencegah pencemaran akibat kebakaran hutan adalah…",
    options: [
      { id: "A", text: "Membakar lahan dengan cara bergantian agar asap tidak terlalu pekat", isCorrect: false },
      { id: "B", text: "Menggunakan pestisida yang kuat untuk membasmi tumbuhan liar di lahan", isCorrect: false },
      { id: "C", text: "Mendorong praktik pembukaan lahan tanpa bakar serta melakukan reboisasi", isCorrect: true },
      { id: "D", text: "Membiarkan lahan terbakar agar cepat subur untuk ditanami kembali", isCorrect: false }
    ],
    correctAnswer: "C",
    explanation: "Praktik pembukaan lahan tanpa bakar dan reboisasi adalah solusi berkelanjutan untuk mencegah kebakaran hutan.",
    points: 10,
    timeLimit: 60,
    tags: ["forest_fires", "prevention", "sustainability"]
  },

  // LIMBAH INDUSTRI DAN PENCEMARAN
  {
    topicId: "industrial_waste",
    questionType: "multiple_choice",
    difficulty: "easy",
    question: "Sebuah pabrik tekstil di pinggir kota membuang limbah cair berwarna langsung ke sungai. Akibatnya, ikan mati dan air tidak bisa digunakan warga sekitar. Jenis pencemaran dan sumber pencemar pada kasus tersebut adalah…",
    options: [
      { id: "A", text: "Pencemaran air – limbah industri", isCorrect: true },
      { id: "B", text: "Pencemaran tanah – bahan kimia pertanian", isCorrect: false },
      { id: "C", text: "Pencemaran udara – pembakaran limbah", isCorrect: false },
      { id: "D", text: "Pencemaran suara – kebisingan mesin pabrik", isCorrect: false }
    ],
    correctAnswer: "A",
    explanation: "Limbah cair berwarna dari pabrik tekstil yang dibuang ke sungai merupakan pencemaran air dari sumber industri.",
    points: 8,
    timeLimit: 45,
    tags: ["industrial_waste", "water_pollution"]
  },
  {
    topicId: "industrial_waste",
    questionType: "true_false",
    difficulty: "easy",
    question: "Limbah cair industri yang dibuang ke sungai dapat merusak ekosistem air dan mengganggu kehidupan masyarakat.",
    correctAnswer: true,
    explanation: "Limbah industri mengandung zat kimia yang dapat menurunkan kadar oksigen dalam air, meracuni biota sungai, dan membuat air tidak layak digunakan.",
    points: 8,
    timeLimit: 45,
    tags: ["industrial_waste", "ecosystem_impact"]
  },
  {
    topicId: "industrial_waste",
    questionType: "multiple_choice",
    difficulty: "medium",
    question: "Pembuangan limbah cair oleh pabrik ke sungai menyebabkan ikan mati massal dan air tidak dapat digunakan masyarakat. Apa dampak pencemaran tersebut terhadap lingkungan?",
    options: [
      { id: "A", text: "Udara menjadi lembab", isCorrect: false },
      { id: "B", text: "Ekosistem air rusak", isCorrect: true },
      { id: "C", text: "Daun tanaman cepat kering", isCorrect: false },
      { id: "D", text: "Sungai menjadi habitat baru bagi hewan", isCorrect: false },
      { id: "E", text: "Produksi pertanian meningkat", isCorrect: false }
    ],
    correctAnswer: "B",
    explanation: "Limbah industri merusak keseimbangan ekosistem air dan mengancam kehidupan biota air.",
    points: 10,
    timeLimit: 60,
    tags: ["industrial_waste", "ecosystem_damage"]
  },
  {
    topicId: "industrial_waste",
    questionType: "multiple_choice",
    difficulty: "hard",
    question: "Solusi sederhana dan aksi nyata yang dapat dilakukan oleh masyarakat ketika sungai tercemar limbah pabrik adalah…",
    options: [
      { id: "A", text: "Menghindari penggunaan air sungai tanpa mengadukan permasalahan tersebut", isCorrect: false },
      { id: "B", text: "Mengadakan aksi bersih sungai tanpa menyelidiki penyebab pencemaran", isCorrect: false },
      { id: "C", text: "Memblokade pabrik agar tidak beroperasi untuk sementara waktu", isCorrect: false },
      { id: "D", text: "Menutup aliran sungai agar limbah tidak menyebar ke pemukiman", isCorrect: false },
      { id: "E", text: "Melaporkan pencemaran tersebut dan mengusulkan pabrik membuat IPAL", isCorrect: true }
    ],
    correctAnswer: "E",
    explanation: "Instalasi Pengolahan Air Limbah (IPAL) adalah solusi teknis yang tepat untuk mengatasi pencemaran industri.",
    points: 12,
    timeLimit: 75,
    tags: ["industrial_waste", "solution", "IPAL"]
  },

  // SAMPAH PLASTIK DAN POLUSI
  {
    topicId: "plastic_pollution",
    questionType: "multiple_choice",
    difficulty: "medium",
    question: "Di kota besar, penggunaan kendaraan bermotor semakin meningkat. Akibatnya, langit tampak lebih keruh, udara terasa panas, dan banyak orang terkena ISPA. Berdasarkan analisis, dua faktor utama dalam kasus tersebut adalah…",
    options: [
      { id: "A", text: "Deforestasi dan pencemaran tanah", isCorrect: false },
      { id: "B", text: "Sampah plastik dan pencemaran air", isCorrect: false },
      { id: "C", text: "Emisi kendaraan dan pencemaran udara", isCorrect: true },
      { id: "D", text: "Perubahan iklim dan pencemaran suara", isCorrect: false },
      { id: "E", text: "Limbah rumah tangga dan pencemaran udara", isCorrect: false }
    ],
    correctAnswer: "C",
    explanation: "Peningkatan kendaraan bermotor menghasilkan emisi yang mencemari udara dan menyebabkan gangguan pernapasan.",
    points: 10,
    timeLimit: 60,
    tags: ["plastic_pollution", "air_pollution", "vehicles"]
  },
  {
    topicId: "plastic_pollution",
    questionType: "true_false",
    difficulty: "easy",
    question: "Sampah plastik tidak membahayakan hewan laut karena dapat terurai dengan cepat.",
    correctAnswer: false,
    explanation: "Plastik sangat sulit terurai secara alami dan bisa bertahan ratusan tahun di lingkungan. Hewan laut bisa salah makan plastik, yang menyebabkan kematian atau gangguan biologis.",
    points: 8,
    timeLimit: 45,
    tags: ["plastic_pollution", "marine_life"]
  },
  {
    topicId: "plastic_pollution",
    questionType: "multiple_choice",
    difficulty: "medium",
    question: "Di perairan Sulawesi, seekor penyu ditemukan mati dengan isi perut penuh plastik. Nelayan juga mengeluhkan hasil tangkapan menurun. Apa dampak pencemaran ini terhadap makhluk hidup laut?",
    options: [
      { id: "A", text: "Penyu tumbuh lebih cepat", isCorrect: false },
      { id: "B", text: "Populasi hewan laut meningkat", isCorrect: false },
      { id: "C", text: "Hewan laut terganggu kesehatannya", isCorrect: true },
      { id: "D", text: "Laut menjadi jernih", isCorrect: false },
      { id: "E", text: "Pesisir menjadi subur", isCorrect: false }
    ],
    correctAnswer: "C",
    explanation: "Sampah plastik yang termakan hewan laut menyebabkan gangguan pencernaan dan dapat berakibat fatal.",
    points: 10,
    timeLimit: 60,
    tags: ["plastic_pollution", "marine_ecosystem", "health_impact"]
  },
  {
    topicId: "plastic_pollution",
    questionType: "multiple_choice",
    difficulty: "easy",
    question: "Aksi nyata sederhana yang dapat dilakukan untuk mengurangi pencemaran plastik adalah…",
    options: [
      { id: "A", text: "Mengumpulkan sampah plastik di halaman rumah hingga petugas datang", isCorrect: false },
      { id: "B", text: "Membakar semua plastik agar tidak menumpuk", isCorrect: false },
      { id: "C", text: "Mengubur plastik di tanah agar tidak terlihat", isCorrect: false },
      { id: "D", text: "Mengganti penggunaan plastik dengan wadah pakai ulang dan melakukan daur ulang", isCorrect: true },
      { id: "E", text: "Membuang plastik ke sungai dengan harapan terbawa arus", isCorrect: false }
    ],
    correctAnswer: "D",
    explanation: "Mengurangi penggunaan plastik sekali pakai dan mendaur ulang adalah cara efektif mengurangi pencemaran.",
    points: 8,
    timeLimit: 45,
    tags: ["plastic_pollution", "reduce_reuse_recycle", "solution"]
  },

  // KRISIS AIR BERSIH
  {
    topicId: "water_crisis",
    questionType: "multiple_choice",
    difficulty: "hard",
    question: "Selama dua bulan terakhir, warga Desa Tirtasari mengandalkan air dari sungai kecil di dekat desa. Namun, air tersebut mulai keruh dan berbau menyengat. Hasil uji laboratorium menunjukkan kadar BOD melebihi ambang batas aman, serta adanya kandungan fosfat tinggi. Berdasarkan data tersebut, jenis pencemaran yang terjadi adalah…",
    options: [
      { id: "A", text: "Pencemaran udara akibat aktivitas peternakan", isCorrect: false },
      { id: "B", text: "Pencemaran air akibat limbah organik dan anorganik", isCorrect: true },
      { id: "C", text: "Pencemaran tanah akibat kotoran hewan", isCorrect: false },
      { id: "D", text: "Pencemaran air hanya akibat limbah deterjen", isCorrect: false },
      { id: "E", text: "Pencemaran air hanya akibat limbah organik", isCorrect: false }
    ],
    correctAnswer: "B",
    explanation: "BOD tinggi menunjukkan pencemaran organik, sedangkan fosfat tinggi menunjukkan pencemaran anorganik dari deterjen.",
    points: 12,
    timeLimit: 75,
    tags: ["water_crisis", "organic_pollution", "chemical_pollution"]
  },
  {
    topicId: "water_crisis",
    questionType: "true_false",
    difficulty: "easy",
    question: "Krisis air bersih berdampak langsung terhadap kesehatan masyarakat.",
    correctAnswer: true,
    explanation: "Tanpa akses air bersih, masyarakat terpaksa menggunakan air tercemar yang membawa penyakit. Ini berbahaya terutama bagi anak-anak dan lansia.",
    points: 8,
    timeLimit: 45,
    tags: ["water_crisis", "health_impact"]
  },
  {
    topicId: "water_crisis",
    questionType: "multiple_choice",
    difficulty: "medium",
    question: "Di beberapa daerah NTT, warga terpaksa menggunakan air keruh untuk mandi dan mencuci karena kekeringan panjang. Apa risiko utama dari krisis air bersih bagi manusia?",
    options: [
      { id: "A", text: "Meningkatnya tingkat pendidikan", isCorrect: false },
      { id: "B", text: "Penurunan konsumsi plastik", isCorrect: false },
      { id: "C", text: "Penyakit kulit dan diare", isCorrect: true },
      { id: "D", text: "Perubahan warna rambut", isCorrect: false },
      { id: "E", text: "Meningkatnya pertumbuhan ekonomi", isCorrect: false }
    ],
    correctAnswer: "C",
    explanation: "Air yang tidak bersih dapat membawa bakteri dan parasit penyebab penyakit kulit dan diare.",
    points: 10,
    timeLimit: 60,
    tags: ["water_crisis", "health_impact", "disease"]
  },
  {
    topicId: "water_crisis",
    questionType: "multiple_choice",
    difficulty: "easy",
    question: "Upaya sederhana yang bisa dilakukan untuk mengurangi dampak krisis air bersih adalah…",
    options: [
      { id: "A", text: "Menghemat air dalam kegiatan sehari-hari dan memanfaatkan air hujan", isCorrect: true },
      { id: "B", text: "Menyiram tanaman dengan air minum kemasan agar lebih bersih", isCorrect: false },
      { id: "C", text: "Menggunakan air sebanyak-banyaknya sebelum air benar-benar habis", isCorrect: false },
      { id: "D", text: "Menyewa mobil tangki air untuk menyiram jalan setiap pagi", isCorrect: false },
      { id: "E", text: "Menggunakan air kolam ikan untuk kebutuhan minum", isCorrect: false }
    ],
    correctAnswer: "A",
    explanation: "Menghemat penggunaan air dan memanfaatkan air hujan adalah cara efektif mengatasi krisis air.",
    points: 8,
    timeLimit: 45,
    tags: ["water_crisis", "conservation", "rainwater_harvesting"]
  }
];

// Enhanced Question Schema for Mongoose
const QuestionSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  questionType: { type: String, enum: ['multiple_choice', 'true_false', 'short_essay'], required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  question: { type: String, required: true },
  
  // Multiple choice specific fields
  options: [{
    id: String,
    text: String,
    isCorrect: Boolean
  }],
  
  // True/false specific fields
  correctAnswer: mongoose.Schema.Types.Mixed, // Boolean for true/false, String for multiple choice
  
  // Essay specific fields
  sampleAnswers: [String],
  evaluationCriteria: [String],
  
  explanation: String,
  points: { type: Number, default: 10 },
  timeLimit: { type: Number, default: 60 }, // seconds
  tags: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);