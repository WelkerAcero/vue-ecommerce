<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Suscripción al boletín -->
      <div class="footer-section">
        <h3>Subscribe to our newsletter</h3>       
          <input type="email" class="form-control" placeholder="Enter your email">
          <br>
          <button class="btn btn-primary">Subscribe</button>        
      </div>

      <!-- Enlaces de navegación -->
      <div class="footer-section">
        <h3>Navigation</h3>
        <ul>
          <li><a href="/">Start</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Frequent questions</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms and Conditions</a></li>
        </ul>
      </div>

      <!-- Información de contacto -->
      <div class="footer-section">
        <h3>Contact us</h3>
        <p>Address: [Address]</p>
        <p>Phone: [Phone]</p>
        <p>E-mail: [E-mail]</p>
      </div>

      <!-- Redes sociales -->
      <div class="footer-section">
        <h3>Follow us</h3>
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
      <p>&copy; {{ new Date().getFullYear() }} Welker José Pérez Acero. All rights reserved.</p>
      <p><a href="#">Cookies policy</a> | <a href="#">Legal warning</a></p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: $fifth-col;
  color: $light-text;
  padding: 30px 0;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  margin: 0px 30px;
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
  color: $light-text;
  text-decoration: none;
}

.social-icons {
  display: flex;
}

.social-icon {
  color: $light-text;
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
