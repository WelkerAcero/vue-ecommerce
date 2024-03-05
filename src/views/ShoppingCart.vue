<template>
  <headerComponent :itemsAdded="itemStoredInCart" />
  <div class="shopping-cart">
    <br>
    <div class="step-indicator">
      <div class="step">
        <div :class="{ 'completed': currentStep >= 1 }">1</div>
        <span>Shopping Cart</span>
      </div>
      <div class="step">
        <div :class="{ 'completed': currentStep >= 2 }">2</div>
        <span>Shipping Information</span>
      </div>
      <div class="step">
        <div :class="{ 'completed': currentStep >= 3 }">3</div>
        <span>Confirm Purchase</span>
      </div>
    </div>

    <div class="step-content">
      <!-- Paso 1: Datos del carrito -->
      <div v-if="currentStep === 1">
        <button class="btn btn-info mx-3" @click="nextStep">Continue</button>
        <div style="height: 300px;">

        </div>        
      </div>

      <!-- Paso 2: Datos de envío -->
      <div v-if="currentStep === 2">   
        <button class="btn btn-secondary mx-3" @click="prevStep">Back</button>  
        <button class="btn btn-info mx-1" @click="nextStep">Continue</button>
        <div style="height: 300px;">

        </div>
      </div>

      <!-- Paso 3: Confirmar compra -->
      <div v-if="currentStep === 3">
        <button class="btn btn-secondary mx-3" @click="prevStep">Back</button>
        <!-- Botón para finalizar la compra -->
        <button class="btn btn-info mx-1">Confirm Purchase</button>
        <div style="height: 300px;">

        </div>
      </div>
    </div>
  </div>
  <footerComponent />
</template>

<script>
import headerComponent from "@/components/headerComponent.vue";
import footerComponent from "@/components/footerComponent.vue";

export default {
  name: "shopping-cart",
  components: {   
    headerComponent,
    footerComponent, 
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    }
  },
}
</script>

<style scoped>
.step-indicator {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.step { 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.completed {
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>