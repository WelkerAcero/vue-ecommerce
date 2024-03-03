<template>
  <header class="navbar-dark bg-dark">
    <div class="d-flex row">

      <div class="d-flex justify-content-around align-items-center p-3 hea--component">
        <div class="mx-2">
          <img src="../assets/img/logo.svg" width="50" class="image-transition">
        </div>
        <form class="input-group px-2 hea--search">
          <input type="text" class="form-control" placeholder="Search products, brands and more" />
          <button class="btn btn-outline-light" type="button">Search</button>
        </form>
        <div class="px-2">
          <button class="btn btn-outline-light">Login</button>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between">
        <ul class="nav">
          <RouterLink class="nav-item" to="/" :class="{ 'active': $route.path === '/' }">
            <button class="btn btn-primary">Products</button>
          </RouterLink>
          <RouterLink class="nav-item" to="/promotions" :class="{ 'active': $route.path === '/promotions' }">
            <button class="btn btn-primary">Promotions</button>
          </RouterLink>
          <RouterLink class="nav-item" to="/contact" :class="{ 'active': $route.path === '/contact' }">
            <button class="btn btn-primary">Contact</button>
          </RouterLink>
        </ul>
        <div class="d-flex align-items-center">
          <a href="#" class="icon-link">
            <i class="bi bi-bell-fill icon"></i>
          </a>
          <shoppingCart :is-visible="isCartVisible" @toggleCart="toggleCartVisibility" :objAdded="itemsAdded"/>
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
  },
  props: {
      itemsAdded: Array,
      cerrar: Boolean, 
    }, 
  data() {
    return {
      isCartVisible: false,
    }
  },
  methods: {
    toggleCartVisibility() {
      this.isCartVisible = !this.isCartVisible;
      console.log("cerrar desde header", this.cerrar);
      this.$emit('toggleCart',this.cerrar);
    },   
  },
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

.active {
  border: 2px solid white;
  border-radius: 5px;
}

@media(max-width: 700px) {
  .hea--component {
    display: flex;
    flex-wrap: wrap;
  }

  .hea--search {
    margin: 10px;
  }
}
</style>
