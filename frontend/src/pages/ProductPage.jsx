// src/pages/ProductPage.jsx
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductPage() {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug);

  if (isLoading) return <p className="text-center py-5">Cargando producto...</p>;
  if (error) return <p className="text-center text-danger py-5">Error al cargar producto.</p>;

  return (
    <>
      <Navbar />
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <img
                className="card-img img-fluid"
                src={product.images[0] || 'https://via.placeholder.com/600x400?text=Sin+imagen'}
                alt={product.name}
              />
            </div>
            <div className="col-lg-7 mt-5">
              <h1 className="h2">{product.name}</h1>
              <p>{product.brand} — {product.style}</p>
              <p className="h3">${Number(product.final_price).toFixed(2)}</p>
              <ul className="list-inline">
                <li className="list-inline-item"><strong>Volumen:</strong> {product.volume_ml} ml</li>
                <li className="list-inline-item"><strong>ABV:</strong> {product.abv}%</li>
                <li className="list-inline-item"><strong>Rating:</strong> {product.rating_avg}</li>
              </ul>
              <hr />
              <div className="d-flex gap-2">
                <button className="btn btn-success">Comprar</button>
                <button className="btn btn-outline-dark">Agregar al carrito</button>
                <button className="btn btn-warning">Obtener enlace de afiliado</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
