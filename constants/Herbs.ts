export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  benefits: string[];
  usage: string;
  precautions: string;
  image: string;
}

export const HERBS: Herb[] = [
  {
    id: '1',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    category: 'Anti-inflammatory',
    description: 'Turmeric is a flowering plant of the ginger family. Its roots are used in cooking and traditional medicine for their powerful anti-inflammatory properties.',
    benefits: ['Reduces inflammation', 'Powerful antioxidant', 'Boosts brain function', 'May lower risk of heart disease'],
    usage: 'Commonly consumed as a spice in foods or as a supplement. Turmeric tea is also popular.',
    precautions: 'High doses can act as a blood thinner. Use with caution before surgery.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Digestive',
    description: 'Ginger is a widely used spice and medicinal herb known for its spicy aroma and its ability to soothe digestive issues.',
    benefits: ['Relieves nausea', 'Aids digestion', 'Reduces muscle pain', 'Lower blood sugar'],
    usage: 'Can be used fresh, dried, powdered, or as an oil or juice.',
    precautions: 'May cause mild side effects like heartburn or diarrhea if consumed in excess.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Peppermint',
    scientificName: 'Mentha piperita',
    category: 'Digestive',
    description: 'Peppermint is a hybrid mint, a cross between watermint and spearmint. It is widely used for its cooling sensation and digestive benefits.',
    benefits: ['Relieves digestive symptoms', 'Reduces headaches', 'Improves focus', 'Clears sinuses'],
    usage: 'Often consumed as tea or used as an essential oil.',
    precautions: 'May worsen GERD or acid reflux in some individuals.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e184f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    category: 'Immune Support',
    description: 'Echinacea is a group of flowering plants in the daisy family, widely used as an herbal remedy to prevent or treat the common cold.',
    benefits: ['Boosts immune system', 'Reduces cold duration', 'Anti-inflammatory', 'Antioxidant properties'],
    usage: 'Usually taken as a tea, juice, or supplement at the first sign of a cold.',
    precautions: 'People with autoimmune disorders should consult a doctor before use.',
    image: 'https://images.unsplash.com/photo-1596708027732-261ba1019036?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    category: 'Calming',
    description: 'Lavender is a versatile herb known for its beautiful scent and its ability to promote relaxation and sleep.',
    benefits: ['Reduces anxiety', 'Improves sleep quality', 'Soothes skin irritations', 'Alleviates headaches'],
    usage: 'Used in aromatherapy, as tea, or applied topically as an essential oil.',
    precautions: 'Essential oil should be diluted before topical application.',
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fba?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Ginseng',
    scientificName: 'Panax ginseng',
    category: 'Energy',
    description: 'Ginseng is a root known for its adaptogenic properties, helping the body manage stress and boost energy levels.',
    benefits: ['Increases energy', 'Reduces stress', 'Improves cognitive function', 'Anti-inflammatory'],
    usage: 'Can be eaten raw, steamed, or taken as an extract or supplement.',
    precautions: 'May interfere with certain medications, including blood thinners and diabetes drugs.',
    image: 'https://images.unsplash.com/photo-1627830601323-95696d5a11c1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    category: 'Calming',
    description: 'Chamomile is one of the most ancient medicinal herbs known to mankind. It is famous for its mild sedative properties.',
    benefits: ['Promotes sleep', 'Reduces anxiety', 'Aids digestion', 'Soothes skin'],
    usage: 'Most commonly consumed as a herbal tea.',
    precautions: 'People with severe allergies to daisies or ragweed should use with caution.',
    image: 'https://images.unsplash.com/photo-1515699503431-22bbf5ef1118?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '8',
    name: 'Holy Basil',
    scientificName: 'Ocimum tenuiflorum',
    category: 'Adaptogen',
    description: 'Also known as Tulsi, Holy Basil is a sacred plant in India, prized for its ability to help the body adapt to stress.',
    benefits: ['Reduces stress and anxiety', 'Supports heart health', 'Boosts immunity', 'Anti-inflammatory'],
    usage: 'Leaves can be used fresh in cooking or brewed as a tea.',
    precautions: 'May lower blood sugar; use caution if taking diabetes medication.',
    image: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '9',
    name: 'Rosemary',
    scientificName: 'Salvia rosmarinus',
    category: 'Cognitive',
    description: 'Rosemary is a fragrant evergreen herb native to the Mediterranean. It is used as a culinary spice and for its potential to improve memory.',
    benefits: ['Improves memory and focus', 'Rich in antioxidants', 'Supports digestion', 'Hair growth'],
    usage: 'Used fresh or dried in cooking, or as an essential oil.',
    precautions: 'In large amounts, may cause vomiting or skin sensitivity.',
    image: 'https://images.unsplash.com/photo-1515471209610-dae1c9a581c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '10',
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    category: 'Adaptogen',
    description: 'Ashwagandha is an ancient medicinal herb classified as an adaptogen, which means it can help your body manage stress.',
    benefits: ['Reduces stress and anxiety', 'Improves strength', 'Boosts brain function', 'Lowers blood sugar'],
    usage: 'Usually taken in powder form mixed with water or milk, or as a supplement.',
    precautions: 'Not recommended for pregnant women or people with thyroid conditions without medical advice.',
    image: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?q=80&w=800&auto=format&fit=crop',
  },
];
