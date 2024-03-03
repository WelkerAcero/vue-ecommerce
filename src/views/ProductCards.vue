<template>
  <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme }">
    <headerComponent :itemsAdded="itemStoredInCart" :close="this.closeModal" />
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
            <option disabled :value=null>Select a category</option>
            <option v-for="(category, index) in categories" :key="index" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

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

        <div>
          <label for="ratingFilter" class="form-label">Rating:</label>
          <div class="d-flex center">
            <input id="rating" type="number" class="form-control" placeholder="Rating value" v-model="selectedRating"
              @input="applyFilters" min="0" max="5" />
          </div>
        </div>

        <div>
          <label for="stockFilter" class="form-label">Stock:</label>
          <div class="d-flex center">
            <input id="rating" type="number" class="form-control" placeholder="Stock value" v-model="selectedStock"
              @input="applyFilters" min="0" />
          </div>
        </div>

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
              <h4 class="product-name">{{ this.truncatedText(product.title, 18) }}</h4>
              <p class="product-price">$ {{ product.price }} USD</p>
              <p class="product-description">{{ this.truncatedText(product.description, 62) }}</p>
              <p class="product-stock">Stock: {{ product.stock }}</p>
              <p class="product-brand">Brand: {{ product.brand }}</p>
              <p class="product-category">Category: {{ product.category }}</p>
            </div>
            <button class="btn btn-primary" @click="selectProduct(product)">Agregar al carrito</button>
          </div>
        </div>

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
import axios from "axios";
import { Global } from "@/config";
import headerComponent from "@/components/headerComponent.vue";
import cartComponent from "@/components/shoppingCartComponent.vue";
import footerComponent from "@/components/footerComponent.vue";
import shoppingCart from "@/components/shoppingCartComponent.vue";
import paginator from "@/components/product/paginatorComponent.vue";

export default {
  name: "Products",
  components: {
    paginator,
    headerComponent,
    footerComponent,
    cartComponent,
    shoppingCart
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

    applyFilters() {
      // Aplica los filtros seleccionados a la lista de productos
      let filteredList = [...this.products]; // Copia la lista original de productos
      // Aplica el filtro de precio
      if (this.minPriceSelected !== null && this.maxPriceSelected !== null) {
        filteredList = filteredList.filter(product =>
          (product.price >= this.minPriceSelected && product.price <= this.maxPriceSelected)
        );
      }

      // Aplica el filtro de categoría
      if (this.selectedCategory) {
        filteredList = filteredList.filter(product =>
          (product.category === this.selectedCategory)
        );
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

    async selectProduct(product) {
      console.log("handleAddToCart:", product);
      this.itemStoredInCart.push(product);
      console.log("listado de productos:", this.itemStoredInCart);
      this.closeModal = false;
    }
  },

  watch: {
    products() {

    },
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