import { useMemo, useState } from 'react';

export function useSearchFilter(items, getSearchText) {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      getSearchText(item)
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [getSearchText, items, query]);

  return {
    filteredItems,
    query,
    setQuery,
  };
}
