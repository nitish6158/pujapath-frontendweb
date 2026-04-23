import { useState } from 'react';
import { useSearchFilter } from '../../application/hooks/useSearchFilter';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';

function VideosPage({ onBook, t, text, videos }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const search = useSearchFilter(videos, (video) => text(video.title));

  return (
    <section className="page-section media-section page-screen">
      <SectionHeader title={t('sectionVideos')}>{t('latestVideos')}</SectionHeader>
      <SearchBar
        value={search.query}
        placeholder={t('searchPlaceholder')}
        onChange={search.setQuery}
      />
      <div className="video-grid">
        {search.filteredItems.map((video) => (
          <VideoCard
            key={video.id}
            item={video}
            onBook={(item) => onBook(item, 'video')}
            onPlay={setActiveVideo}
            t={t}
            text={text}
          />
        ))}
      </div>
      {!search.filteredItems.length ? <p className="empty-state">{t('noResults')}</p> : null}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} t={t} text={text} />
    </section>
  );
}

export default VideosPage;
