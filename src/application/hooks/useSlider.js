import { useEffect, useMemo, useState } from 'react';

export function useSlider(items, intervalMs = 6000, getSlideIntervalMs) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = items.length;
  const activeItem = items[activeIndex];

  const activeIntervalMs = useMemo(() => {
    if (typeof getSlideIntervalMs !== 'function') {
      return intervalMs;
    }

    return getSlideIntervalMs(activeItem, activeIndex) || intervalMs;
  }, [activeIndex, activeItem, getSlideIntervalMs, intervalMs]);

  useEffect(() => {
    if (totalItems < 2) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalItems);
    }, activeIntervalMs);

    return () => window.clearTimeout(timerId);
  }, [activeIntervalMs, activeIndex, totalItems]);

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % totalItems);
  };

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return {
    activeIndex,
    activeItem,
    goToNext,
    goToPrevious,
    goToSlide,
  };
}
