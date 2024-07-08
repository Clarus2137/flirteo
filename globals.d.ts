declare global {
    interface User {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        location: string,
        educationLevel: string,
        gender: string,
        interests: string[],
        roles: string[],
        tokens: number,
        token: string
    }

    interface Education {
        id: number,
        icon: string,
        name: string
    }

    interface BaseInterests {
        name: string;
        checked: boolean;
    }

    interface Hobbies {
        name: string
    }

    interface BirthDate {
        date: string,
        timezone_type: number,
        timezone: string
    }

    interface PageTitle {
        title: string,
        subtitle: string
    }

    interface Session {
        id: string
        user: string,
        prompt: string,
        responseType: string,
        messages: Partial<SessionMessages>[],
        place: string,
        gender: string
    }

    interface Messages {
        content: string,
        attachment: string
    }

    interface SessionMessages {
        id: number,
        content: string,
        attachment: string,
        response: string
    }

    interface Prompts {
        id: number,
        name: string,
        places: Places[]
    }

    interface Places {
        id: number,
        icon: string,
        active: boolean,
        name: string
    }

    interface ResponseAI {
        id: number,
        icon: string,
        name: string
    }

    interface Navigator {
        app: {
            exitApp: () => void; // Добавьте другие методы по мере необходимости
        },
        standalone?: boolean;
    }

    interface Product {
        id: number,
        name: string,
        tokens: number,
        price: number
    }

    interface Order {
        id: number,
        userId: number,
        userFirstName: string,
        userLastName: string
        item: Product,
        itemsQty: number,
        orderPrice?: number
    }

    interface GoogleProduct {
        id: string;
        title: string;
        price: string;
        description: string;
    }

    interface StoreProduct {
        id: string;
        alias: string;
        type: string;
        title: string;
        price: string;
        description: string;
    }

    interface StoreOrder {
        productId: string;
        finish: () => void;
    }

    interface Store {
        verbosity: number;
        DEBUG: number;
        CONSUMABLE: string;
        products: StoreProduct[];
        register: (product: { id: string; alias: string; type: string }) => void;
        ready: (callback: () => void) => void;
        refresh: () => void;
        order: (productId: string) => void;
        when: (productId: string) => {
            approved: (callback: (order: StoreOrder) => void) => void;
            updated: (callback: (product: StoreProduct) => void) => void;
            error: (callback: (error: any) => void) => void;
        };
    }

    interface Window {
        store: Store;
    }





    interface Cordova {
        InAppBrowser: InAppBrowser;
    }

    interface InAppBrowser {
        open: (url: string, target: string, options?: string) => InAppBrowserRef;
    }

    interface InAppBrowserRef {
        addEventListener: (type: string, callback: (event: any) => void) => void;
        removeEventListener: (type: string, callback: (event: any) => void) => void;
        close: () => void;
    }

    interface CordovaPlugins {
        ApplePayGooglePay: {
            canMakePayments: () => Promise<boolean>;
            makePaymentRequest: (request: {
                gateway: string;
                merchantId: string;
                gpMerchantName: string;
                gpMerchantId: string;
                purpose: string;
                amount: number;
                countryCode: string;
                currencyCode: string;
            }, successCallback: (response: any) => void, errorCallback: (error: any) => void) => void;
        };
    }

    interface Window {
        paymentData?: PaymentData;
    }

    interface PaymentData {
        totalPrice: string;
        currencyCode: string;
        merchantId: string;
        merchantName: string;
        allowedAuthMethods: string[];
        allowedCardNetworks: string[];
        gateway: string;
        gatewayMerchantId: string;
    }
}

export { };
