interface User {
    username: string;
    password: string
}

interface Loss {
    type: string;
    name: string;
}

interface LossData {
    date: string;
    value: string;
}

export { User, Loss, LossData }