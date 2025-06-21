import { useQuery } from 'react-query';

export const useAllProducts = () => {
  return useQuery('all-products', async () => {
    const res = await fetch('/api/products/all'); // endpoint sin paginación
    if (!res.ok) throw new Error('Error al cargar productos');
    const data = await res.json();
    return data.products;
  });
};
