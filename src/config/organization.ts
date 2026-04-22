import { getServerSideURL } from '@/utilities/getURL'

export const organizationConfig = {
  name: 'Drive D',
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
    // facebook: 'REPLACE_WITH_FACEBOOK_URL',
  },
  knowsAbout: [
    'Creative Technology',
    'Interactive Campaigns',
    'Gamification',
    'AI SEO',
    'Digital Experiences',
  ],
}
