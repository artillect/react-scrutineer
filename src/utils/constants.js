export const INITIAL_AGE_GROUPS = {
    primary: [{ name: 'All Ages' }],
    beginner: [{ name: '10 & Under', minAge: '', maxAge: '10' }, { name: '11 & Over', minAge: '11', maxAge: '' }],
    novice: [{ name: 'All Ages' }],
    intermediate: [{ name: 'All Ages' }],
    premier: [
      { name: '7 & Under 12', minAge: '7', maxAge: '11' },
      { name: '12 & Under 16', minAge: '12', maxAge: '15' },
      { name: '16 & Over', minAge: '16', maxAge: '' }
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