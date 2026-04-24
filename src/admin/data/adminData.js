export const adminCredentials = {
  email: 'admin@pujapath.com',
  password: 'admin123',
};

export const bookingStatusOptions = ['pending', 'confirmed', 'cancelled', 'follow-up'];

export const adminBookings = [
  {
    id: 'BK-1001',
    type: 'Puja',
    serviceName: 'Kaal Sarp Dosh Puja',
    name: 'Rohit Sharma',
    mobile: '+91 98765 43210',
    city: 'Ujjain',
    date: '2026-05-04',
    amount: '₹7,100',
    status: 'pending',
    message: 'Need puja at temple with family sankalp.',
  },
  {
    id: 'BK-1002',
    type: 'Astrology',
    serviceName: 'Kundli / Muhurat / Consultation',
    name: 'Priya Verma',
    mobile: '+91 91234 56780',
    city: 'Bhopal',
    date: '2026-05-08',
    amount: '₹999',
    status: 'confirmed',
    message: 'Need marriage muhurat and kundli review.',
  },
  {
    id: 'BK-1003',
    type: 'Puja',
    serviceName: 'Rudrabhishek',
    name: 'Amit Jain',
    mobile: '+91 99887 77665',
    city: 'Indore',
    date: '2026-05-10',
    amount: '₹5,100',
    status: 'follow-up',
    message: 'Online sankalp with family names.',
  },
  {
    id: 'BK-1004',
    type: 'Support',
    serviceName: 'Contact Enquiry',
    name: 'Sneha Patel',
    mobile: '+91 90000 11122',
    city: 'Delhi',
    date: '2026-05-11',
    amount: '-',
    status: 'pending',
    message: 'Asked for pandit availability for griha pravesh.',
  },
];

export const adminContacts = [
  {
    id: 'CT-501',
    name: 'Manish Gupta',
    mobile: '+91 98700 11111',
    city: 'Mumbai',
    status: 'pending',
    message: 'Need support for booking date change.',
  },
  {
    id: 'CT-502',
    name: 'Kavita Rao',
    mobile: '+91 98440 22222',
    city: 'Bengaluru',
    status: 'resolved',
    message: 'Asked about language support.',
  },
];

export const adminFeaturedPosts = [
  {
    id: 'FP-101',
    title: 'Tantra Badha Nivaran Sadhana',
    note: 'Adesh Gurudev',
    summary:
      'Top white hero section for tantra badha nivaran guidance, spiritual support, and shanti-focused messaging on the home screen.',
    price: '₹2,100 onwards',
    image: 'Uploaded',
    placement: 'Home Hero First Slide',
    status: 'active',
  },
];

export const adminStats = [
  { id: 'bookings', label: 'Total Bookings', value: '42' },
  { id: 'pending', label: 'Pending Requests', value: '11' },
  { id: 'confirmed', label: 'Confirmed', value: '24' },
  { id: 'content', label: 'Content Items', value: '38' },
];
