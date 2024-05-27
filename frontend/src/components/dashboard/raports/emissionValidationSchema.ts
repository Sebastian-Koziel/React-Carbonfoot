import * as Yup from 'yup';
import { ConversionTable, Factor } from '../../../interfaces/interfaces';

//get data from local storage
const conversionTableString = localStorage.getItem('conversionTable');
const conversionMap: ConversionTable = conversionTableString ? JSON.parse(conversionTableString) as ConversionTable : {};

const factors: Factor[] = JSON.parse(localStorage.getItem('factors') || '[]') as Factor[];

Yup.addMethod(Yup.string, 'checkIfConvertible', function (message) {
  return this.test('checkIfConvertible', message, function (value) {
    
    const { units, factor } = this.parent;
    const { path, createError } = this;

    if (!units || !factor) {
      return true;
    }

    const currentfactor = factors.find((f:any) => f._id === factor)
    if(!currentfactor){
      return createError({ path, message });
    }

    if (units === currentfactor.units) {
      return true;
    }
    
    if(conversionMap[currentfactor.units][units]){
      return true;
    }
    
    return createError({ path, message });
  });
});

export const emissionvalidationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    value: Yup.number().required('Required'),
    units: Yup.string().required('Required'),
    factor: Yup.string().required('Required').checkIfConvertible(`wskaźnik jest niekomptatybilny`),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date()
      .required('Required')
      .min(
        Yup.ref('startDate'),
        'Data zakończenia nie może być mniejsza niż data rozpoczęcia'
      )
  });


  