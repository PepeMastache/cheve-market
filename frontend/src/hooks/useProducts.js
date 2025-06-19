// src/hooks/useProducts.js
import { useQuery } from 'react-query'

export const useProducts = () => {
  return useQuery('products', async () => {
    const res = await fetch('/api/products')  
    if (!res.ok) throw new Error('Error al cargar productos')
    return res.json()
  })
}
