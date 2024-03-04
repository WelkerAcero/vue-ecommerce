import { shallowMount } from "@vue/test-utils";
//import { mount } from "@vue/test-utils";
import ShoppingCart from '@/components/shoppingCartComponent.vue';

describe('ShoppingCartComponent.vue', () => {
    it('Renders correctly when isVisible is true', () => {
        const wrapper = shallowMount(ShoppingCart, {
            props: {
                isVisible: true,
                objAdded: [],
            }
        });
        expect(wrapper.isVisible()).toBe(true);
    });

    it('Renders correctly when isVisible is false', () => {
        const wrapper = shallowMount(ShoppingCart, {
            props: {
                isVisible: false,
                objAdded: [],
            }
        });
        expect(wrapper.isVisible()).toBe(false);
    });

    it('Emits toggleCart event when icon is clicked', async () => {
        const wrapper = shallowMount(ShoppingCart, {
            props: {
                isVisible: true,
                objAdded: [],
            }
        });

        await wrapper.find('.icon-link').trigger('click');
        expect(wrapper.emitted('toggleCart')).toBeTruthy();
    });

    // Agrega más pruebas según tus necesidades
});