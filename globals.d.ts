declare global {
    interface User {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        location: string,
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
}

export { };
