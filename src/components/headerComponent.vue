<template>
  <header class="navbar-dark bg-dark">
    <div class="d-flex row">
      <!-- Primera fila -->
      <div class="d-flex justify-content-around align-items-center p-3">
        <!-- Logo -->
        <div class="mx-2">
          <img src="../assets/img/logo.svg" width="50" class="image-transition">
        </div>

        <!-- Barra de búsqueda -->
        <form class="input-group px-2">
          <input type="text" class="form-control" placeholder="Buscar productos, marcas y más" />
          <button class="btn btn-outline-light" type="button">Search</button>
        </form>

        <!-- Login -->
        <div class="px-2">
          <button class="btn btn-outline-light">Login</button>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="d-flex align-items-center justify-content-between">
        <!-- Opciones de navegación -->
        <ul class="nav">
          <RouterLink class="nav-item" to="/">
            <button class="btn btn-primary">Products</button>
          </RouterLink>
          <RouterLink class="nav-item" to="/promotions">
            <button class="btn btn-primary">Promotions</button>
          </RouterLink>
          <RouterLink class="nav-item" to="/contact">
            <button class="btn btn-primary">Contact</button>
          </RouterLink>
        </ul>
        <!-- Iconos -->
        <div class="d-flex align-items-center">
          <a href="#" class="icon-link">
            <i class="bi bi-bell-fill icon"></i>
          </a>
          <a href="#" class="icon-link">
            <i class="bi bi-cart-fill icon"></i>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import shoppingCart from './shoppingCartComponent.vue';
export default {
  name: "Menu",

  components: {
    shoppingCart,
  }
};
</script>

<style lang="scss" scoped>
.image-transition {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.image-transition:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.nav-item {
  margin: 10px;
}

.icon-link {
  text-decoration: none;
  background-color: $main-col;
  padding: 8px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $third-col;
}

.icon-link:hover {
  transform: scale(1.2);
  opacity: 0.8;
}
</style>
