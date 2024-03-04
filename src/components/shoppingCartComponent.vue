<template>
    <a class="icon-link m-2" @click="toggleCartVisibility" style="position: fixed; right: 0px;z-index: 90;">
        <i class="bi bi-cart-fill icon"></i>
    </a>
    <div class="overlay" v-if="isVisible"></div>
    <div class="cart-sidebar text-white" :class="{ 'visible': isVisible }" @click.self="closeCart">
        <div class="d-flex justify-content-between align-items-center m-3">
            <h4>Your shopping list</h4>
            <i class="bi bi-x-circle-fill fs-3" @click="closeCart"></i>
        </div>
        <div class="items-list">
            <div v-if="cartItems.length > 0">
                <div v-for="(item, index) in cartItems" :key="index" class="d-flex">
                    <!-- <pre>{{item}}</pre> -->
                    <div>
                        <img :src="item.thumbnail" :alt="item.title" class="card-img-top" width="50" height="50" />
                    </div>
                    <div>
                        <h4>{{ item.title }}</h4>
                        <h4>{{ item.brand }}</h4>
                        <h5>$ {{ item.price }} USD</h5>
                        <div class="quantity-controls">
                            <button @click="decreaseQuantity(index)" :disabled="item.quantity === 1">-</button>
                            <span>{{ item.quantity }}</span>
                            <button @click="increaseQuantity(index)" :disabled="item.quantity === item.stock">+</button>
                        </div>
                    </div>   
                    <hr>                
                </div>               
            </div>
            <div v-else style="display: flex; justify-content: center; align-items: center; height: 100%;">
                <div class="text-center">
                    <span>There are no products in the cart.</span>
                    <hr>
                    <img src="../assets/img/empty_cart.svg" width="150">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { toRefs } from 'vue';

export default {
    props: {
        isVisible: Boolean,
        objAdded: Array,
    },
    data() {
        return {
            cartItems: [],
            displayItems: false,
        }
    },
    emits: ['toggleCart'],
    methods: {
        increaseQuantity(index) {
            if (this.cartItems[index].quantity < this.cartItems[index].stock) {
                this.cartItems[index].quantity++;
            }
        },
        decreaseQuantity(index) {
            if (this.cartItems[index].quantity > 1) {
                this.cartItems[index].quantity--;
            }
        },
        toggleCartVisibility() {
            this.displayItems = true; // Siempre muestra el contenido cuando se hace clic en el carrito
            this.$emit('toggleCart'); // Emitir evento para abrir/cerrar el modal del carrito
            console.log("toggleCart", this.objAdded);

            // Verificar si objAdded tiene un valor antes de agregarlo a cartItems
            if (this.objAdded.length > 0) {
                // Iterar sobre los productos agregados
                this.objAdded.forEach(product => {
                    // Inicializar la cantidad en 1 para cada producto
                    const productWithQuantity = { ...product, quantity: 1 };
                    // Agregar el producto al carrito
                    this.cartItems.push(productWithQuantity);
                });
            }
            console.log("toggleCart", this.cartItems);
        },

        closeCart() {
            this.displayItems = false;
            this.$emit('toggleCart');
            this.cartItems = [];
        },
        /*         calculateTotal() {
                    return this.cartItems.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                }, */
    },
    // watch: {
    //     objAdded: {
    //         immediate: true, // Para que se ejecute la primera vez al inicio
    //         handler(newVal, oldVal) {
    //             if (newVal !== oldVal) {
    //                 this.cartItems = [...newVal]; // Actualiza cartItems cuando objAdded cambia
    //             }
    //         }
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Color semitransparente */
    z-index: 99;
    /* Asegúrate de que esté por encima de otros elementos */
}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: -300px;
    height: 100%;
    width: 300px;
    background-color: #333a73;
    transition: right 0.3s ease;
    z-index: 100;
    border: 1px solid black;
}

.items-list {
    height: 100vh;
    width: 300px;
    background-color: rgb(251, 251, 251);
    z-index: 10;
    color: black;
    overflow: auto;
}

.visible {
    right: 0;
}

.quantity-controls {
    display: flex;
    align-items: center;
}

.quantity-controls button {
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #333a73;
    color: white;
    border: none;
    cursor: pointer;
}

.quantity-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>