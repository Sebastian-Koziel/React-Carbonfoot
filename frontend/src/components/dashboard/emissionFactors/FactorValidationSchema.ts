import * as Yup from 'yup';

export const factorValidationSchema = Yup.object({
    name: Yup.string().required('Required'),
    value: Yup.number().required('Required'),
});