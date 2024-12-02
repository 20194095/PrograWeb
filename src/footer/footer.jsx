import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__contenedor">
        {/* Logo y suscripción */}
        <div className="footer__top">
          <div className="footer__logo">
            <img src="img/imgFoot/logoCoolbox.svg" alt="Coolbox Logo" />
          </div>
          <div className="footer__iconos">
            <img src="img/imgFoot/facebook-icon.svg" alt="Facebook" />
            <img src="img/imgFoot/instagram-icon.svg" alt="Instagram" />
            <img src="img/imgFoot/youtube-icon.svg" alt="YouTube" />
            <img src="img/imgFoot/tiktok-icon.svg" alt="TikTok" />
          </div>
          <div className="footer__newsletter">
            <p>¡Suscríbete a nuestro newsletter y recibe las mejores ofertas!</p>
            <form>
              <input type="email" placeholder="Correo electrónico" />
              <button type="submit">Suscribirme</button>
            </form>
            <label>
              <input type="checkbox" />
              He leído y acepto los <a href="#terminos">Términos y condiciones</a> y la{' '}
              <a href="#privacidad">Política de Privacidad</a>
            </label>
          </div>
        </div>

        {/* Secciones del footer */}
        <div className="footer__sections">
          <div className="footer__column">
            <h3>Nuestra Compañía</h3>
            <ul>
              <li>Sobre Nosotros</li>
              <li>Tiendas Urban Rider</li>
              <li>
                <button className="botonVentas">Buscar Tiendas Coolbox</button>
              </li>
              <p>Métodos de pago </p>
              <img src="img/imgFoot/metodospago.jpeg" alt="Métodos de pago" width="250" height="60" />
              <p>Realiza tus compras de forma segura</p>
              <img src="img/imgFoot/vtex-icon.svg" alt="Realiza tus compras de forma segura" width="50" height="20" />
            </ul>
          </div>
          <div className="footer__columna">
            <h3>Servicios al Cliente</h3>
            <ul>
              <li>Canales de atención</li>
              <li>Compra fácil y seguro</li>
              <li>Métodos de pago</li>
              <li>Protocolos Delivery</li>
              <li>Factura Electrónica</li>
              <li>Certificado de Garantía</li>
              <li>Política de Cambios y Devoluciones</li>
              <li>Términos y Condiciones</li>
              <li>Políticas de Privacidad</li>
              <li>Política de Uso de Cookies</li>
              <li>Vende con nosotros</li>
            </ul>
          </div>
          <div className="footer__columna">
            <h3>Te informamos</h3>
            <ul>
              <li>Retiro en Tienda</li>
              <li>Información Delivery a Provincias</li>
              <li>Información de Tiendas</li>
              <li>Arma tu PC</li>
              <li>Cyberwow</li>
              <li>Cooldays</li>
              <li>Cases y Micas</li>
              <li>Stock de productos</li>
              <li>Audífonos</li>
              <li>Celulares</li>
              <li>Cómputo</li>
            </ul>
          </div>
          <div className="footer__columna">
            <h3>Atención al Cliente</h3>
            <p>+01 712 - 3212</p>
            <p>Lun. - Sáb. de 9:00 am a 6:00 pm</p>
            <p>serviciocliente@rashperu.com</p>
            <p>gerenciadeatencionalcliente@rashperu.com</p>
            <img src="img/imgFoot/libro-reclamaciones.jpeg" alt="Libro de Reclamaciones" width="100" height="70" />
            <p>RUC: 20378890161</p>
            <p>Razón social: Rash Perú S.R.L.</p>
          </div>
          <div className="footer__columna">
            <h3>Ventas Corporativas</h3>
            <ul>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 945 466 728
              </li>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 938 632 283
              </li>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 942 821 966
              </li>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 996 192 017
              </li>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 996 192 014
              </li>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 954 050 318
              </li>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 954 050 517
              </li>
              <li>
                <img src="img/imgFoot/whatsapp-white-icon.png" alt="Whatsapp" width="25" height="25" /> 986 129 963
              </li>
            </ul>
            <p>ventascoolbox@rashperu.com</p>
            <button className="botonVentas">Ventas Personalizadas</button>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="footer__inferior">
          <p>© 2024 Coolbox. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
