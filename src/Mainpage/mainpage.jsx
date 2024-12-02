import React from 'react';
import './mainpage.css'; // Asegúrate de que la ruta de tu archivo de estilos sea correcta

const MainPage = () => {
  return (
    <>
      
        
        <img class="principal" src="img/principal1.jpg" alt="Imagen de Promoción Principal" />
      

      {/* Sección de promociones bomba */}
      <section className="promociones-bomba">
        <h2>¡Promos Bomba por Tiempo Limitado!</h2>
        <div className="productos">
          <img src="img/bomba1.jpg" alt="Bomba1" />
          <img src="img/bomba2.jpg" alt="Bomba2" />
          <img src="img/bomba3.jpg" alt="Bomba3" />
        </div>
      </section>

      {/* Computo */}
      <section className="computo">
        <img src="img/computo.jpg" alt="PromoComputo" width="1300px" height="100px" />
      </section>

      {/* Categorías de navegación */}
      <section className="nav2">
        <nav className="categorias">
          <a href="#">Tablets</a>
          <a href="#">Laptops</a>
          <a href="#">Monitores</a>
          <a href="#">PC Armadas</a>
          <a href="#">Componentes</a>
          <a href="#">Accesorios Gamer</a>
          <a href="#">Impresoras</a>
          <a href="#">Software</a>
          <a href="#">Accesorios</a>
        </nav>
      </section>

      {/* Sección de productos */}
      <section className="seccion-computo">
        <div className="productos">
          <article className="producto">
            <img src="img/producto1.jpg" alt="ipad" width="100px" height="100px" />
            <h3>APPLE</h3>
            <p>iPad (10ma Gen) 10.9" WiFi, 64GB, 4GB ram</p>
            <p className="precio">s/1599.90</p>
            <p className="precio-antiguo">Antes: S/2499.90</p>
          </article>
          <article className="producto">
            <img src="img/producto2.jpg" alt="asus" width="100px" height="100px" />
            <h3>ASUS</h3>
            <p>Consola Portatil Asus Rog Ally</p>
            <p className="precio">s/3599.90</p>
          </article>
          <article className="producto">
            <img src="img/producto3.jpg" alt="samsung" width="100px" height="100px" />
            <h3>SAMSUNG</h3>
            <p>Monitor Plano Samsung 24 Pulgadas</p>
            <p className="precio">s/365.90</p>
            <p className="precio-antiguo">Antes: S/889.90</p>
          </article>
          <article className="producto">
            <img src="img/producto4.jpg" alt="apple" width="100px" height="100px" />
            <h3>APPLE</h3>
            <p>Macbook Air 13 Pulgadas</p>
            <p className="precio">s/3399.90</p>
            <p className="precio-antiguo">Antes: S/3599.90</p>
          </article>
          <article className="producto">
            <img src="img/producto5.jpg" alt="lenovo" width="100px" height="100px" />
            <h3>LENOVO</h3>
            <p>iPad (10ma Gen) 10.9" WiFi, 64GB, 4GB ram</p>
            <p className="precio">s/1599.90</p>
            <p className="precio-antiguo">Antes: S/2499.90</p>
          </article>
        </div>
      </section>

      {/* Imágenes flexibles */}
      <section className="flex1">
        <img className="imgflex" src="img/flex11.jpg" alt="outlet" />
        <img className="imgflex" src="img/flex12.jpg" alt="jbl" />
        <img className="imgflex" src="img/flex13.jpg" alt="monitores" />
        <img className="imgflex" src="img/flex14.jpg" alt="gamer" />
        <img className="imgflex" src="img/flex15.jpg" alt="impresoras" />
        <img className="imgflex" src="img/flex16.jpg" alt="detodo" />
      </section>

      <section className="flex2">
        <img className="imgflex2" src="img/flex21.jpg" alt="comprarecoge" />
        <img className="imgflex2" src="img/flex22.jpg" alt="envuogratis" />
        <img className="imgflex2" src="img/flex23.jpg" alt="cuotas" />
        <img className="imgflex2" src="img/flex24.jpg" alt="armapc" />
      </section>

      
      {/* Footer */}
      <footer className="footer">
        <div className="footer__contenedor">
          {/* Footer content aquí */}
          {/* El contenido ya proporcionado de tu footer */}
        </div>
      </footer>
    </>
  );
};

export default MainPage;
