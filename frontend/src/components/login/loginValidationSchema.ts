import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Required'),  
});
