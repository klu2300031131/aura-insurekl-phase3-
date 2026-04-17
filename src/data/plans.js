export const PLANS = [
  {
    id: 'nano',
    name: 'Nano Cover (Poor/Entry)',
    price: '₹9',
    interval: 'week',
    color: 'var(--text-secondary)',
    features: ['Active 6 PM - 10 PM', 'Severe Risk Only', 'Est. Payout: ₹50 - ₹100']
  },
  {
    id: 'basic',
    name: 'Basic Cover',
    price: '₹20',
    interval: 'week',
    color: 'var(--accent-blue)',
    features: ['Active 12 PM - 11 PM', 'Medium Risk Coverage', 'Est. Payout: ₹150 - ₹250']
  },
  {
    id: 'standard',
    name: 'Standard Cover',
    price: '₹35',
    interval: 'week',
    color: 'var(--accent-cyan)',
    isPopular: true,
    features: ['Active 24/7 during shifts', 'High Risk Coverage', 'Est. Payout: ₹300 - ₹500']
  },
  {
    id: 'premium',
    name: 'Premium Cover',
    price: '₹50',
    interval: 'week',
    color: 'var(--accent-violet)',
    features: ['Active 24/7 (No limits)', 'Maximum Risk Coverage', 'Est. Payout: ₹600 - ₹1000']
  },
  {
    id: 'enterprise',
    name: 'Pro Guild Cover',
    price: '₹120',
    interval: 'week',
    color: 'var(--accent-yellow)',
    features: ['Guaranteed daily income limit', 'All weather + Traffic delays', 'Est. Payout: ₹1200+ / day']
  }
];
