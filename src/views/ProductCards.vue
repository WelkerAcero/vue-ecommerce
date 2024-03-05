<template>
  <div :class="{ 'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme }">
    <headerComponent :itemsAdded="itemStoredInCart" @removeItem="removeItemFromCart" @clearCart="clearCart" />
    <div class="d-flex justify-content-end">
      <button @click="toggleTheme" style="border-radius: 20px; margin: 5px;width: 200px; position: relative;">
        <i :class="isDarkTheme ? 'bi bi-lightbulb-off-fill' : 'bi bi-lightbulb-fill custom-icon'"></i>
        {{ isDarkTheme ? 'Darken' : 'Clarify' }}
      </button>
    </div>
    <br>
    <div class="d-flex">
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

      <div>
        <h1>Product List</h1>
        <div class="products-column">
          <div v-for="product in filteredProducts" :key="product.id" class="pro--cards">
            <div class="card" style="width: 18rem;">
              <img :src="product.thumbnail" :alt="product.title" class="card-img-top" height="200px" width="200px" />
              <div class="card-body">
                <p class="product-discountPercentage">
                  <b>- {{ parseFloat(product.discountPercentage) }}%</b>
                </p>
                <div class="product-rating">
                  <span v-for="i in 5" :key="i"
                    :class="{ 'filled-star': i <= product.rating, 'empty-star': i > product.rating }">&#9733;</span>
                  {{ product.rating }}
                </div>
                <h4 class="product-name">{{ this.truncatedText(product.title, 18) }}</h4>
                <p class="product-price">
                  <span class="original-price" v-if="product.discountPercentage > 0">$ {{ product.price }} USD</span>
                  <span class="discounted-price">$ {{ calculateDiscountedPrice(product.price,
    product.discountPercentage)
                    }} USD x Unit</span>
                </p>
                <p class="product-description">{{ this.truncatedText(product.description, 62) }}</p>
                <p class="product-stock"><i class="bi bi-basket-fill" style="color: green;"></i> Stock: {{ product.stock
                  }}</p>
                <p class="product-brand"><i class="bi bi-postcard-fill" style="color: #8000EB;"></i> Brand: {{
    product.brand }}</p>
                <p class="product-category"><i class="bi bi-tags-fill" style="color: blue;"></i> Category: {{
    product.category }}</p>
              </div>
              <button class="btn btn-info" @click="openDetailsModal(product)"><i class="bi bi-card-text"></i> See
                details</button>
              <button class="btn btn-primary" @click="selectProduct(product)"><i class="bi bi-cart-plus"></i> Add to
                cart</button>
            </div>
          </div>
        </div>
        <productDetails :selectedProduct="selectedProduct" @closeModal="closeDetailsModal" v-if="isDetailsModalOpen" />

        <!-- Controles de paginación -->
        <paginator :current_page="this.current_page" :pages="this.totalPages" @nextPage="nextPage"
          @clickPage="clickPageNum" @previous="previousPage" />
      </div>
    </div>
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
      allProducts: [],
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
      skipPages: 0,

      isDetailsModalOpen: false,
      selectedProduct: null
    }
  },
  methods: {
    // Funciones para obtener data
    async getAllProducts() {
      try {
        let response = await axios.get(`${Global.api}/products?limit=0&skip=0`);
        if (response.status === 200) {
          this.allProducts = response.data.products;
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        this.errorMessage = "Error al obtener los productos";
      }
    },
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

    // Funciones de filtros de los productos
    async applyFilters() {
      // Aplica los filtros seleccionados a la lista de productos
      let filteredList = [...this.products]; // Copia la lista original de productos
      let filteredListAll = [...this.allProducts]; // Copia la lista original de productos

      // Aplica el filtro de categoría
      if (this.selectedCategory != 'All') {
        const BY_CATEGORY = await axios.get(`${Global.api}/products/category/${this.selectedCategory}?limit=${this.limitPages}&skip=0`);
        filteredList = BY_CATEGORY.data.products;
        this.totalPages = Math.floor(await BY_CATEGORY.data.total / this.limitPages);
      } else {
        await this.getProducts();
      }

      // Aplica el filtro de precio
      if (this.minPriceSelected !== null && this.maxPriceSelected !== null) {
        filteredList = filteredListAll.filter(product =>
          (product.price >= this.minPriceSelected && product.price <= this.maxPriceSelected)
        );
      }

      // Filtro de porcentaje
      if (this.selectedMinPercentage && this.selectedMaxPercentage) {
        filteredList = filteredListAll.filter(product =>
          (product.discountPercentage >= this.selectedMinPercentage && product.discountPercentage <= this.selectedMaxPercentage)
        );
      }

      // Filtro de Rating
      if (this.selectedRating) {
        filteredList = filteredListAll.filter(product => (product.rating == this.selectedRating));
      }

      // Filtro de Rating
      if (this.selectedStock) {
        filteredList = filteredListAll.filter(product => (product.stock <= this.selectedStock));
        console.log("Rating:", filteredList);
      }

      if (this.selectedBrand) {
        filteredList = filteredListAll.filter(product => (product.brand === this.selectedBrand));
      }

      // Actualiza la lista de productos filtrados
      return this.filteredProducts = filteredList;
    },

    // Función para truncar texto
    truncatedText(description: string, max: number) {
      // Computed property para truncar el texto si es necesario
      if (description.length > max) return description.slice(0, max) + "..."; // Agrega puntos suspensivos si el texto se trunca
      return description;
    },

    // Funciones para llevar el usuario al menú
    handleScroll() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const scrollThreshold = 100;
      this.showScrollToTop = scrollPosition > scrollThreshold;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    // Funciones de paginación
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

    // Función de tema del proyecto
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },

    // Funciones de productos
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

    // Funciones para remover y vaciar el carrito
    removeItemFromCart(index) {
      this.itemStoredInCart.splice(index, 1); // Eliminar el producto del array itemStoredInCart
    },
    clearCart() {
      this.itemStoredInCart = []; // Vaciar el array de items del carrito en el archivo padre
    },

    // Funciones para el modal de detalles del producto
    openDetailsModal(product) {
      this.isDetailsModalOpen = true;
      this.selectedProduct = product;
    },
    closeDetailsModal() {
      this.isDetailsModalOpen = false;
      this.selectedProduct = null;
    },

  },

  watch: {

  },

  async mounted() {
    await this.getProducts();
    await this.getAllProducts();
    await this.getCategories();

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
.filled-star {
  color: #ffd700;
}

.empty-star {
  color: #ccc;
}

.product-rating {
  color: $fifth-col;
  text-align: end;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pro--cards {
  margin: 15px;
}

.product-details {
  .product-name {
    font-size: 18px;
    margin-bottom: 5px;
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

  input[type="range"] {
    width: 100%;
  }
}
</style>