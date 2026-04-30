import { getServerSideURL } from '@/utilities/getURL'

export const organizationConfig = {
  name: 'Drive D',
  alternateName: ['Drive D Studio', 'DriveD', 'Drive D co', 'ไดรฟ์ ดี'], // Add this line
  url: getServerSideURL(),
  description:
    'Drive D is a creative technology studio in Bangkok, Thailand, specializing in interactive campaigns, gamification, AI SEO, and digital experiences for Gen Z audiences.',
  address: {
    streetAddress: '6/1 Phahon Yothin 7',
    addressLocality: 'Phaya Thai',
    addressRegion: 'Bangkok',
    postalCode: '10400',
    addressCountry: 'TH',
  },
  geo: {
    latitude: '13.782716188130216',
    longitude: '100.54109610674188',
  },
  telephone: '+66-96-715-2255',
  email: 'hello@drived.co',
  socials: {
    linkedin: 'https://www.linkedin.com/company/drive-d-co/',
    instagram: 'https://www.instagram.com/drived.co',
    clutch: 'https://clutch.co/profile/drive-d',
    // facebook: 'https://www.facebook.com/drived.co',
  },
  knowsAbout: [
    'Creative Technology',
    'Interactive Campaigns',
    'Gamification',
    'AI SEO',
    'Digital Experiences',
  ],
}
