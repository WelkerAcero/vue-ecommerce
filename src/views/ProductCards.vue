<template>
  <headerComponent />
  <br>

  <div class="d-flex">
    <!-- <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div> -->
    <div class="categories-column">
      <h3 class="pt-5">Filters</h3>
      <hr>
      <div>
        <p>Categorías</p>
        <select v-model="selectedCategory" @click="applyFilters">
          <option disabled value="">Selecciona una categoría</option>
          <option v-for="(category, index) in categories" :key="index" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div>
        <div>
          <label for="priceRange">Rango de precios:</label>
          <div>
            <input id="price1" type="range" :min="minPrice" :max="maxPrice" v-model="minPriceSelected"
              @input="applyFilters" />
            <div>Valor mínimo${{ minPriceSelected }}</div>

            <input id="price2" type="range" :min="minPrice" :max="maxPrice" v-model="maxPriceSelected"
              @input="applyFilters" />
            <div>Valor máximo: ${{ maxPriceSelected }}</div>
          </div>
        </div>
      </div>


      <div>
        <label for="discountsRange">Rango de descuentos:</label>
        <div class="d-flex center">
          <input id="discountMin" type="number" placeholder="% minimum" v-model="selectedMinPercentage" min="0"
            max="100" @input="applyFilters" style="width:30%;" />
          -
          <input id="discountMax" type="number" placeholder="% maximun" v-model="selectedMaxPercentage" min="0"
            max="100" @input="applyFilters" style="width:30%;" />
        </div>
      </div>

      <div>
        <label for="ratingFilter">Rating:</label>
        <div class="d-flex center">
          <input id="rating" type="number" placeholder="Rating value" v-model="selectedRating" @input="applyFilters"
            min="0" max="5" style="width:30%;" />
        </div>
      </div>

      <div>
        <label for="stockFilter">Stock:</label>
        <div class="d-flex center">
          <input id="rating" type="number" placeholder="Stock value" v-model="selectedStock" @input="applyFilters"
            min="0" style="width:30%;" />
        </div>
      </div>

      <div>
        <label for="brandFilter">Brand name:</label>
        <div class="d-flex center">
          <input id="rating" type="text" placeholder="Brand name" v-model="selectedBrand" @input="applyFilters"
            style="width:80%;" />
        </div>
      </div>
    </div>

    <div class="products-column row">
      <h1>Listado de productos</h1>
      <div v-for="product in filteredProducts" :key="product.id" class="col-lg-4 col-md-5 col-sm-6 col-12 mb-3">
        <div class="card" style="width: 18rem;">
          <img :src="product.thumbnail" :alt="product.title" class="card-img-top" height="200px" width="200px" />
          <div class="card-body">
            <h4 class="product-name">{{ this.truncatedText(product.title, 18) }}</h4>
            <p class="product-price">{{ product.price }} USD</p>
            <p class="product-description">{{ this.truncatedText(product.description, 62) }}</p>
            <p class="product-stock">Stock: {{ product.stock }}</p>
            <p class="product-brand">Marca: {{ product.brand }}</p>
            <p class="product-category">Categoría: {{ product.category }}</p>
          </div>
          <div class="">
            <a href="#" class="icon-link">
              <i class="bi bi-cart-fill icon" style="font-size: 30px;"></i>
            </a>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>

      <!-- Agregar controles de paginación -->
      <div class="text-center">
        <!-- Botón "Anterior" -->
        <button @click="onPageChange(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>

        <!-- Mostrar número de página actual y total de páginas -->
        <span>Página {{ currentPage }} de {{ totalPages }}</span>

        <!-- Botón "Siguiente" -->
        <button @click="onPageChange(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
    </div>
  </div>

  <!-- Agrega la flecha al final del template -->
  <div class="scroll-to-top" :class="{ 'show-scroll-to-top': showScrollToTop }" @click="scrollToTop">
    <i class="bi bi-arrow-up-circle-fill"></i>
  </div>

  <br>
  <footerComponent />
</template>

<script lang="ts">
import axios from "axios";
import headerComponent from "../components/headerComponent.vue";
import cartComponent from "../components/shoppingCartComponent.vue";
import footerComponent from "../components/footerComponent.vue";
import { Global } from "@/config";

export default {
  name: "Products",
  components: {
    headerComponent,
    footerComponent,
    cartComponent
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
      filteredProducts: [],
      categories: [],
      errorMessage: "",

      totalPages: 1,
      currentPage: 1,
      perPage: 12,
      showScrollToTop: false,
    }
  },
  methods: {
    async getProducts() {
      try {
        let response = await axios.get(`${Global.api}/products`);
        if (response.status === 200) {
          this.products = response.data.products;
          console.log("this.products:", this.products);
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
        console.log("categories:", response);
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

      // Ajusta este valor según cuánto desplazamiento quieres que ocurra antes de mostrar la flecha
      const scrollThreshold = 100;
      this.showScrollToTop = scrollPosition > scrollThreshold;
    },

    // Define el método scrollToTop para llevar al usuario al inicio de la página
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Para un desplazamiento suave
      });
    },

    onPageChange(page: number) {
      // Cambiar a la página seleccionada
      this.currentPage = page;
      // Aplicar los filtros nuevamente para mostrar los productos de la nueva página
      this.applyFilters();
    },

    getPaginatedData() {
      // Calcular los índices de los productos que se mostrarán en la página actual
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      // Mostrar solo los productos de la página actual
      this.filteredProducts = this.products.slice(startIndex, endIndex);
    }
  },
  watch: {
    products() {
      this.totalPages = Math.ceil(this.products.length / this.perPage);
    },
    perPage() {
      this.totalPages = Math.ceil(this.products.length / this.perPage);
    },
    // Escuchar los cambios en los filtros y la página actual
    selectedCategory() {
      this.onPageChange(1);
    },
    selectedMinPercentage() {
      this.onPageChange(1);
    },
    selectedMaxPercentage() {
      this.onPageChange(1);
    },
    selectedRating() {
      this.onPageChange(1);
    },
    selectedStock() {
      this.onPageChange(1);
    },
    selectedBrand() {
      this.onPageChange(1);
    },
    currentPage() {
      this.getPaginatedData(); // Actualizar los productos cuando cambia la página
    }
  },
  async mounted() {
    await this.getProducts();
    await this.getCategories();
    // Llamar al método para obtener los datos paginados
    this.getPaginatedData();

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // Limpia el listener cuando el componente se destruye para evitar pérdida de memoria
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>
/* Estilos para la flecha */
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: 0;
  /* Inicialmente invisible */
}

.scroll-to-top:hover {
  background-color: #0056b3;
}

/* Estilos para mostrar la flecha */
.show-scroll-to-top {
  opacity: 1;
}


.categories-column {
  width: 200px;
  /* Ancho fijo para la columna de categorías */
  position: sticky;
  /* Para que la columna se mantenga fija */
  top: 0;
  /* Fija la columna en la parte superior */
  padding-right: 20px;
  /* Espacio entre la columna y la de los productos */
  height: 100vh;
}

.products-column {
  flex-grow: 1;
  /* La columna de productos ocupará el espacio restante */
  overflow-y: auto;
  /* Añade scroll si el contenido excede la altura */
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