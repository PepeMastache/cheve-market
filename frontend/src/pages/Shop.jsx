import { useProducts } from '../hooks/useProducts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

export default function Shop() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useProducts();

  // ✅ Aplanar correctamente los productos de todas las páginas
  const allProducts = data?.pages.flatMap(page => page.products) ?? [];

  if (isLoading) return <p className="text-center py-5">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger py-5">Error al cargar productos</p>;

  return (
    <section className="bg-light">
      <div className="container py-5">
        <h1 className="h1 text-center">Catálogo de Cervezas</h1>
        <p className="text-center text-muted mb-5">Explora nuestra selección completa de productos</p>

       <InfiniteScroll
            dataLength={allProducts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4 className="text-center">Cargando más...</h4>}
            endMessage={<p className="text-center text-muted mt-4">No hay más productos por mostrar.</p>}
            scrollThreshold={0.9} // 👈 asegura que dispare `fetchNextPage()` antes del fondo
            >


          <div className="row">
            {allProducts.map((prod) => (
              <div className="col-md-4 mb-4" key={prod.id}>
                <div className="card h-100">
                   <Link to={`/producto/${prod.slug}`}>
                  <img
                    src={prod.images[0] || 'https://via.placeholder.com/450x300?text=Sin+imagen'}
                    className="card-img-top"
                    alt={prod.name}
                  />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text text-muted mb-2">
                      {prod.brand} – {prod.style}
                    </p>
                    <p className="card-text">
                      <strong>${parseFloat(prod.final_price).toFixed(2)}</strong>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <i
                            key={i}
                            className={`fa fa-star ${i <= Math.round(prod.rating_avg) ? 'text-warning' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <Link to={`/producto/${prod.slug}`} className="btn btn-outline-success">
                        <i className="fas fa-eye"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {isFetchingNextPage && <p className="text-center py-3">Cargando más productos...</p>}
      </div>
    </section>
  );
}
