import { Skill, Student } from './types';

export const INITIAL_STUDENTS: Student[] = [
  // Groep 3
  { id: 's_g3_1', firstName: 'Sem', lastName: 'Jansen', group: 'Groep 3' },
  { id: 's_g3_2', firstName: 'Mila', lastName: 'de Boer', group: 'Groep 3' },
  { id: 's_g3_3', firstName: 'James', lastName: 'Willems', group: 'Groep 3' },
  
  // Groep 4
  { id: 's_g4_1', firstName: 'Tess', lastName: 'Hoogland', group: 'Groep 4' },
  { id: 's_g4_2', firstName: 'Daan', lastName: 'Visser', group: 'Groep 4' },

  // Groep 5/6
  { id: 's1', firstName: 'Emma', lastName: 'de Vries', group: 'Groep 5/6' },
  { id: 's2', firstName: 'Liam', lastName: 'Bakker', group: 'Groep 5/6' },
  { id: 's3', firstName: 'Noah', lastName: 'Visser', group: 'Groep 5/6' },
  
  // Groep 7/8
  { id: 's4', firstName: 'Julia', lastName: 'Smit', group: 'Groep 7/8' },
  { id: 's_g78_2', firstName: 'Levi', lastName: 'Meijer', group: 'Groep 7/8' },
  { id: 's_g78_3', firstName: 'Saar', lastName: 'Koning', group: 'Groep 7/8' },
];

export const INITIAL_SKILLS: Skill[] = [
  // --- DOMEIN: TURNEN ---
  {
    id: 'sk_bal_1',
    domain: 'Turnen',
    theme: 'Balanceren',
    name: 'Handstand',
    groupCategory: '5-6',
    mediaUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&q=80&w=400', 
    mediaType: 'image',
    levels: [
      { level: 1, description: 'Achteruit tegen muur omhooglopen (buik naar muur)' },
      { level: 2, description: 'Vanuit stand handstand opzwaaien tegen muur (rug naar muur)' },
      { level: 3, description: 'Vrijstaand: handstand kort aantikken en terugkomen' },
      { level: 4, description: 'Vrijstaand: handstand 3 seconden fixeren en doorrollen' },
    ]
  },
  {
    id: 'sk_bal_2',
    domain: 'Turnen',
    theme: 'Balanceren',
    name: 'Balk (Smal vlak)',
    groupCategory: '5-6',
    levels: [
      { level: 1, description: 'Lopen over de omgekeerde bank' },
      { level: 2, description: 'Lopen over de balk (midden)' },
      { level: 3, description: 'Lopen met draai (halve draai) op de balk' },
      { level: 4, description: 'Zweefstand of huppelpas op de balk' },
    ]
  },
  {
    id: 'sk_odk_1',
    domain: 'Turnen',
    theme: 'Over de kop gaan',
    name: 'Radslag',
    groupCategory: '5-6',
    levels: [
      { level: 1, description: 'Lage radslag over kastkop/bank (handen zelfde kant)' },
      { level: 2, description: 'Lage radslag over lijn/mat (benen krom)' },
      { level: 3, description: 'Hoge radslag over lijn (benen gestrekt, verticaal)' },
      { level: 4, description: 'Radslag op één hand of arabier' },
    ]
  },
  {
    id: 'sk_odk_2',
    domain: 'Turnen',
    theme: 'Over de kop gaan',
    name: 'Salto',
    groupCategory: '7-8',
    levels: [
      { level: 1, description: 'Koprol in de lucht met hulp (aan armen)' },
      { level: 2, description: 'Salto vanuit minitrampoline met vangen' },
      { level: 3, description: 'Salto vanuit minitrampoline zelfstandig tot zit/stand' },
      { level: 4, description: 'Salto vanuit aanloop op lange mat (vloer)' },
    ]
  },
  {
    id: 'sk_zwa_1',
    domain: 'Turnen',
    theme: 'Zwaaien',
    name: 'Ringzwaaien',
    groupCategory: '5-6',
    levels: [
      { level: 1, description: 'Schommelen: heen en terug vaart maken door te rennen' },
      { level: 2, description: 'Zwaaien: in de zwaai benen stil houden (kaars)' },
      { level: 3, description: 'Zwaaien: halve draai in het dode punt' },
      { level: 4, description: 'Zwaaien: afsprong met salto achterover' },
    ]
  },
  {
    id: 'sk_zwa_2',
    domain: 'Turnen',
    theme: 'Zwaaien',
    name: 'Duikelen',
    groupCategory: '3-4',
    levels: [
      { level: 1, description: 'Borstwaartsom aan de lage rekstok (met sprong)' },
      { level: 2, description: 'Borstwaartsom uit stand (zonder sprong)' },
      { level: 3, description: 'Draai om de stok (buikdraai)' },
      { level: 4, description: 'Ondersprong vanuit steun' },
    ]
  },
  {
    id: 'sk_kli_1',
    domain: 'Turnen',
    theme: 'Klimmen',
    name: 'Touwklimmen',
    groupCategory: 'All',
    levels: [
      { level: 1, description: 'In het touw hangen en voetenklem maken (laag)' },
      { level: 2, description: 'Tot halverwege klimmen met voetenklem' },
      { level: 3, description: 'Tot het plafond klimmen met voetenklem' },
      { level: 4, description: 'Klimmen zonder benen (alleen armen)' },
    ]
  },
  {
    id: 'sk_spr_1',
    domain: 'Turnen',
    theme: 'Springen',
    name: 'Steunspringen (Kast)',
    groupCategory: '5-6',
    levels: [
      { level: 1, description: 'Hurksprong op de kast, streksprong eraf' },
      { level: 2, description: 'Hurksprong over de kast (dwars)' },
      { level: 3, description: 'Wendsprong over de kast' },
      { level: 4, description: 'Overslag over de kast (lengte)' },
    ]
  },
  {
    id: 'sk_spr_2',
    domain: 'Turnen',
    theme: 'Springen',
    name: 'Minitrampoline (Hoog)',
    groupCategory: 'All',
    levels: [
      { level: 1, description: 'Streksprong met stabiele landing' },
      { level: 2, description: 'Hurksprong of spreidsprong' },
      { level: 3, description: 'Halve draai in de zweeffase' },
      { level: 4, description: 'Hele draai in de zweeffase' },
    ]
  },

  // --- DOMEIN: ATLETIEK ---
  {
    id: 'sk_lop_1',
    domain: 'Atletiek',
    theme: 'Hardlopen',
    name: 'Sprint (60m)',
    groupCategory: 'All',
    levels: [
      { level: 1, description: 'Starten vanuit stand en rechtdoor rennen' },
      { level: 2, description: 'Starten vanuit hurkzit (startblok houding)' },
      { level: 3, description: 'Explosieve start en arminzet correct' },
      { level: 4, description: 'Technisch perfecte sprint (kniehef, arminzet)' },
    ]
  },
  {
    id: 'sk_jong_1',
    domain: 'Atletiek',
    theme: 'Jongleren',
    name: 'Jongleren (Ballen)',
    groupCategory: 'All',
    levels: [
      { level: 1, description: '2 ballen in 1 hand gooien en vangen' },
      { level: 2, description: 'Cascade met 2 ballen (kruisen)' },
      { level: 3, description: 'Cascade met 3 ballen (10x vangen)' },
      { level: 4, description: '3 ballen continu jongleren met trucs' },
    ]
  },

  // --- DOMEIN: SPELEN ---
  {
    id: 'sk_mik_1',
    domain: 'Spelen',
    theme: 'Mikken',
    name: 'Basketbal (Doelschieten)',
    groupCategory: '7-8',
    levels: [
      { level: 1, description: 'Bal in de ring gooien vanaf 2 meter (bovenhands)' },
      { level: 2, description: 'Set shot (stand) vanaf de vrije worp lijn' },
      { level: 3, description: 'Lay-up na dribbel (zonder pasfout)' },
      { level: 4, description: 'Jump shot vanuit dribbel' },
    ]
  },
  {
    id: 'sk_doel_1',
    domain: 'Spelen',
    theme: 'Doelspelen',
    name: 'Voetbal (Dribbel)',
    groupCategory: 'All',
    levels: [
      { level: 1, description: 'Dribbelen in rechte lijn, bal dichtbij houden' },
      { level: 2, description: 'Slalom dribbelen om pionnen' },
      { level: 3, description: 'Dribbelen, kappen en draaien met tegenstander' },
      { level: 4, description: 'Dribbelen en scoren op doel met weerstand' },
    ]
  },
  {
    id: 'sk_doel_2',
    domain: 'Spelen',
    theme: 'Doelspelen',
    name: 'Hockey (Drijven)',
    groupCategory: '5-6',
    levels: [
      { level: 1, description: 'Bal controleren met stick (forehand)' },
      { level: 2, description: 'Drijven met de bal (lopen met bal aan stick)' },
      { level: 3, description: 'Indian dribble (links-rechts) in stand' },
      { level: 4, description: 'Indian dribble op snelheid langs tegenstander' },
    ]
  },
  {
    id: 'sk_ts_1',
    domain: 'Spelen',
    theme: 'Terugslagspelen',
    name: 'Volleybal (Toetsen)',
    groupCategory: '7-8',
    levels: [
      { level: 1, description: 'Bal opgooien en vangen (boven hoofd)' },
      { level: 2, description: 'Bal bovenhands toetsen (controle)' },
      { level: 3, description: 'Bal toetsen naar partner (rally 3x)' },
      { level: 4, description: 'Sprongset (toetsen in sprong)' },
    ]
  },
  {
    id: 'sk_ts_2',
    domain: 'Spelen',
    theme: 'Terugslagspelen',
    name: 'Badminton',
    groupCategory: '5-6',
    levels: [
      { level: 1, description: 'Shuttle hooghouden op racket' },
      { level: 2, description: 'Service onderhands over het net' },
      { level: 3, description: 'Clear (bovenhandse slag) achterin het veld' },
      { level: 4, description: 'Smash en drop-shot afwisselen' },
    ]
  },
  
  // --- DOMEIN: VECHTSPELEN ---
  {
    id: 'sk_stoei_1',
    domain: 'Vechtspelen',
    theme: 'Stoeispelen',
    name: 'Judo (Controle)',
    groupCategory: 'All',
    levels: [
      { level: 1, description: 'Op de grond stoeien zonder pijn te doen' },
      { level: 2, description: 'Houdgreep aanleggen (10 sec vasthouden)' },
      { level: 3, description: 'Bevrijden uit een houdgreep' },
      { level: 4, description: 'Staand judo worp (heupworp) uitvoeren' },
    ]
  }
];