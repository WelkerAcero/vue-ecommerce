<template>
    <div>
        <h2>Shopping Cart</h2>
        <ul>
            <li v-for="(item, index) in cartItems" :key="index">
                {{ item.name }} - ${{ item.price }}
                <button @click="removeItem(index)">Remove</button>
            </li>
        </ul>
        <p>Total: ${{ calculateTotal() }}</p>
    </div>
</template>

<script>
export default {

    props: {

    },

    data() {
        return {
            cartItems: [],
        }
    },

    methods: {
        calculateTotal() {
            const SUMM = this.cartItems.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return SUMM;
        }
    },

    mounted: {

    }


}
</script>