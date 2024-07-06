
export const SAMPLE_DANCERS = [
  { id: '499', number: '499', name: 'Ailsa MacLeod', category: 'premier', age: '10' },
  { id: '498', number: '498', name: 'Bonnie Campbell', category: 'novice', age: '11' },
  { id: '497', number: '497', name: 'Catriona Fraser', category: 'beginner', age: '9' },
  { id: '496', number: '496', name: 'Dorah Sutherland', category: 'novice', age: '14' },
  { id: '490', number: '490', name: 'Eilidh Murray', category: 'premier', age: '13' },
  { id: '489', number: '489', name: 'Fiona MacDonald', category: 'premier', age: '15' },
  { id: '487', number: '487', name: 'Greer Stewart', category: 'premier', age: '22' },
  { id: '486', number: '486', name: 'Heather Ross', category: 'premier', age: '33' },
  { id: '485', number: '485', name: 'Isla Graham', category: 'premier', age: '9' },
  { id: '483', number: '483', name: 'Jenna McGregor', category: 'novice', age: '12' },
  { id: '481', number: '481', name: 'Kirsty Wallace', category: 'beginner', age: '7' },
  { id: '472', number: '472', name: 'Lorna Buchanan', category: 'premier', age: '25' },
  { id: '468', number: '468', name: 'Morag Cameron', category: 'intermediate', age: '12' },
  { id: '466', number: '466', name: 'Nessa Sinclair', category: 'beginner', age: '8' },
  { id: '462', number: '462', name: 'Oona MacKenzie', category: 'premier', age: '51' },
  { id: '460', number: '460', name: 'Peigi Munro', category: 'beginner', age: '10' },
  { id: '456', number: '456', name: 'Rhona Davidson', category: 'intermediate', age: '15' },
  { id: '454', number: '454', name: 'Sorcha Gunn', category: 'beginner', age: '6' },
  { id: '450', number: '450', name: 'Tara MacLean', category: 'intermediate', age: '14' },
  { id: '435', number: '435', name: 'Una Kerr', category: 'primary', age: '6' },
  { id: '434', number: '434', name: 'Vaila Henderson', category: 'primary', age: '5' },
  { id: '433', number: '433', name: 'Wren Douglas', category: 'novice', age: '10' },
  { id: '432', number: '432', name: 'Yvonne Mackay', category: 'intermediate', age: '11' },
  { id: '431', number: '431', name: 'Zara Robertson', category: 'premier', age: '17' },
];

export const INITIAL_AGE_GROUPS = {
  primary: [{ name: 'All Ages', minAge: '0', maxAge: '7' }],
  beginner: [
    { name: '10 & Under', minAge: '0', maxAge: '10' },
    { name: '11 & Over', minAge: '11', maxAge: '' }
  ],
  novice: [
    { name: '12 & Under', minAge: '0', maxAge: '12' },
    { name: '13 & Over', minAge: '13', maxAge: '' }
  ],
  intermediate: [{ name: 'All Ages', minAge: '0', maxAge: '' }],
  premier: [
    { name: '7 & Under 12', minAge: '7', maxAge: '11' },
    { name: '12 & Under 16', minAge: '12', maxAge: '15' },
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