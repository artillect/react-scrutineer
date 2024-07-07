// /src/utils/constants.js

export const SAMPLE_DANCERS = [
  // Primary
  { id: '520', number: '520', name: 'Una Kerr', category: 'primary', age: '6' },
  { id: '521', number: '521', name: 'Vaila Henderson', category: 'primary', age: '5' },
  
  // Beginner
  { id: '503', number: '503', name: 'Catriona Fraser', category: 'beginner', age: '9' },
  { id: '511', number: '511', name: 'Kirsty Wallace', category: 'beginner', age: '12' },
  { id: '514', number: '514', name: 'Nessa Sinclair', category: 'beginner', age: '8' },
  { id: '516', number: '516', name: 'Peigi Munro', category: 'beginner', age: '10' },
  { id: '518', number: '518', name: 'Sorcha Gunn', category: 'beginner', age: '6' },
  { id: '525', number: '525', name: 'Angus MacDonald', category: 'beginner', age: '8' },
  { id: '529', number: '529', name: 'Fionnuala O\'Brien', category: 'beginner', age: '12' },
  { id: '533', number: '533', name: 'Jock Ferguson', category: 'beginner', age: '9' },
  { id: '537', number: '537', name: 'Niall MacPherson', category: 'beginner', age: '8' },
  { id: '541', number: '541', name: 'Rory MacDonald', category: 'beginner', age: '11' },
  { id: '545', number: '545', name: 'Violet MacKay', category: 'beginner', age: '11' },
  { id: '549', number: '549', name: 'Zander Murray', category: 'beginner', age: '9' },
  
  // Novice
  { id: '502', number: '502', name: 'Bonnie Campbell', category: 'novice', age: '13' },
  { id: '504', number: '504', name: 'Dorah Sutherland', category: 'novice', age: '14' },
  { id: '510', number: '510', name: 'Jenna McGregor', category: 'novice', age: '12' },
  { id: '522', number: '522', name: 'Wren Douglas', category: 'novice', age: '10' },
  { id: '526', number: '526', name: 'Callum Fraser', category: 'novice', age: '13' },
  { id: '530', number: '530', name: 'Gavin McLeod', category: 'novice', age: '12' },
  { id: '534', number: '534', name: 'Kenna MacIntyre', category: 'novice', age: '11' },
  { id: '538', number: '538', name: 'Orla Sutherland', category: 'novice', age: '13' },
  { id: '542', number: '542', name: 'Skye Henderson', category: 'novice', age: '12' },
  { id: '546', number: '546', name: 'Wallace Stewart', category: 'novice', age: '11' },
  { id: '550', number: '550', name: 'Aileen Douglas', category: 'novice', age: '12' },

  // Intermediate
  { id: '513', number: '513', name: 'Morag Cameron', category: 'intermediate', age: '12' },
  { id: '517', number: '517', name: 'Rhona Davidson', category: 'intermediate', age: '15' },
  { id: '519', number: '519', name: 'Tara MacLean', category: 'intermediate', age: '14' },
  { id: '523', number: '523', name: 'Yvonne Mackay', category: 'intermediate', age: '11' },
  { id: '527', number: '527', name: 'Donella Campbell', category: 'intermediate', age: '16' },
  { id: '531', number: '531', name: 'Hamish Gordon', category: 'intermediate', age: '14' },
  { id: '535', number: '535', name: 'Lachlan Campbell', category: 'intermediate', age: '13' },
  { id: '539', number: '539', name: 'Paden Ross', category: 'intermediate', age: '15' },
  { id: '543', number: '543', name: 'Tavish Graham', category: 'intermediate', age: '14' },
  { id: '547', number: '547', name: 'Xena Cameron', category: 'intermediate', age: '13' },
  
  // Premier
  { id: '501', number: '501', name: 'Ailsa MacLeod', category: 'premier', age: '10' },
  { id: '505', number: '505', name: 'Eilidh Murray', category: 'premier', age: '13' },
  { id: '506', number: '506', name: 'Fiona MacDonald', category: 'premier', age: '15' },
  { id: '507', number: '507', name: 'Greer Stewart', category: 'premier', age: '22' },
  { id: '508', number: '508', name: 'Heather Ross', category: 'premier', age: '33' },
  { id: '509', number: '509', name: 'Isla Graham', category: 'premier', age: '9' },
  { id: '512', number: '512', name: 'Lorna Buchanan', category: 'premier', age: '25' },
  { id: '515', number: '515', name: 'Oona MacKenzie', category: 'premier', age: '51' },
  { id: '524', number: '524', name: 'Zara Robertson', category: 'premier', age: '17' },
  { id: '528', number: '528', name: 'Euan Stewart', category: 'premier', age: '20' },
  { id: '532', number: '532', name: 'Isobel Mackenzie', category: 'premier', age: '18' },
  { id: '536', number: '536', name: 'Mairi Sinclair', category: 'premier', age: '23' },
  { id: '540', number: '540', name: 'Qavin MacLean', category: 'premier', age: '19' },
  { id: '544', number: '544', name: 'Uilleam Fraser', category: 'premier', age: '21' },
  { id: '548', number: '548', name: 'Yana MacLeod', category: 'premier', age: '24' },
];


export const INITIAL_AGE_GROUPS = {
  primary: [
    { name: 'All Ages', minAge: '', maxAge: '' }
  ],
  beginner: [
    { name: '8 & Under', minAge: '', maxAge: '8' },
    { name: '9 & Over', minAge: '9', maxAge: '' }
  ],
  novice: [
    { name: '12 & Under', minAge: '', maxAge: '12' },
    { name: '13 & Over', minAge: '13', maxAge: '' }
  ],
  intermediate: [
    { name: '13 & Under', minAge: '', maxAge: '13' },
    { name: '14 & Over', minAge: '14', maxAge: '' }
  ],
  premier: [
    { name: '10 & Under', minAge: '', maxAge: '10' },
    { name: '11 & Under 13', minAge: '11', maxAge: '12' },
    { name: '13 & Under 16', minAge: '13', maxAge: '15' },
    { name: '16 & Under 24', minAge: '16', maxAge: '23' },
    { name: '24 & Over', minAge: '24', maxAge: '' }
  ],
};
  
  export const INITIAL_DANCES = {
    primary: ['16 Pas de Basques', 'Pas de Basques and Highcuts', 'Highland Fling (4 steps)', 'Sword Dance (2 slow, 1 quick)'],
    beginner: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel'],
    novice: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel'],
    intermediate: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Flora MacDonald\'s Fancy', 'Scottish Lilt'],
    premier: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Sailor\'s Hornpipe', 'Irish Jig'],
    championship: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Strathspey and Highland Reel'],
    premiership: ['Irish Jig', 'Sailors Hornpipe', 'Scottish Lilt', 'Flora MacDonald\'s Fancy'],
  };
  
  export const ALL_DANCES = {
    primary: INITIAL_DANCES.primary,
    beginnerNovice: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Special Fling or Trophy Fling'],
    intermediate: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Barracks Johnnie', 'Highland Laddie', 'Sailor\'s Hornpipe', 'Irish Jig'],
    premier: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Sailor\'s Hornpipe', 'Irish Jig', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Wilt Thou Go to the Barracks Johnnie', 'Highland Laddie', 'Blue Bonnets', 'Village Maid', 'Earl of Errol', 'Scotch Measure'],
    championship: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Strathspey and Highland Reel', 'Strathspey and Half Tulloch', 'Strathspey and Highland Reel and Half Tulloch'],
    premiership: ['Irish Jig', 'Sailor\'s Hornpipe', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Blue Bonnets', 'Village Maid', 'Earl of Errol', 'Scotch Measure'],
  };
  
  export const INITIAL_CHAMPIONSHIP_AGE_GROUPS = [
    { name: '7 & Under 12', minAge: '7', maxAge: '11' },
    { name: '12 & Under 16', minAge: '12', maxAge: '15' },
    { name: '16 & Over', minAge: '16', maxAge: '' }
  ];
  
  export const INITIAL_PREMIERSHIP = {
    ageGroups: [
      { name: 'Juvenile (7 Years – Under 12 Years)', minAge: '7', maxAge: '11' },
      { name: 'Junior (12 & Under 16 Years)', minAge: '12', maxAge: '15' },
      { name: 'Senior (16 Years & Over)', minAge: '16', maxAge: '' }
    ],
    dances: INITIAL_DANCES.premiership
  };

  export const INITIAL_COMPETITION = {
    id: 'comp_001',
    name: 'Regular Competition',
    type: 'Regular',
    categories: ['primary', 'beginner', 'novice', 'intermediate', 'premier'],
    ageGroups: INITIAL_AGE_GROUPS,
    dances: INITIAL_DANCES,
    judges: ['Judge 1', 'Judge 2', 'Judge 3'],
  };