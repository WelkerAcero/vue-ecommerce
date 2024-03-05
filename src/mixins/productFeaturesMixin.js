export const productFeatures = {
    methods: {
        calculateDiscountedPrice(originalPrice, discountPercentage) {
            const DISCOUNT_AMOUNT = (originalPrice * discountPercentage) / 100;
            const PRICE_WITH_DISCOUNT = (originalPrice - DISCOUNT_AMOUNT).toFixed(2);
            return PRICE_WITH_DISCOUNT;
        },
    },
};