// src/components/FeaturedProducts.jsx
import { useAllProducts } from '../hooks/useAllProducts';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useAllProducts();
  const featured = products?.slice(0, 3) ?? [];

  if (isLoading) return <p className="text-center py-5">Cargando productos...</p>;
  if (error) return <p className="text-center py-5 text-danger">Error al cargar productos</p>;
  if (featured.length === 0) return null;

  return (
    <section className="bg-light">
      <div className="container py-5">
        <div className="row text-center py-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Productos Destacados</h1>
            <p>Explora una selección curada de cervezas populares.</p>
          </div>
        </div>
        <div className="row">
          {featured.map((prod) => (
            <div className="col-12 col-md-4 mb-4" key={prod.id}>
              <div className="card h-100">
                <Link to={`/producto/${prod.slug}`}>
                  <img
                    src={prod.images?.[0] || 'https://via.placeholder.com/450x300?text=Sin+imagen'}
                    className="card-img-top"
                    alt={prod.name}
                  />
                </Link>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <i
                          key={i}
                          className={`fa fa-star ${i <= Math.round(prod.rating_avg) ? 'text-warning' : 'text-muted'}`}
                        ></i>
                      ))}
                    </li>
                    <li className="text-muted text-right">
                      {prod.final_price
                        ? `$${parseFloat(prod.final_price).toFixed(2)}`
                        : 'Precio no disponible'}
                    </li>
                  </ul>
                  <Link to={`/producto/${prod.slug}`} className="h2 text-decoration-none text-dark">
                    {prod.name}
                  </Link>
                  <p className="card-text">{prod.brand} - {prod.style}</p>
                  <p className="text-muted">Vol: {prod.volume_ml} ml | ABV: {prod.abv}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
