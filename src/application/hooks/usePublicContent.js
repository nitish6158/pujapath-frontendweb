import { useCallback, useEffect, useState } from 'react';
import {
  astrologyExperts as fallbackAstrologyExperts,
  astrologyFlow as fallbackAstrologyFlow,
  astrologyServices as fallbackAstrologyServices,
  astrologyTopics as fallbackAstrologyTopics,
  blogs as fallbackBlogs,
  bookingHighlights as fallbackBookingHighlights,
  heroSlides as fallbackHeroSlides,
  protectionServices as fallbackProtectionServices,
  serviceCategories as fallbackServices,
  videos as fallbackVideos,
} from '../../domain/content';
import { normalizeContentItem } from '../../infrastructure/api/contentMappers';
import { pujaPathApi } from '../../infrastructure/api/pujaPathApi';

const fallbackContent = {
  heroSlides: fallbackHeroSlides,
  bookingHighlights: fallbackBookingHighlights,
  services: fallbackServices,
  astrologyServices: fallbackAstrologyServices,
  protectionServices: fallbackProtectionServices,
  videos: fallbackVideos,
  blogs: fallbackBlogs,
  astrologyTopics: fallbackAstrologyTopics,
  astrologyExperts: fallbackAstrologyExperts,
  astrologyFlow: fallbackAstrologyFlow,
  featuredPosts: [],
};

const mapItems = (items = []) => items.map(normalizeContentItem);

const mapFeaturedPostToHeroSlide = (item) => ({
  id: item.contentId || item.id,
  contentId: item.contentId || item.id,
  type: 'hero-slide',
  title: item.title,
  summary: item.summary,
  image: item.image,
  price: item.price,
  status: item.status,
  theme: item.theme || 'light',
  eyebrow: item.note || item.eyebrow || null,
  accent: item.accent || '',
  ctaLabel: item.ctaLabel || '',
  placement: item.placement || '',
  embedUrl: item.embedUrl || '',
  youtubeUrl: item.youtubeUrl || '',
});

export function usePublicContent() {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [homeResponse, topicsResponse, expertsResponse, flowResponse, featuredResponse] =
        await Promise.all([
          pujaPathApi.getHomeContent(),
          pujaPathApi.getContentByType('astrology-topic'),
          pujaPathApi.getContentByType('astrology-expert'),
          pujaPathApi.getContentByType('astrology-flow'),
          pujaPathApi.getContentByType('featured-post'),
        ]);

      const featuredPosts = mapItems(featuredResponse.data.items);
      const featuredHeroSlides = featuredPosts
        .filter((item) => item.status === 'active' && item.placement === 'Home Hero First Slide')
        .map(mapFeaturedPostToHeroSlide);
      const baseHeroSlides = mapItems(homeResponse.data.heroSlides).filter(
        (item) => !featuredHeroSlides.some((featuredItem) => featuredItem.contentId === item.contentId),
      );

      setContent({
        heroSlides: [...featuredHeroSlides, ...baseHeroSlides],
        bookingHighlights: mapItems(homeResponse.data.bookingHighlights),
        services: mapItems(homeResponse.data.services),
        astrologyServices: mapItems(homeResponse.data.astrologyServices),
        protectionServices: mapItems(homeResponse.data.protectionServices),
        videos: mapItems(homeResponse.data.videos),
        blogs: mapItems(homeResponse.data.blogs),
        astrologyTopics: mapItems(topicsResponse.data.items),
        astrologyExperts: mapItems(expertsResponse.data.items),
        astrologyFlow: mapItems(flowResponse.data.items),
        featuredPosts,
      });
    } catch (requestError) {
      setError(requestError.message || 'Unable to load live content');
      setContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    ...content,
    error,
    loading,
    reload: loadContent,
  };
}
