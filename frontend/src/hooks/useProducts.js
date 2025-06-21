// src/hooks/useProducts.js
import { useInfiniteQuery } from 'react-query';

export const useProducts = () => {
  return useInfiniteQuery(
    'products',
    async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/products?page=${pageParam}&limit=6`);
      if (!res.ok) throw new Error('Error al cargar productos');
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    }
  );
};
