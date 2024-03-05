<template>
  <div class="product-details-modal-overlay">
    <div class="product-details-modal">
      <div class="modal-content">
        <div class="d-inline text-end">
          <i class="bi bi-x-circle fs-3" @click="closeModal"></i>
        </div>   
        <div class="text-center">  
          <h2>{{ selectedProduct.title }}</h2>
          <p >{{ selectedProduct.description }}</p>  
        </div>     
        <hr>        
        <div class="d-flex justify-content-around flex-wrap">
          <div>
            <ul>
              <p class="product-price">
                <span class="original-price" v-if="selectedProduct.discountPercentage > 0">$ {{ selectedProduct.price }} USD</span>
                <span class="discounted-price">$ {{ calculateDiscountedPrice(selectedProduct.price, selectedProduct.discountPercentage)
                  }} USD x Unit</span>
              </p>              
              <li class="product-discountPercentage">{{ selectedProduct.discountPercentage }}%</li>
              <li><i class="bi bi-star-fill" style="color: #ffd700;"></i> <strong>Rating:</strong> {{ selectedProduct.rating }}</li>
              <li><i class="bi bi-basket-fill" style="color: green;"></i> <strong>Stock:</strong> {{ selectedProduct.stock }}</li>
              <li><i class="bi bi-postcard-fill"  style="color: #8000EB;"></i> <strong>Brand:</strong> {{ selectedProduct.brand }}</li>
              <li><i class="bi bi-tags-fill"  style="color: blue;"></i> <strong>Category:</strong> {{ selectedProduct.category }}</li>
            </ul>
          </div> 
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
  </div>
</template>

<script>
import { productFeatures } from "../mixins/productFeaturesMixin.js";

export default {
  mixins:
        [productFeatures],
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
  width: 50%;
  height: fit-content;
  background-color: white;
  padding: 20px;
  z-index: 1001;
  border-radius: 20px;
  box-shadow: 10px 10px 10px black;
}

.modal-content {
  max-width: 80%;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
}

@media(max-width: 900px) {
  .product-details-modal{
    max-width: 80%;
    width: 80%;
  }
}
</style>
