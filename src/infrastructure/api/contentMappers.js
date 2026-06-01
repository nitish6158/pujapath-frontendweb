export function normalizeContentItem(item) {
  const meta = item?.meta || {};
  const derivedTitle = item?.title || meta.label || meta.name || null;
  const derivedSummary = item?.summary || meta.summary || meta.eyebrow || meta.expertise || null;

  return {
    ...meta,
    ...item,
    id: item?.contentId || item?._id,
    dbId: item?._id || '',
    contentId: item?.contentId || '',
    title: derivedTitle,
    summary: derivedSummary,
    description: item?.description || meta.message || null,
    image: item?.image || meta.image || '',
    price: item?.price || meta.price || '',
    duration: item?.duration || meta.duration || null,
    location: item?.location || meta.location || null,
    benefits: item?.benefits || meta.benefits || null,
    label: meta.label || derivedTitle,
    name: meta.name || derivedTitle,
    expertise: meta.expertise || derivedSummary,
    experience: meta.experience || item?.duration || null,
    languages: meta.languages || item?.location || null,
    note: meta.note || null,
    placement: meta.placement || '',
    ctaLabel: meta.ctaLabel || '',
    theme: meta.theme || '',
    eyebrow: meta.note || derivedSummary || null,
    embedUrl: meta.embedUrl || '',
    youtubeUrl: meta.youtubeUrl || '',
    accent: meta.accent || '',
    status: item?.status || 'active',
  };
}

export function normalizeBookingItem(item) {
  return {
    ...item,
    id: item?.bookingCode || item?._id,
    dbId: item?._id || '',
  };
}

export function normalizeContactItem(item) {
  return {
    ...item,
    id: item?.contactCode || item?._id,
    dbId: item?._id || '',
  };
}
