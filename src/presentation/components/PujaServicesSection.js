import { useSearchFilter } from '../../application/hooks/useSearchFilter';
import ContentCard from './ContentCard';
import SearchBar from './SearchBar';
import SectionHeader from './SectionHeader';

function PujaServicesSection({ isStandalone = false, onBook, onDetails, onViewAll, services, t, text }) {
  const search = useSearchFilter(services, (service) => text(service.title));

  return (
    <section className={`page-section ${isStandalone ? 'page-screen' : ''}`} id="services">
      <div className="section-title-row">
        <SectionHeader title={t('sectionServices')}>{t('heroSubtitle')}</SectionHeader>
        {onViewAll ? (
          <button className="ghost-button" type="button" onClick={onViewAll}>
            {t('viewAll')}
          </button>
        ) : null}
      </div>

      {isStandalone ? (
        <SearchBar
          value={search.query}
          placeholder={t('searchPlaceholder')}
          onChange={search.setQuery}
        />
      ) : null}

      <div className="card-grid">
        {search.filteredItems.map((service) => (
          <ContentCard
            key={service.id}
            item={service}
            onBook={(item) => onBook(item, 'service')}
            onDetails={onDetails}
            t={t}
            text={text}
          />
        ))}
      </div>
      {!search.filteredItems.length ? <p className="empty-state">{t('noResults')}</p> : null}
    </section>
  );
}

export default PujaServicesSection;
