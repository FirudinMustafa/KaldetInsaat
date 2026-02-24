import React from "react"

interface OrganizationSchemaProps {
  name: string
  url: string
  logo: string
  description: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint?: {
    telephone: string
    email: string
  }
  sameAs?: string[]
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  address,
  contactPoint,
  sameAs,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    description,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...contactPoint,
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: "Turkish",
      },
    }),
    ...(sameAs && { sameAs }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface LocalBusinessSchemaProps extends OrganizationSchemaProps {
  priceRange?: string
  openingHours?: string[]
}

export function LocalBusinessSchema(props: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: props.name,
    url: props.url,
    logo: props.logo,
    description: props.description,
    ...(props.address && {
      address: {
        "@type": "PostalAddress",
        ...props.address,
      },
    }),
    ...(props.contactPoint && {
      telephone: props.contactPoint.telephone,
      email: props.contactPoint.email,
    }),
    ...(props.priceRange && { priceRange: props.priceRange }),
    ...(props.openingHours && { openingHoursSpecification: props.openingHours }),
    ...(props.sameAs && { sameAs: props.sameAs }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url?: string
  }
  publisher: {
    name: string
    logo: string
  }
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      logo: {
        "@type": "ImageObject",
        url: publisher.logo,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ProjectSchemaProps {
  name: string
  description: string
  image: string[]
  startDate?: string
  endDate?: string
  location?: string
  client?: string
}

export function ProjectSchema({
  name,
  description,
  image,
  startDate,
  endDate,
  location,
  client,
}: ProjectSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Project",
    name,
    description,
    image,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(location && {
      location: {
        "@type": "Place",
        name: location,
      },
    }),
    ...(client && {
      customer: {
        "@type": "Organization",
        name: client,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
