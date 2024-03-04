import { shallowMount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import shoppingCartComponent from "@/components/shoppingCartComponent.vue";

describe('shoppingCartComponent.vue', () => {
    it('Render list of added products', () => {
        const ITEMS = '';
        const WRAPPER = shallowMount(shoppingCartComponent, {
            props: { msg }
        });

        expect(WRAPPER.text()).toMatch(ITEMS);
    })
})
