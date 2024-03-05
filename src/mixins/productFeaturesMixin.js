export const productFeatures = {
    methods: {
        calculateDiscountedPrice(originalPrice, discountPercentage) {
            const discountAmount = (originalPrice * discountPercentage) / 100;
            const PRICE_WITH_DISCOUNT = (originalPrice - discountAmount).toFixed(2);
            return PRICE_WITH_DISCOUNT;
        },
    },
};