import React from 'react'
import { organizationConfig } from '@/config/organization'
import type { LocalBusiness, Organization, ProfessionalService, WithContext } from 'schema-dts'

export const OrganizationSchema: React.FC = () => {
  const organizationSchema: WithContext<Organization | ProfessionalService> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${organizationConfig.url}/#organization`,
    name: organizationConfig.name,
    url: organizationConfig.url,
    logo: `${organizationConfig.url}/favicon.svg`,
    image: `${organizationConfig.url}/favicon.svg`,
    description: organizationConfig.description,
    address: {
      '@type': 'PostalAddress',
      ...organizationConfig.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: organizationConfig.geo.latitude,
      longitude: organizationConfig.geo.longitude,
    },
    telephone: organizationConfig.telephone,
    email: organizationConfig.email,
    priceRange: '$$',
    legalName: organizationConfig.name,
    sameAs: Object.values(organizationConfig.socials),
    knowsAbout: organizationConfig.knowsAbout,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}
