import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://velmora.in';
  const currentDate = new Date().toISOString();

  const publicRoutes = [
    '',
    '/about_us_01',
    '/about_us_02',
    '/listing_01',
    '/listing_02',
    '/listing_03',
    '/listing_04',
    '/listing_05',
    '/listing_06',
    '/listing_07',
    '/listing_08',
    '/listing_09',
    '/listing_10',
    '/listing_11',
    '/listing_12',
    '/listing_13',
    '/listing_14',
    '/listing_15',
    '/listing_16',
    '/listing_17',
    '/listing_details_01',
    '/listing_details_02',
    '/listing_details_03',
    '/listing_details_04',
    '/listing_details_05',
    '/listing_details_06',
    '/project_01',
    '/project_02',
    '/project_03',
    '/project_04',
    '/project_details_01',
    '/agent',
    '/agent_details',
    '/agency',
    '/agency_details',
    '/blog_01',
    '/blog_02',
    '/blog_03',
    '/blog_details',
    '/service_01',
    '/service_02',
    '/service_details',
    '/contact',
    '/faq',
    '/compare',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/listing') ? 0.8 : 0.6,
  }));
}
