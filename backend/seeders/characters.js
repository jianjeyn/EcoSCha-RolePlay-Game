// MongoDB Seeder untuk Karakter Green Guardian Game (Updated)
// File: seeders/characters.js
// Array QR code untuk tiap karakter EcoSCha
const qrCodes = [
  {
    roleId: "sustainability_guide",
    qrData: "https://ecoscha.id/login?role=sustainability_guide",
    qrImage: "/assets/images/qr/sustainability_guide_qr.png",
    maxUsage: 1,
    isActive: true
  },
  {
    roleId: "green_guardian",
    qrData: "https://ecoscha.id/login?role=green_guardian",
    qrImage: "/assets/images/qr/green_guardian_qr.png",
    maxUsage: 2,
    isActive: true
  },
  {
    roleId: "waste_manager",
    qrData: "https://ecoscha.id/login?role=waste_manager",
    qrImage: "/assets/images/qr/waste_manager_qr.png",
    maxUsage: 2,
    isActive: true
  },
  {
    roleId: "waste_villain",
    qrData: "https://ecoscha.id/login?role=waste_villain",
    qrImage: "/assets/images/qr/waste_villain_qr.png",
    maxUsage: 4,
    isActive: true
  },
  {
    roleId: "eco_citizen",
    qrData: "https://ecoscha.id/login?role=eco_citizen",
    qrImage: "/assets/images/qr/eco_citizen_qr.png",
    maxUsage: 6,
    isActive: true
  }
];

module.exports = { qrCodes };
const characters = [
  {
    _id: "green_guardian_1",
    name: "Kang Raka",
    roleType: "Green Guardian",
    roleCategory: "protector",
    maxCount: 2,
    location: "Dayeuhmanggung Village",
    occupation: "Farmer & Forest Keeper",
    nickname: "Juragan Leuweung",
    description: "Pemuda yang bekerja sebagai petani dan dikenal sebagai juragan leuweung karena rajin merawat dan menjaga alam",
    backstory: "Setiap hari Sabtu, Kang Raka memimpin warga ngabersihan leuweung dari sampah dan ranting kering agar tidak terjadi karhutla. Ia mengajak anak muda menanam pohon kembali di tanah kritis dan membuat jalur resapan air sederhana dari bambu.",
    quote: {
      sundanese: "Lamun leuweung rusak, cai moal aya. Lamun cai teu aya, kahirupan urang oge leungit.",
      indonesian: "Kalau hutan rusak, air akan hilang. Kalau air hilang, hidup kita pun terancam."
    },
    cardAssets: {
      cardImage: "/assets/images/cards/kang-raka-green-guardian.png",
      cardImageAlt: "/assets/images/cards/alt/kang-raka-green-guardian-alt.jpg",
      avatarImage: "/assets/images/avatars/kang-raka-avatar.png",
      roleIcon: "/assets/images/icons/green-guardian-icon.svg",
      backgroundImage: "/assets/images/backgrounds/forest-keeper-bg.jpg",
      cardBack: "/assets/images/cards/backs/green-guardian-back.png"
    },
    abilities: [
      {
        name: "Forest Protection",
        description: "Dapat melindungi satu pemain setiap malam dari serangan",
        cooldown: 0,
        usageLimit: "unlimited",
        icon: "/assets/images/icons/abilities/forest-protection.svg"
      }
    ],
    characteristics: [
      "Tidak banyak bicara",
      "Tindakan nyata",
      "Pemimpin komunitas",
      "Peduli lingkungan"
    ],
    gameRole: "protector",
    winCondition: "eliminate_all_villains",
    displayOrder: 1,
    cardColor: "#2d5a27",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "green_guardian_2", 
    name: "Teh Rani",
    roleType: "Green Guardian",
    roleCategory: "protector",
    maxCount: 2,
    location: "Dayeuhmanggung Village",
    occupation: "Elementary School Teacher",
    nickname: "Panggero Alam",
    description: "Guru yang mengajarkan pentingnya lingkungan kepada anak-anak desa melalui program Sakola Hejo",
    backstory: "Ia membentuk 'Sakola Hejo', program sekolah hijau yang mengajarkan cara membuat lubang biopori, memilah sampah, dan memanfaatkan air hujan. Ia juga rutin mengadakan 'Poe Tanam' bersama warga kampung.",
    quote: {
      sundanese: "Ngajarkeun anak jaga lingkungan teh sanés hungkul ngajarkeun pelajaran, tapi ngajarkeun kahirupan.",
      indonesian: "Mengajarkan anak-anak menjaga lingkungan bukan sekadar pelajaran, tapi mengajarkan makna kehidupan"
    },
    cardAssets: {
      cardImage: "/assets/images/cards/teh-rani-green-guardian.png",
      cardImageAlt: "/assets/images/cards/alt/teh-rani-green-guardian-alt.jpg",
      avatarImage: "/assets/images/avatars/teh-rani-avatar.png",
      roleIcon: "/assets/images/icons/green-guardian-icon.svg",
      backgroundImage: "/assets/images/backgrounds/green-school-bg.jpg",
      cardBack: "/assets/images/cards/backs/green-guardian-back.png"
    },
    programs: [
      "Sakola Hejo (Sekolah Hijau)",
      "Poe Tanam (Hari Menanam)",
      "Lubang Biopori Workshop",
      "Waste Sorting Education"
    ],
    abilities: [
      {
        name: "Future Protection",
        description: "Dapat melindungi satu pemain tiap malam melalui pendidikan dan keteladanan",
        cooldown: 0,
        usageLimit: "unlimited",
        icon: "/assets/images/icons/abilities/future-protection.svg"
      }
    ],
    characteristics: [
      "Educator",
      "Community organizer",
      "Child-friendly",
      "Environmental advocate"
    ],
    gameRole: "protector",
    winCondition: "eliminate_all_villains",
    displayOrder: 2,
    cardColor: "#2d5a27",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "waste_manager_1",
    name: "Pak Harsa",
    roleType: "Waste Manager", 
    roleCategory: "investigator",
    maxCount: 1,
    location: "Dayeuhmanggung Village",
    occupation: "Village Waste Bank Manager",
    nickname: "Bank Sampah Manager",
    description: "Pengelola bank sampah desa yang terkenal rajin dan teliti dalam mengamati lingkungan",
    backstory: "Setiap pagi ia keliling kampung bukan hanya untuk mengambil barang daur ulang, tapi juga mengamati keadaan lingkungan. Ia pandai membaca tanda-tanda kerusakan lingkungan.",
    quote: {
      sundanese: "Panon mah teu bisa ningali sagalana, tapi rasa jeung perhatian mah teu weléh hurip.",
      indonesian: "Mata memang tak bisa melihat segalanya, tapi rasa dan kepedulian tak pernah mati."
    },
    cardAssets: {
      cardImage: "/assets/images/cards/waste-manager.png",
      cardImageAlt: "/assets/images/cards/alt/waste-manager-alt.jpg",
      avatarImage: "/assets/images/avatars/pak-harsa-avatar.png",
      roleIcon: "/assets/images/icons/waste-manager-icon.svg",
      backgroundImage: "/assets/images/backgrounds/waste-bank-bg.jpg",
      cardBack: "/assets/images/cards/backs/waste-manager-back.png"
    },
    abilities: [
      {
        name: "Environmental Investigation",
        description: "Setiap malam dapat memilih satu pemain untuk diamati dan mengetahui apakah tergolong Waste Villain atau bukan",
        cooldown: 0,
        usageLimit: "unlimited",
        restriction: "Harus bijak dalam membuka informasi",
        icon: "/assets/images/icons/abilities/environmental-investigation.svg"
      }
    ],
    observationSkills: [
      "Detecting strange odors",
      "Monitoring water color changes", 
      "Observing behavior patterns",
      "Reading environmental signs"
    ],
    characteristics: [
      "Detail-oriented",
      "Careful communicator",
      "Environmental observer",
      "Community guardian"
    ],
    gameRole: "investigator",
    winCondition: "eliminate_all_villains",
    displayOrder: 3,
    cardColor: "#1e40af",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "waste_villain_1",
    name: "Mang Karwa",
    roleType: "Waste Villain",
    roleCategory: "villain",
    maxCount: 2,
    location: "Dayeuhmanggung Village",
    occupation: "Used Goods Dealer (cover)",
    nickname: "Mysterious Warehouse Owner",
    description: "Pemilik gudang yang menyamar sebagai pedagang barang bekas tapi sebenarnya mencemari lingkungan",
    backstory: "Di balik bangunan bata tua dekat sungai, ia menjalankan bisnis gelap. Truk besar datang tengah malam menurunkan karung hitam misterius, menyebabkan air sungai berubah warna dan berbau menyengat.",
    quote: {
      sundanese: "Ulah salempang, ieu mah hal biasa. Alam ogé bisa bersihin diri sorangan.",
      indonesian: "Jangan khawatir, ini hal biasa. Alam juga bisa membersihkan diri sendiri."
    },
    cardAssets: {
      cardImage: "/assets/images/cards/mang-karwa-waste-villain.png",
      cardImageAlt: "/assets/images/cards/alt/mang-karwa-waste-villain-alt.jpg",
      avatarImage: "/assets/images/avatars/mang-karwa-avatar.png",
      roleIcon: "/assets/images/icons/waste-villain-icon.svg",
      backgroundImage: "/assets/images/backgrounds/polluted-warehouse-bg.jpg",
      cardBack: "/assets/images/cards/backs/waste-villain-back.png"
    },
    criminalActivities: [
      "Illegal waste dumping",
      "Water pollution",
      "Toxic material disposal",
      "Environmental cover-up"
    ],
    environmentalDamage: [
      "River contamination",
      "Fish population extinction",
      "Skin diseases in villagers",
      "Crop failure",
      "Well water depletion"
    ],
    abilities: [
      {
        name: "Pollution Attack",
        description: "Dapat menyerang dan mengeliminasi pemain lain di malam hari",
        cooldown: 0,
        usageLimit: "unlimited",
        icon: "/assets/icons/abilities/pollution_attack.svg"
      },
      {
        name: "Disguise",
        description: "Menyamar sebagai warga biasa di siang hari",
        cooldown: 0,
        usageLimit: "passive",
        icon: "/assets/icons/abilities/disguise.svg"
      }
    ],
    characteristics: [
      "Deceptive",
      "Profit-oriented", 
      "Environmentally destructive",
      "Secretive operations"
    ],
    gameRole: "villain",
    winCondition: "eliminate_all_good_roles",
    displayOrder: 4,
    cardColor: "#991b1b",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "waste_villain_2",
    name: "Yana", 
    roleType: "Waste Villain",
    roleCategory: "villain",
    maxCount: 2,
    location: "Dayeuhmanggung Village",
    occupation: "Young Entrepreneur",
    nickname: "Development Promise Bearer",
    description: "Pengusaha muda dari luar desa yang membawa janji pembangunan tapi merusak hutan dengan cara membakar lahan",
    backstory: "Ia menggandeng warga untuk membuka lahan hutan di kaki Gunung Cikuray dengan cara ngaduruk lahan, menghancurkan hutan adat yang dijaga leluhur dan menyebabkan kabut asap menyelimuti desa.",
    quote: {
      sundanese: "Kumaha hayang maju lamun terus-terusan ngandelkeun adat? Urang butuh inovasi.",
      indonesian: "Gimana mau maju kalau terus bergantung pada adat? Kita butuh inovasi."
    },
    cardAssets: {
      cardImage: "/assets/images/cards/yana-waste-villain.png",
      cardImageAlt: "/assets/images/cards/alt/yana-waste-villain-alt.jpg",
      avatarImage: "/assets/images/avatars/yana-avatar.png",
      roleIcon: "/assets/images/icons/waste-villain-icon.svg",
      backgroundImage: "/assets/images/backgrounds/burning-forest-bg.jpg",
      cardBack: "/assets/images/cards/backs/waste-villain-back.png"
    },
    falsePromises: [
      "Economic development",
      "Job opportunities", 
      "Modern infrastructure",
      "Investment growth"
    ],
    destructiveActions: [
      "Forest burning",
      "Land conversion",
      "Traditional forest destruction",
      "Endemic species elimination",
      "Climate change acceleration"
    ],
    abilities: [
      {
        name: "Influence Spread",
        description: "Dapat menyerang dan mengeliminasi pemain lain sambil menyebarkan pengaruh destruktif",
        cooldown: 0,
        usageLimit: "unlimited",
        icon: "/assets/icons/abilities/influence_spread.svg"
      },
      {
        name: "False Development",
        description: "Bersembunyi di balik nama pembangunan untuk merusak lingkungan",
        cooldown: 0,
        usageLimit: "passive",
        icon: "/assets/icons/abilities/false_development.svg"
      }
    ],
    characteristics: [
      "Manipulative",
      "Anti-tradition",
      "Profit-driven",
      "Environmentally destructive"
    ],
    gameRole: "villain", 
    winCondition: "eliminate_all_good_roles",
    displayOrder: 5,
    cardColor: "#991b1b",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "eco_citizen_1",
    name: "Asep",
    roleType: "Eco Citizen",
    roleCategory: "citizen", 
    maxCount: 2,
    location: "Dayeuhmanggung Village",
    occupation: "Ojek Driver & Part-time Farmer",
    nickname: "Village Youth",
    description: "Pemuda sederhana yang bekerja sebagai tukang ojek dan kadang membantu pamannya di kebun",
    backstory: "Ia mulai merasa ada yang berubah dengan lingkungan sekitar. Mata air makin kering, sampah plastik berserakan. Belum memahami sepenuhnya tentang kerusakan lingkungan tapi sadar akan dampaknya.",
    quote: {
      sundanese: "Mun alam rusak, urang lembur nu kahiji ngaraosna.",
      indonesian: "Kalau alam rusak, orang desa yang paling pertama merasakan dampaknya."
    },
    cardAssets: {
      cardImage: "/assets/images/cards/asep-eco-citizen.png",
      cardImageAlt: "/assets/images/cards/alt/asep-eco-citizen-alt.jpg",
      avatarImage: "/assets/images/avatars/asep-avatar.png",
      roleIcon: "/assets/images/icons/eco-citizen-icon.svg",
      backgroundImage: "/assets/images/backgrounds/village-life-bg.jpg",
      cardBack: "/assets/images/cards/backs/eco-citizen-back.png"
    },
    observations: [
      "Drying water sources",
      "Plastic waste accumulation", 
      "Environmental changes",
      "Traditional values importance"
    ],
    beliefs: [
      "Adat lembur (village traditions)",
      "Human-nature connection",
      "Community responsibility",
      "Environmental awareness"
    ],
    abilities: [
      {
        name: "Observation Clues",
        description: "Pengamatannya bisa menjadi petunjuk bagi pemain lain",
        cooldown: 0,
        usageLimit: "passive",
        icon: "/assets/icons/abilities/observation_clues.svg"
      }
    ],
    characteristics: [
      "Observant",
      "Traditional values holder",
      "Community member",
      "Environmental awareness beginner"
    ],
    gameRole: "citizen",
    winCondition: "survive_and_eliminate_villains",
    displayOrder: 6,
    cardColor: "#059669",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "eco_citizen_2",
    name: "Ibu Eneng",
    roleType: "Eco Citizen", 
    roleCategory: "citizen",
    maxCount: 2,
    location: "Dayeuhmanggung Village",
    occupation: "Market Vendor",
    nickname: "Cheerful Market Lady",
    description: "Penjual sayur di pasar yang ceria dan suka ngobrol, memahami dampak perubahan iklim pada dagangannya",
    backstory: "Ia menjual sayur-sayuran dari petani lokal tapi mulai mengalami kesulitan karena cuaca ekstrem yang merusak sayuran sebelum sampai ke pasar. Ia memegang kearifan kolot baheula.",
    quote: {
      sundanese: "Kolot baheula mah tos terang, kudu tatandur tangkal di palataran sareng ulah miceun runtah sambarangan.",
      indonesian: "Leluhur sudah tahu, harus menanam pohon di pekarangan dan tidak membuang sampah sembarangan."
    },
    cardAssets: {
      cardImage: "/assets/images/cards/ibu-eneng-eco-citizen.png",
      cardImageAlt: "/assets/images/cards/alt/ibu-eneng-eco-citizen-alt.jpg",
      avatarImage: "/assets/images/avatars/ibu-eneng-avatar.png",
      roleIcon: "/assets/images/icons/eco-citizen-icon.svg",
      backgroundImage: "/assets/images/backgrounds/traditional-market-bg.jpg",
      cardBack: "/assets/images/cards/backs/eco-citizen-back.png"
    },
    traditionalWisdom: [
      "Planting trees in yards",
      "Proper waste disposal",
      "Local agriculture support",
      "Community cooperation"
    ],
    challenges: [
      "Extreme weather affecting crops",
      "Waste pollution",
      "Land conversion pressure",
      "Changing climate patterns"
    ],
    abilities: [
      {
        name: "Cultural Knowledge",
        description: "Memegang nilai-nilai budaya lokal yang berpotensi membantu menjaga lingkungan",
        cooldown: 0,
        usageLimit: "passive",
        icon: "/assets/icons/abilities/cultural_knowledge.svg"
      }
    ],
    characteristics: [
      "Sociable",
      "Traditional wisdom keeper",
      "Community connector",
      "Environmental potential"
    ],
    gameRole: "citizen",
    winCondition: "survive_and_eliminate_villains",
    displayOrder: 7,
    cardColor: "#059669",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "sustainability_guide_1",
    name: "Kang Alam",
    roleType: "Sustainability Guide",
    roleCategory: "guide",
    maxCount: 1,
    location: "Dayeuhmanggung Village", 
    occupation: "Village Elder & Environmental Guide",
    nickname: "Pangaping Lembur",
    description: "Sosok yang dituakan di desa, penuntun masyarakat dalam nilai-nilai kehidupan dan kelestarian alam",
    backstory: "Sejak muda, ia belajar dari karuhun tentang pentingnya menjaga keseimbangan antara manusia dan alam. Ia mengajarkan bahwa masalah lingkungan bukan hanya soal teknis tapi soal cara berpikir dan hidup.",
    quote: {
      sundanese: "Alam téh sakola nu teu boga tembok.",
      indonesian: "Alam itu sekolah tanpa dinding."
    },
    cardAssets: {
      cardImage: "/assets/images/cards/sustainability-guide.png",
      cardImageAlt: "/assets/images/cards/alt/sustainability-guide-alt.jpg",
      avatarImage: "/assets/images/avatars/kang-alam-avatar.png",
      roleIcon: "/assets/images/icons/sustainability-guide-icon.svg",
      backgroundImage: "/assets/images/backgrounds/village-elder-bg.jpg",
      cardBack: "/assets/images/cards/backs/sustainability-guide-back.png"
    },
    teachings: [
      "Human-nature balance",
      "Environmental thinking",
      "Sustainable lifestyle", 
      "Traditional ecological knowledge"
    ],
    values: [
      "Gotong royong (Sabilulungan)",
      "Silih asah (mutual learning)",
      "Silih asih (mutual caring)",
      "Silih asuh (mutual nurturing)"
    ],
    abilities: [
      {
        name: "Guidance",
        description: "Membantu memastikan nilai-nilai luhur tetap hidup dalam permainan",
        cooldown: 0,
        usageLimit: "unlimited",
        icon: "/assets/icons/abilities/guidance.svg"
      },
      {
        name: "Direction Setting",
        description: "Tidak bisa mengubah jalan cerita tapi bisa menuntun arah langkah",
        cooldown: 0,
        usageLimit: "passive",
        icon: "/assets/icons/abilities/direction_setting.svg"
      }
    ],
    characteristics: [
      "Wise elder",
      "Non-combatant",
      "Value guardian", 
      "Community guide"
    ],
    gameRole: "guide",
    winCondition: "maintain_community_values",
    specialRole: true,
    neutralInConflict: true,
    displayOrder: 8,
    cardColor: "#7c3aed",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Card asset configuration
const cardAssetConfig = {
  basePath: "/assets/images",
  dimensions: {
    cardWidth: 300,
    cardHeight: 420,
    avatarSize: 80,
    iconSize: 32
  },
  formats: {
    primary: "png",
    alternative: "jpg",
    icon: "svg"
  },
  directories: {
    cards: "/cards",
    avatars: "/avatars", 
    icons: "/icons",
    backgrounds: "/backgrounds",
    cardBacks: "/cards/backs",
    abilities: "/icons/abilities"
  },
  existingFiles: [
    "asep-eco-citizen.png",
    "ibu-eneng-eco-citizen.png", 
    "kang-raka-green-guardian.png",
    "mang-karwa-waste-villain.png",
    "sustainability-guide.png",
    "teh-rani-green-guardian.png",
    "waste-manager.png",
    "yana-waste-villain.png"
  ]
};

// Seeder function
async function seedCharacters(db) {
  try {
    // Drop existing collection if needed
    await db.collection('characters').deleteMany({});
    
    // Insert characters
    const result = await db.collection('characters').insertMany(characters);
    console.log(`Successfully seeded ${result.insertedCount} characters`);
    
    // Create indexes
    await db.collection('characters').createIndex({ "roleType": 1 });
    await db.collection('characters').createIndex({ "roleCategory": 1 });
    await db.collection('characters').createIndex({ "gameRole": 1 });
    await db.collection('characters').createIndex({ "name": 1 }, { unique: true });
    await db.collection('characters').createIndex({ "displayOrder": 1 });
    await db.collection('characters').createIndex({ "cardColor": 1 });
    
    console.log('Indexes created successfully');
    
    return result;
  } catch (error) {
    console.error('Error seeding characters:', error);
    throw error;
  }
}

// Seed card asset configuration
async function seedCardAssetConfig(db) {
  try {
    await db.collection('card_asset_config').replaceOne(
      { configType: 'card_assets' },
      {
        configType: 'card_assets',
        ...cardAssetConfig,
        lastUpdated: new Date()
      },
      { upsert: true }
    );
    
    console.log('Card asset configuration seeded successfully');
  } catch (error) {
    console.error('Error seeding card asset config:', error);
    throw error;
  }
}

// Query helpers for characters
const characterQueryHelpers = {
  // Get character by role type
  getCharactersByRole: async (db, roleType) => {
    return await db.collection('characters')
      .find({ roleType: roleType })
      .sort({ displayOrder: 1 })
      .toArray();
  },
  
  // Get characters by category
  getCharactersByCategory: async (db, roleCategory) => {
    return await db.collection('characters')
      .find({ roleCategory: roleCategory })
      .sort({ displayOrder: 1 })
      .toArray();
  },
  
  // Get character with card assets
  getCharacterWithAssets: async (db, characterId) => {
    return await db.collection('characters')
      .findOne({ _id: characterId });
  },
  
  // Get all characters for game setup
  getAllCharactersForGame: async (db) => {
    return await db.collection('characters')
      .find({ isActive: true })
      .sort({ displayOrder: 1 })
      .project({
        name: 1,
        roleType: 1,
        roleCategory: 1,
        gameRole: 1,
        maxCount: 1,
        cardAssets: 1,
        cardColor: 1,
        abilities: 1
      })
      .toArray();
  },
  
  // Get card asset paths by character
  getCardAssets: async (db, characterId) => {
    const character = await db.collection('characters')
      .findOne({ _id: characterId }, { projection: { cardAssets: 1, name: 1 } });
    
    if (!character) return null;
    
    return {
      characterName: character.name,
      assets: character.cardAssets
    };
  }
};

// Asset validation utilities
const assetValidation = {
  // Validate character card assets
  validateCharacterAssets: async (character) => {
    const requiredAssets = [
      'cardImage',
      'avatarImage', 
      'roleIcon',
      'backgroundImage',
      'cardBack'
    ];
    
    const missingAssets = [];
    
    requiredAssets.forEach(asset => {
      if (!character.cardAssets[asset]) {
        missingAssets.push(asset);
      }
    });
    
    return {
      isValid: missingAssets.length === 0,
      missingAssets: missingAssets,
      character: character.name
    };
  },
  
  // Validate all characters assets
  validateAllCharacterAssets: async () => {
    const validationResults = [];
    
    for (const character of characters) {
      const validation = await assetValidation.validateCharacterAssets(character);
      validationResults.push(validation);
    }
    
    return {
      totalCharacters: characters.length,
      validCharacters: validationResults.filter(r => r.isValid).length,
      invalidCharacters: validationResults.filter(r => !r.isValid),
      results: validationResults
    };
  }
};

// Export untuk digunakan di file lain
module.exports = {
  characters,
  cardAssetConfig,
  seedCharacters,
  seedCardAssetConfig,
  characterQueryHelpers,
  assetValidation
};

// Role distribution summary untuk reference
const roleDistribution = {
  "Green Guardian": 2,
  "Waste Manager": 1, 
  "Waste Villain": 2,
  "Eco Citizen": 2,
  "Sustainability Guide": 1
};

// Asset summary
const assetSummary = {
  totalCharacters: characters.length,
  totalCardImages: characters.length,
  totalAvatars: characters.length,
  totalRoleIcons: [...new Set(characters.map(c => c.cardAssets.roleIcon))].length,
  totalBackgrounds: characters.length,
  totalAbilityIcons: characters.reduce((sum, c) => sum + c.abilities.length, 0),
  cardColors: [...new Set(characters.map(c => c.cardColor))],
  assetDirectories: Object.keys(cardAssetConfig.directories).length
};

console.log('Character Seeder with Card Assets loaded successfully!');
console.log('Role Distribution:', roleDistribution);
console.log('Asset Summary:', assetSummary);