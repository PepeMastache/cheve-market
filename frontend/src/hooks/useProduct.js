// src/hooks/useProduct.js
import { useQuery } from 'react-query';

export const useProduct = (slug) => {
  return useQuery(['product', slug], async () => {
    const res = await fetch(`/api/products/${slug}`);
    if (!res.ok) throw new Error('No se pudo cargar el producto');
    return res.json();
  });
};
