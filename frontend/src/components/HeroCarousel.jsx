// src/components/HeroCarousel.jsx
export default function HeroCarousel() {
  return (
    <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img
                  className="img-fluid"
                  src="https://via.placeholder.com/500x400?text=Cerveza+1"
                  alt="Primera imagen"
                />
              </div>
              <div className="col-lg-6 mb-0 d-flex align-items-center">
                <div className="text-align-left align-self-center">
                  <h1 className="h1 text-success"><b>Cheve</b> Market</h1>
                  <h3 className="h2">Descubre las mejores cervezas</h3>
                  <p>Bienvenido a tu tienda de cervezas artesanales e internacionales.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Puedes duplicar esta sección para más slides */}
      </div>
      <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
        <i className="fas fa-chevron-left"></i>
      </a>
      <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
        <i className="fas fa-chevron-right"></i>
      </a>
    </div>
  );
}
