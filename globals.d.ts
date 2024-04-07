declare global {
    interface User {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        location: string,
        education: string,
        gender: string,
        interests: UserInterests[],
        roles: string[],
        token: string
    }

    interface BaseInterests {
        name: string;
        img: string;
        checked: boolean;
    }

    interface UserInterests {
        name: string,
        img: string
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
        messages: Messages[],
        place: string,
        gender: string
    }

    interface Messages {
        content: string,
        attachment: string
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
}

export { };
