<template>
  <div class="product-details-modal-overlay">
    <div class="product-details-modal">
      <div class="modal-content">
        <div class="d-inline text-end">
          <i class="bi bi-x-circle fs-3" @click="closeModal"></i>
        </div>
        <!-- <pre>{{selectedProduct}}</pre> -->
        <h2>{{ selectedProduct.title }}</h2>
        <p style="width: 200px;">{{ selectedProduct.description }}</p>
        <ul>
          <li><strong>Precio:</strong> ${{ selectedProduct.price }} USD</li>
          <li><strong>Descuento:</strong> {{ selectedProduct.discountPercentage }}%</li>
          <li><strong>Valoración:</strong> {{ selectedProduct.rating }}</li>
          <li><strong>Stock:</strong> {{ selectedProduct.stock }}</li>
          <li><strong>Marca:</strong> {{ selectedProduct.brand }}</li>
          <li><strong>Categoría:</strong> {{ selectedProduct.category }}</li>
        </ul>

        <div id="productImageCarousel" class="carousel slide" style="width: 200px;">
          <div class="carousel-inner">
            <div v-for="(image, index) in selectedProduct.images" :key="index"
              :class="{ 'carousel-item': true, 'active': index === 0 }">
              <img :src="image" class="d-block w-100" :alt="'Image ' + (index + 1)" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel"
            data-bs-slide="prev">
            <span aria-hidden="true"><i class="bi bi-arrow-left-circle fs-5" style="color: #fba834;"></i></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel"
            data-bs-slide="next">
            <span aria-hidden="true"><i class="bi bi-arrow-right-circle fs-5" style="color: #fba834;"></i></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedProduct: Object
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
};
</script>

<style scoped>
.product-details-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-details-modal {
  max-width: 80%;
  width: 80%;
  height: 500px;
  background-color: white;
  padding: 20px;
  z-index: 1001;
}

.modal-content {
  max-width: 80%;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
}
</style>
