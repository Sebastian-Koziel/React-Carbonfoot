import * as Yup from 'yup';

const conversionMap = {
  "1": {
      "2": 1000,
      "3": 1000000
  },
  "2": {
      "1": 0.001,
      "3": 1000
  },
  "3": {
      "1": 0.000001,
      "2": 0.001
  },
  "4":{
      
  }
};

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


  