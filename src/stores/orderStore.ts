import { defineStore } from 'pinia';
import axios from 'axios';


const apiUrl = process.env.API_SERVER;
const apiPlans = `${apiUrl}/api/plans`;


export const useOrderStore = defineStore('order', {
    state: () => ({
        order: {} as Order,
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
                    console.log('Getting plans successful: ', response.data);
                    this.products = response.data;
                    this.products.forEach((item) => {
                        item.price /= 100;
                    });
                    return true;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.log('Getting plans failed: ', error.response?.data);
                    } else {
                        console.log('An unexpected error occurred', error);
                    }
                    return false;
                }
            } else {
                return 'Unauthorized';
            }
        },

        createOrder(selectedProduct: Product) {
            const userData = JSON.parse(sessionStorage.userData)
            this.order = {
                id: 1,
                userId: userData.id,
                userFirstName: userData.firstName,
                userLastName: userData.lastName,
                item: selectedProduct,
                itemsQty: 1
            }
        },

        addOrderData(orderData: Partial<Order>) {
            this.order = { ...this.order, ...orderData }
            console.log(this.order);
        }
    }
});
