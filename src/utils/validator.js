const validator = {
    email: (errors, value) => {
        if (!value) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            errors.email = 'Invalid email address';
        }
    },
    password: (errors, value) => {
        if (!value) {
            errors.password = 'Введите пароль';
        } else if (!/(?=.*[a-zA-Z0-9])/i.test(value)) {
            errors.password = 'Слишком легкий пароль';
        }
    }
}

export default validator;
