'use client';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function SeoSchema({
  title = 'RC Tech Solutions',
  description = 'We offer cutting-edge web and marketing solutions to help your business grow online.',
  url = 'https://www.rctechsolutions.com',
  breadcrumbs = [],
  additionalSchemas = [],
}) {
  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const structuredData = [jsonLdBreadcrumbs, ...additionalSchemas];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {structuredData?.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

// Prop validation (optional but helpful)
SeoSchema.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  additionalSchemas: PropTypes.arrayOf(PropTypes.object),
};
