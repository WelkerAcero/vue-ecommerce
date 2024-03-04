<template>
  <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme }">
    <headerComponent :itemsAdded="itemStoredInCart" @removeItem="removeItemFromCart" @clearCart="clearCart"/>
    <div class="d-flex justify-content-end">
      <button @click="toggleTheme" style="border-radius: 20px; margin: 5px;width: 200px; position: relative;">
        <i :class="isDarkTheme ? 'bi bi-lightbulb-off-fill' : 'bi bi-lightbulb-fill custom-icon'"></i>
        {{ isDarkTheme ? 'Darken' : 'Clarify' }}
      </button>
    </div>
    <br>
    <div class="d-flex">
      <!-- <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div> -->
      <div class="categories-column">
        <h3 class="pt-5">Filters</h3>
        <hr>
        <div>
          <label for="categorySelect" class="form-label">Categories</label>
          <select id="categorySelect" class="form-select" v-model="selectedCategory" @click="applyFilters"
            style="width:12rem;">
            <option selected :value=null>Select a category</option>
            <option value="All">
              All
            </option>
            <option v-for="(category, index) in categories" :key="index" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <br>
        <div>
          <div>
            <label for="priceRange" class="form-label">Price range:</label>
            <div>
              <input id="price1" type="range" class="form-range" :min="minPrice" :max="maxPrice"
                v-model="minPriceSelected" @input="applyFilters" />
              <div>Minimum value: ${{ minPriceSelected }}</div>

              <input id="price2" type="range" class="form-range" :min="minPrice" :max="maxPrice"
                v-model="maxPriceSelected" @input="applyFilters" />
              <div>Maximum value: ${{ maxPriceSelected }}</div>
            </div>
          </div>
        </div>

        <br>
        <div>
          <label for="discountsRange" class="form-label">Discount range:</label>
          <div class="d-flex center">
            <input id="discountMin" type="number" class="form-control me-2" placeholder="0 %"
              v-model="selectedMinPercentage" min="0" max="100" @input="applyFilters" />
            -
            <input id="discountMax" type="number" class="form-control me-2" placeholder="100 %"
              v-model="selectedMaxPercentage" min="0" max="100" @input="applyFilters" />
          </div>
        </div>

        <br>
        <div>
          <label for="ratingFilter" class="form-label">Rating:</label>
          <div class="d-flex center">
            <input id="rating" type="number" class="form-control" placeholder="Rating value" v-model="selectedRating"
              @input="applyFilters" min="0" max="5" />
          </div>
        </div>

        <br>
        <div>
          <label for="stockFilter" class="form-label">Stock:</label>
          <div class="d-flex center">
            <input id="rating" type="number" class="form-control" placeholder="Stock value" v-model="selectedStock"
              @input="applyFilters" min="0" />
          </div>
        </div>

        <br>
        <div>
          <label for="brandFilter" class="form-label">Brand name:</label>
          <div class="d-flex center">
            <input id="rating" type="text" class="form-control" placeholder="Brand name" v-model="selectedBrand"
              @input="applyFilters" />
          </div>
        </div>
      </div>

      <div class="products-column row">
        <h1>Product List</h1>
        <div v-for="product in filteredProducts" :key="product.id" class="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
          <div class="card" style="width: 18rem;">
            <img :src="product.thumbnail" :alt="product.title" class="card-img-top" height="200px" width="200px" />
            <div class="card-body">
              <p class="product-discountPercentage">
                <b>- {{ parseFloat(product.discountPercentage) }}%</b>
              </p>
              <!-- Rating con estrellas -->
              <div class="product-rating">
                <span v-for="i in 5" :key="i"
                  :class="{ 'filled-star': i <= product.rating, 'empty-star': i > product.rating }">&#9733;</span>
                {{ product.rating }}
              </div>
              <h4 class="product-name">{{ this.truncatedText(product.title, 18) }}</h4>
              <p class="product-price">
                <span class="original-price" v-if="product.discountPercentage > 0">$ {{ product.price }} USD</span>
                <span class="discounted-price">$ {{ calculateDiscountedPrice(product.price, product.discountPercentage)
                  }} USD x Unit</span>
              </p>
              <p class="product-description">{{ this.truncatedText(product.description, 62) }}</p>
              <p class="product-stock">Stock: {{ product.stock }}</p>
              <p class="product-brand">Brand: {{ product.brand }}</p>
              <p class="product-category">Category: {{ product.category }}</p>
            </div>
<<<<<<< HEAD
=======
            <button class="btn btn-info" @click="openDetailsModal(product)">See details</button>
>>>>>>> 422daac9540139f5fc25585f11b2f20221c20112
            <button class="btn btn-primary" @click="selectProduct(product)">Add to cart</button>
          </div>
        </div>

        <productDetails :selectedProduct="selectedProduct" @closeModal="closeDetailsModal" v-if="isDetailsModalOpen" />

        <!-- Agregar controles de paginación -->
        <paginator :current_page="this.current_page" :pages="this.totalPages" @nextPage="nextPage"
          @clickPage="clickPageNum" @previous="previousPage" />
      </div>
    </div>

    <!-- Agrega la flecha al final del template -->
    <div class="scroll-to-top" :class="{ 'show-scroll-to-top': showScrollToTop }" @click="scrollToTop">
      <i class="bi bi-arrow-up-circle-fill"></i>
    </div>
    <br>
    <footerComponent />
  </div>
</template>

<script lang="ts">
declare var Swal: any;
import axios from "axios";
import { Global } from "@/config";
import headerComponent from "@/components/headerComponent.vue";
import cartComponent from "@/components/shoppingCartComponent.vue";
import footerComponent from "@/components/footerComponent.vue";
import shoppingCart from "@/components/shoppingCartComponent.vue";
import paginator from "@/components/product/paginatorComponent.vue";
import productDetails from "./ProductDetails.vue";

export default {
  name: "Products",
  components: {
    paginator,
    headerComponent,
    footerComponent,
    cartComponent,
    shoppingCart,
    productDetails
  },
  data() {
    return {
      minPrice: 10,
      maxPrice: 2000,
      maxPriceSelected: null,
      minPriceSelected: null,
      selectedCategory: null,
      selectedMaxPercentage: null,
      selectedMinPercentage: null,
      selectedRating: null,
      selectedStock: null,
      selectedBrand: null,
      products: [],
      categories: [],
      filteredProducts: [],
      itemStoredInCart: [],
      errorMessage: "",
      showScrollToTop: false,
      isDarkTheme: false,

      /* paginator */
      limitPages: 12,
      totalPages: 0,
      current_page: 1,
      skipPages: 0, //show the total amount of pages

      isDetailsModalOpen: false,
      selectedProduct: null
    }
  },
  methods: {
    async getProducts(skipPages: number = 0) {
      try {
        let response = await axios.get(`${Global.api}/products?limit=${this.limitPages}&skip=${skipPages}`);
        if (response.status === 200) {
          this.products = response.data.products;
          this.totalPages = Math.floor(await response.data.total / this.limitPages);
          this.filteredProducts = [...this.products];
        } else {
          this.errorMessage = "Error al obtener los productos";
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        this.errorMessage = "Error al obtener los productos";
      }
    },

    async getCategories() {
      try {
        let response = await axios.get(`${Global.api}/products/categories`);
        if (response.status === 200) {
          this.categories = response.data;
        } else {
          this.errorMessage = "Error al obtener las categories";
        }
      } catch (error) {
        console.error("Error al obtener los categories:", error);
        this.errorMessage = "Error al obtener los productos";
      }
    },

    async applyFilters() {
      // Aplica los filtros seleccionados a la lista de productos
      let filteredList = [...this.products]; // Copia la lista original de productos
      // Aplica el filtro de precio
      if (this.minPriceSelected !== null && this.maxPriceSelected !== null) {
        filteredList = filteredList.filter(product =>
          (product.price >= this.minPriceSelected && product.price <= this.maxPriceSelected)
        );
      }

      // Aplica el filtro de categoría
      if (this.selectedCategory != 'All') {
        const BY_CATEGORY = await axios.get(`${Global.api}/products/category/${this.selectedCategory}?limit=${this.limitPages}&skip=0`);
        filteredList = BY_CATEGORY.data.products;
        this.totalPages = Math.floor(await BY_CATEGORY.data.total / this.limitPages);
      } else {
        await this.getProducts();
      }

      // Filtro de porcentaje
      if (this.selectedMinPercentage && this.selectedMaxPercentage) {
        filteredList = filteredList.filter(product =>
          (product.discountPercentage >= this.selectedMinPercentage && product.discountPercentage <= this.selectedMaxPercentage)
        );
      }

      // Filtro de Rating
      if (this.selectedRating) {
        filteredList = filteredList.filter(product => (product.rating == this.selectedRating));
      }

      // Filtro de Rating
      if (this.selectedStock) {
        filteredList = filteredList.filter(product => (product.stock == this.selectedStock));
      }

      if (this.selectedBrand) {
        filteredList = filteredList.filter(product => (product.brand === this.selectedBrand));
      }

      // Actualiza la lista de productos filtrados
      return this.filteredProducts = filteredList;
    },

    truncatedText(description: string, max: number) {
      // Computed property para truncar el texto si es necesario
      if (description.length > max) return description.slice(0, max) + "..."; // Agrega puntos suspensivos si el texto se trunca
      return description;
    },

    // Agrega el nuevo método para manejar el scroll
    handleScroll() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const scrollThreshold = 100;
      this.showScrollToTop = scrollPosition > scrollThreshold;
    },

    // Define el método scrollToTop para llevar al usuario al inicio de la página
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    async clickPageNum(page: number) {
      this.skipPages = page * this.limitPages;
      await this.getProducts(this.skipPages);
      this.current_page = page;
    },

    async nextPage(page: number) {
      this.skipPages += this.limitPages;
      await this.getProducts(this.skipPages);
      this.current_page = page;
    },

    async previousPage(page: number) {
      if (this.skipPages > 0) {
        this.skipPages -= this.limitPages;
        await this.getProducts(this.skipPages);
        this.current_page = page;
      }
    },

    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },

    calculateDiscountedPrice(originalPrice, discountPercentage) {
      const discountAmount = (originalPrice * discountPercentage) / 100;
      const PRICE_WITH_DISCOUNT = (originalPrice - discountAmount).toFixed(2);
      return PRICE_WITH_DISCOUNT;
    },

    async selectProduct(product) {
      // Verificar si el producto ya está en el carrito
      const existingProductIndex = this.itemStoredInCart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, incrementar la cantidad
          this.itemStoredInCart[existingProductIndex].quantity++;
      } else {
          // Si el producto no está en el carrito, agregarlo con una cantidad inicial de 1
          const productWithQuantity = { ...product, quantity: 1 };
          this.itemStoredInCart.push(productWithQuantity);
      }

      console.log("listado de productos:", this.itemStoredInCart);
  

      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product added to cart',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true
      });
    },

    removeItemFromCart(index) {
            this.itemStoredInCart.splice(index, 1); // Eliminar el producto del array itemStoredInCart
    },

    clearCart() {
            this.itemStoredInCart = []; // Vaciar el array de items del carrito en el componente padre
    },

    openDetailsModal(product) {
      // Abrir el modal y establecer el producto seleccionado
      this.isDetailsModalOpen = true;
      this.selectedProduct = product;
    },
    closeDetailsModal() {
      // Cerrar el modal y restablecer el producto seleccionado
      this.isDetailsModalOpen = false;
      this.selectedProduct = null;
    },

    async selectProduct(product) {
      this.itemStoredInCart.push(product);
      console.log("listado de productos:", this.itemStoredInCart);
    },

  },

  watch: {

  },

  async mounted() {
    await this.getProducts();
    await this.getCategories();
    // Llamar al método para obtener los datos paginados

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // Limpia el listener cuando el componente se destruye para evitar pérdida de memoria
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>
/* Estilos base de la aplicación */
.light-theme {
  background-color: $light-background;
  color: $dark-text;
}

.dark-theme {
  background-color: $fourth-col;
  color: $light-background;
}

.custom-icon {
  color: rgb(214, 214, 2);
}

/* Estilos para la flecha */
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: $secondary-col;
  color: $light-background;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: 0;
}

.scroll-to-top:hover {
  background-color: #0056b3;
}

.show-scroll-to-top {
  opacity: 1;
}

/* ******************************** */
.product-discountPercentage {
  padding: 10px 10px;
  display: inline-block;
  background-color: red;
  color: white;
  border-radius: 100%;
  position: absolute;
  margin: -70px 10px;
  right: 0;
}

.original-price {
  text-decoration: line-through;
  color: #888;
  opacity: 0.5;
  display: flex;
  justify-content: center;
}

.discounted-price {
  display: flex;
  justify-content: center;
  color: $third-col;
}

.product-rating {
  color: $fifth-col;
  /* Color de las estrellas */
  text-align: end;
}

.filled-star {
  color: #ffd700;
  /* Color de las estrellas rellenas */
}

.empty-star {
  color: #ccc;
  /* Color de las estrellas vacías */
}

.categories-column {
  position: sticky;
  top: 0;
  padding: 0px 20px;
  height: 100vh;
}

.products-column {
  flex-grow: 1;
  overflow-y: auto;
}

.error-message {
  color: red;
  margin-bottom: 20px;
}

.product-details {
  .product-name {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .product-price {
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .product-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }

  .product-stock,
  .product-brand,
  .product-category {
    font-size: 14px;
    color: #888;
  }

  /* Estilos opcionales */
  input[type="range"] {
    width: 100%;
  }
}
</style>