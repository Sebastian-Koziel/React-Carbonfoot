import * as Yup from 'yup';

const conversionMap = localStorage.getItem('conversionTable');



/* Yup.addMethod(Yup.string, 'checkIfConvertible', function (message) {
  return this.test('check-if-convertible', message, function (value) {
    const { path, createError } = this;
    console.log(`test custom`)
    const { units, factor } = this.parent;

    if (!units || !factor || !factor.units) {
      return true;
    }

    if (units === factor.units) {
      return true;
    }

    const fromUnitConversions = conversionMap[units];
    if (fromUnitConversions && fromUnitConversions[factor.units]) {
      return true;
    }

    return createError({ path, message });
  });
}); */


Yup.addMethod(Yup.string, 'checkIfConvertible', function (message) {
  return this.test('checkIfConvertible', message, function (value) {
    
    const { units, factor } = this.parent;

    if (!units || !factor) {
      return true;
    }
    console.log(units)
    console.log(factor)
    const factors = JSON.parse(localStorage.getItem('factors'));
    console.log(factors);
    console.log(factor === factors[0]._id);
    const currentfactor = factors.find(f => f._id === factor)

    console.log(currentfactor)

    const { path, createError } = this;
    // Your custom logic to check if the value is convertible
    const isConvertible = false;
    
    return isConvertible || createError({ path, message });
  });
});

export const emissionvalidationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    value: Yup.number().required('Required'),
    units: Yup.string().required('Required').checkIfConvertible(`sadasdasd`),
    factor: Yup.string().required('Required'),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date()
      .required('Required')
      .min(
        Yup.ref('startDate'),
        'Data zakończenia nie może być mniejsza niż data rozpoczęcia'
      )
  });


  