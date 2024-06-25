import { defineStore } from 'pinia';
import axios from 'axios';


const apiUrl = process.env.API_SERVER;
const apiPlans = `${apiUrl}/api/plans`;


export const useOrderStore = defineStore('order', {
    state: () => ({
        order: {} as Partial<Order>,
        products: {} as Product[],
        lang: ''
    }),

    actions: {
        async getPlans() {
            const userToken = localStorage.getItem('userToken');
            if (userToken !== null) {
                try {
                    const response = await axios.get(apiPlans, {
                        headers: {
                            'Authorization': `Bearer ${userToken}`,
                            'Accept-Language': this.lang
                        }
                    });
                    console.log('Getting plans successful', response.data);
                    this.products = response.data;
                    return true;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.error('Getting plans failed: ', error.response?.data);
                    } else {
                        console.error('An unexpected error occurred', error);
                    }
                    return false;
                }
            } else {
                return 'Unauthorized';
            }
        },

        createOrder(selectedProduct: Product) {
            this.order = {
                items: [
                    {
                        product: selectedProduct,
                        itemsQty: 1,
                        itemsPrice: selectedProduct.price
                    }
                ]
            }
        }
    }
});
