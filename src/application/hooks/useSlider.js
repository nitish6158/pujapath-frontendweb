import { useEffect, useState } from 'react';

export function useSlider(items, intervalMs = 6000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = items.length;

  useEffect(() => {
    if (totalItems < 2) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalItems);
    }, intervalMs);

    return () => window.clearInterval(timerId);
  }, [intervalMs, totalItems]);

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
    activeItem: items[activeIndex],
    goToNext,
    goToPrevious,
    goToSlide,
  };
}
