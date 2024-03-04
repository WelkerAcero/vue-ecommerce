<template>
    <a class="icon-link m-2 shop--icon" @click="toggleCartVisibility">
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
                <div v-for="(item, index) in cartItems" :key="index" class="d-flex shop--list--products">
                    <!-- <pre>{{item}}</pre> -->
                    <div>
                        <img :src="item.thumbnail" :alt="item.title" class="card-img-top" width="50" height="50" />
                        <p><strong>Brand: </strong>{{ item.brand }}</p>
                    </div>
                    <div>
                        <h5>{{ item.title }} </h5>
                        <p style="color: #fba834;">${{ item.price }} USD <span v-if="item.discountPercentage > 0"> - {{
        item.discountPercentage }} %</span></p>

                        <div class="quantity-controls">

                            <button @click="decreaseQuantity(index)" :disabled="item.quantity === 1"
                                style="border-radius: 100%;font-size: 10px;">-</button>

                            <span>{{ item.quantity }}</span>

                            <button @click="increaseQuantity(index)" :disabled="item.quantity === item.stock"
                                style="border-radius: 100%;font-size: 10px;">+</button>
                        </div>
                    </div>
                </div>
                <div class="position-absolute bottom-0 ">
                    <hr>
                    <div class="d-flex justify-content-between mx-4">
                        <h5>Subtotal</h5>
                        <h5>$ {{ calculateSubtotal() }} USD</h5>
                    </div>
                    <RouterLink to="/shopping-cart" class="btn btn-primary m-4" style="width: 250px;">Go to shopping
                        cart
                    </RouterLink>
                </div>
            </div>
            <div v-else class="shop--no--products">
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

        calculateSubtotal() {
            let subtotal = 0;
            for (const item of this.cartItems) {
                const QUANTITY_BY_PROD = item.price * item.quantity;
                const TOTAL_DISCOUNT = (QUANTITY_BY_PROD * item.discountPercentage) / 100;
                console.log("QUANTITY_BY_PROD:", QUANTITY_BY_PROD, "TOTAL_DISCOUNT:", TOTAL_DISCOUNT);
                subtotal += QUANTITY_BY_PROD - TOTAL_DISCOUNT;
            }
            return subtotal.toFixed(2); // Redondear a 2 decimales
        },

        toggleCartVisibility() {
            this.displayItems = true; // Siempre muestra el contenido cuando se hace clic en el carrito
            this.$emit('toggleCart'); // Emitir evento para abrir/cerrar el modal del carrito
            console.log("this.objAdded", this.objAdded);
            // Verificar si objAdded tiene un valor antes de agregarlo a cartItems
            if (this.objAdded.length > 0) {
                // Iterar sobre los productos agregados
                for (let i = 0; i < this.objAdded.length; i++) {
                    let same = false;
                    if (this.cartItems.length > 0) {
                        this.cartItems.forEach(e => {
                            if (e.id === this.objAdded[i].id) {
                                e.quantity += 1;
                                same = true;
                            }
                        });
                    }

                    if (same) continue;

                    // Inicializar la cantidad en 1 para cada producto
                    const PRODUCT_QUANTITY = { ...this.objAdded[i], quantity: 1 };
                    // Agregar el producto al carrito
                    this.cartItems.push(PRODUCT_QUANTITY);
                }
            }
        },

        closeCart() {
            this.displayItems = false;
            this.$emit('toggleCart');
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
.shop--icon {
    position: fixed;
    right: 0px;
    z-index: 90;
}

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
    z-index: 5;
    color: black;
    overflow: auto;
}

.shop--list--products {
    border-bottom: 1px solid black;
    justify-content: space-evenly;
    margin: 10px;
    padding: 10px;
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

.shop--no--products {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>