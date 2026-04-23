import PujaServicesSection from '../components/PujaServicesSection';

function ServicesPage({ onBook, onDetails, services, t, text }) {
  return (
    <PujaServicesSection
      isStandalone
      onBook={onBook}
      onDetails={onDetails}
      services={services}
      t={t}
      text={text}
    />
  );
}

export default ServicesPage;
