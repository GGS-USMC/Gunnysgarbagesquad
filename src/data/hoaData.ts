import { CityServiceInfo, BenefitItem, WhyGunnyCard, FaqItem } from '../types';

export const ARIZONA_CITIES: CityServiceInfo[] = [
  {
    name: 'Phoenix',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85001', '85008', '85016', '85018', '85020', '85022', '85024', '85028', '85032', '85044', '85048', '85050', '85083', '85085', '85086'],
    description: 'Serving North Phoenix, Ahwatukee, Desert Ridge, Arcadia, and surrounding master-planned communities.',
    popularCommunities: ['Desert Ridge', 'Ahwatukee Foothills', 'Norterra', 'Tatum Ranch', 'Arcadia']
  },
  {
    name: 'Mesa',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85201', '85205', '85206', '85207', '85208', '85209', '85212', '85213', '85215'],
    description: 'Full valet trash service across East Mesa, Las Sendas, Red Mountain, and Eastmark.',
    popularCommunities: ['Las Sendas', 'Eastmark', 'Mountain Bridge', 'Red Mountain Ranch', 'Alta Mesa']
  },
  {
    name: 'Chandler',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85224', '85225', '85226', '85248', '85249', '85286'],
    description: 'Serving Ocotillo, Fulton Ranch, Sun Lakes, and premier Chandler HOA neighborhoods.',
    popularCommunities: ['Ocotillo', 'Fulton Ranch', 'Sun Lakes', 'Chuparosa', 'Paseo Vista']
  },
  {
    name: 'Gilbert',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85233', '85234', '85295', '85296', '85297', '85298'],
    description: 'Comprehensive valet service for Power Ranch, Agritopia, Seville, and Morrison Ranch.',
    popularCommunities: ['Power Ranch', 'Agritopia', 'Seville', 'Morrison Ranch', 'Val Vista Lakes']
  },
  {
    name: 'Scottsdale',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85250', '85251', '85254', '85255', '85258', '85259', '85260', '85262', '85266'],
    description: 'Premium HOA trash valet across North Scottsdale, Gainey Ranch, McCormick Ranch, and DC Ranch.',
    popularCommunities: ['DC Ranch', 'McCormick Ranch', 'Gainey Ranch', 'McDowell Mountain Ranch', 'Troon North']
  },
  {
    name: 'Tempe',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85281', '85282', '85283', '85284'],
    description: 'Serving Warner Ranch, Corona del Sol, and luxury Tempe gated communities.',
    popularCommunities: ['Warner Ranch', 'The Lakes', 'Corona del Sol', 'Kempton Crossing']
  },
  {
    name: 'Glendale',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85301', '85304', '85306', '85308', '85310'],
    description: 'Serving Arrowhead Ranch, Thunderbird, and Glendale active adult communities.',
    popularCommunities: ['Arrowhead Ranch', 'Arrowhead Lakes', 'Thunderbird Paseo', 'Glendale HOA']
  },
  {
    name: 'Peoria',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85345', '85381', '85382', '85383'],
    description: 'Serving Vistancia, Fletcher Heights, and Westwing Mountain communities.',
    popularCommunities: ['Vistancia', 'Fletcher Heights', 'Westwing Mountain', 'Twin Towers']
  },
  {
    name: 'Surprise',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85374', '85379', '85387', '85388'],
    description: 'Serving Surprise Farms, Sun City Grand, and Marley Park neighborhoods.',
    popularCommunities: ['Marley Park', 'Surprise Farms', 'Sierra Montana', 'Sun City Grand']
  },
  {
    name: 'Goodyear',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85338', '85395'],
    description: 'Serving Estrella Mountain Ranch, Palm Valley, and Canyon Trails.',
    popularCommunities: ['Estrella Mountain Ranch', 'Palm Valley', 'Canyon Trails', 'PebbleCreek']
  },
  {
    name: 'Avondale',
    county: 'Maricopa',
    status: 'Active',
    zipCodes: ['85323', '85392'],
    description: 'Serving Fulton Estates, Coldwater Springs, and Avondale HOA subdivisions.',
    popularCommunities: ['Coldwater Springs', 'Fulton Estates', 'Rancho Santa Fe']
  },
  {
    name: 'Buckeye',
    county: 'Maricopa',
    status: 'Expanding',
    zipCodes: ['85326', '85396'],
    description: 'Expanding coverage in Verrado, Tartesso, and West Valley growing HOAs.',
    popularCommunities: ['Verrado', 'Tartesso', 'Sundance']
  },
  {
    name: 'Queen Creek',
    county: 'Maricopa / Pinal',
    status: 'Active',
    zipCodes: ['85142', '85143'],
    description: 'Serving Queen Creek Station, Montelena, and San Tan Heights.',
    popularCommunities: ['Queen Creek Station', 'Montelena', 'Hastings Farms']
  },
  {
    name: 'Maricopa',
    county: 'Pinal',
    status: 'Expanding',
    zipCodes: ['85138', '85139'],
    description: 'Expanding coverage for Rancho El Dorado, Province, and Senita HOAs.',
    popularCommunities: ['Rancho El Dorado', 'Province', 'Senita']
  }
];

export const HOA_BENEFITS: BenefitItem[] = [
  {
    id: 'b1',
    title: 'Increased Resident Convenience',
    description: 'Residents never have to worry about heavy bins, bad weather, or missing pickup day.',
    iconName: 'Smile'
  },
  {
    id: 'b2',
    title: 'Cleaner-Looking Communities',
    description: 'Bins are placed cleanly and returned promptly, keeping driveways clear and neighborhood aesthetics pristine.',
    iconName: 'Sparkles'
  },
  {
    id: 'b3',
    title: 'Reliable Scheduled Service',
    description: 'Our squad operates on strict neighborhood schedules synchronized perfectly with city collection days.',
    iconName: 'Clock'
  },
  {
    id: 'b4',
    title: 'Professional Uniformed Team',
    description: 'Background-checked, fully insured team members in clean high-visibility uniforms.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'b5',
    title: 'Less Hassle for Elderly Residents',
    description: 'Eliminates physical strain and fall risks for senior homeowners, snowbirds, and mobility-impaired residents.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'b6',
    title: 'Great Community Amenity (From $7.25/Wk)',
    description: 'Affordable HOA perk starting at just $7.25/week (or $9.75/week for twice-weekly pickup) that boosts resident satisfaction and neighborhood appeal.',
    iconName: 'Building2'
  },
  {
    id: 'b7',
    title: 'Local Arizona Service',
    description: 'Owned and operated right here in the Valley. We understand Arizona heat, monsoons, and local HOA needs.',
    iconName: 'MapPin'
  },
  {
    id: 'b8',
    title: 'Easy HOA Implementation',
    description: 'Zero friction onboarding. We provide resident communications, custom schedule rollouts, and board reporting.',
    iconName: 'CheckCircle2'
  }
];

export const WHY_GUNNYS_CARDS: WhyGunnyCard[] = [
  {
    id: 'w1',
    title: 'Reliable',
    description: 'We show up when your cans need to be moved. Rain, shine, or Arizona summer heat — guaranteed.',
    iconName: 'CalendarCheck'
  },
  {
    id: 'w2',
    title: 'Convenient',
    description: 'Residents don’t have to worry about getting their cans to and from the curb ever again.',
    iconName: 'ThumbsUp'
  },
  {
    id: 'w3',
    title: 'Local',
    description: 'Proudly serving the Phoenix Valley and surrounding Arizona communities with local accountability.',
    iconName: 'Sun'
  },
  {
    id: 'w4',
    title: 'Professional',
    description: 'Our team is trained, uniformed, and background-checked to provide dependable, respectful service.',
    iconName: 'BadgeCheck'
  },
  {
    id: 'w5',
    title: 'Community-Friendly',
    description: 'Designed specifically to make HOA living easier, quieter, and more organized for all neighbors.',
    iconName: 'Users'
  },
  {
    id: 'w6',
    title: 'Veteran & Family-Owned',
    description: 'Built on military-grade discipline, integrity, and local Arizona family values.',
    iconName: 'Award',
    badge: 'Veteran & Family Owned'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: '01',
    title: 'We Pick Up',
    description: 'Our team arrives at the scheduled time and moves your trash and recycling cans from your home to the curb.',
    detail: 'Night before or early morning before municipal trucks arrive.',
    icon: 'Truck'
  },
  {
    stepNumber: '02',
    title: 'Your Trash Gets Picked Up',
    description: 'Your HOA’s normal trash service collects your garbage as usual.',
    detail: 'Zero disruption to city or contracted waste hauling services.',
    icon: 'Trash2'
  },
  {
    stepNumber: '03',
    title: 'We Bring Them Back',
    description: 'After collection, Gunny’s Garbage Squad returns your cans safely to their designated location.',
    detail: 'Positioned neatly behind gate or garage according to HOA guidelines.',
    icon: 'RotateCcw'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'HOA Boards',
    question: 'How much does Gunny’s Garbage Squad cost for HOA communities?',
    answer: 'Pricing is simple and transparent: $7.25 a week per home for once-weekly pickup, or $9.75 a week per home for twice-weekly collection. Both plans include full valet service for trash and recycling cans with weekly or consolidated monthly HOA invoicing.'
  },
  {
    category: 'HOA Boards',
    question: 'Do you offer twice-weekly trash can valet collection?',
    answer: 'Yes! We offer a dedicated twice-weekly pickup service priced at just $9.75 a week per home ($9.75/wk). This is ideal for active HOA communities and neighborhoods with high trash volume or twice-weekly municipal pickup schedules.'
  },
  {
    category: 'HOA Boards',
    question: 'How does Gunny’s Garbage Squad partner with an HOA board or property management?',
    answer: 'We customize a community-wide contract or an optional resident opt-in program. We provide a dedicated account manager, resident introductory packets, gated community access protocols, and monthly service verification reports.'
  },
  {
    category: 'HOA Boards',
    question: 'How do you handle gated communities or garage/side-gate access?',
    answer: 'Our team receives secure gate codes, master access keys, or side-gate permissions provided by the HOA or resident. All staff undergo background checks and wear high-visibility branded uniforms.'
  },
  {
    category: 'HOA Boards',
    question: 'What happens during severe Arizona monsoon weather or holidays?',
    answer: 'We mirror your city or municipal trash collection schedule 100%. If trash collection shifts by a day for a holiday, our squad adjusts accordingly. In storm events, we ensure bins are secured properly.'
  },
  {
    category: 'Residents',
    question: 'How much does the trash valet service cost per home?',
    answer: 'Gunny’s Garbage Squad service is $7.25 a week for once-weekly collection, or $9.75 a week for twice-weekly collection. Both plans cover trash and recycling bins safely moved to the curb and returned after pickup.'
  },
  {
    category: 'Residents',
    question: 'Where do you take the cans from and where do you put them back?',
    answer: 'We move bins from your side garage walkway, behind gate, or designated storage area out to the curb. After pickup, we return them to the exact same approved location.'
  },
  {
    category: 'Residents',
    question: 'How can residents request Gunny’s Garbage Squad for our community?',
    answer: 'If your HOA doesn’t have a contract with us yet, you can nominate your community or request an HOA proposal! We will reach out to your HOA Board or Property Management company to introduce our community-wide trash valet services.'
  },
  {
    category: 'Operations',
    question: 'What happens if a bin is damaged or missed?',
    answer: 'Gunny’s carries comprehensive liability insurance and a 100% Satisfaction Guarantee. If a bin is ever missed due to our error, we remediate it immediately at no cost.'
  }
];
