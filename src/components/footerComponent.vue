<template>
  <footer class="footer">
    <div class="footer-container">
    <!-- Suscripción al boletín -->
     <div class="footer-section">
        <h3>Suscríbete a nuestro boletín</h3>
        <form>
          <input type="email" placeholder="Digite su correo electrónico">
          <button type="submit" class="btn btn-primary">Suscribirse</button>
        </form>
      </div>
      
      <!-- Enlaces de navegación -->
      <div class="footer-section">
        <h3>Navegación</h3>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/faq">Preguntas Frecuentes</a></li>
          <li><a href="/politica-de-privacidad">Política de Privacidad</a></li>
          <li><a href="/terminos-y-condiciones">Términos y Condiciones</a></li>
        </ul>
      </div>    

      <!-- Información de contacto -->
      <div class="footer-section">
        <h3>Contáctanos</h3>
        <p>Dirección: [Dirección]</p>
        <p>Teléfono: [Número de teléfono]</p>
        <p>Email: [Email de contacto]</p>
      </div>

     <!-- Redes sociales -->
    <div class="footer-section">
      <h3>Síguenos</h3>
      <div class="social-icons">
        <a href="#" class="social-icon" title="Facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="social-icon" title="Twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="social-icon" title="Instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="social-icon" title="WhatsApp"><i class="bi bi-whatsapp"></i></a>
      </div>
    </div>

    </div>

    <!-- Información legal -->
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Welker José Pérez Acero. Todos los derechos reservados.</p>
      <p><a href="/cookies-policy">Política de Cookies</a> | <a href="/legal-warning">Aviso Legal</a></p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: $fifth-col;
  color: #fff;
  padding: 30px 0;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  margin:0px 30px;
}

.footer-section h3 {
  margin-bottom: 15px;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #fff;
  text-decoration: none;
}

.social-icons {
  display: flex;
}

.social-icon {
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  margin-right: 10px;
  transition: transform 0.3s ease-in-out;
}

.social-icon:hover {
  transform: scale(1.2);
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
}

.footer-bottom p {
  margin: 5px 0;
}
</style>
