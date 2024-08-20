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

    interface StatusBar {
        backgroundColorByHexString: (color: string) => void;
        hide: () => void;
        show: () => void;
    }

    interface Window {
        StatusBar: StatusBar;
    }
}

export { };
