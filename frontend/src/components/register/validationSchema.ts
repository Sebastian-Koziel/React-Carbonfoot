import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    company: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Required'),
    password2: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')  
        .required('Required'),
    terms: Yup.boolean().oneOf([true], 'Accepting Terms & Conditions is required'),  
});
