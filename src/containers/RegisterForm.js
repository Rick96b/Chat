import { RegisterForm } from 'components';
import { withFormik } from 'formik';
import { validator } from 'utils';

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }), 

    validate: values => {
        let errors = {};
        const keys = Object.keys(values)
        keys.forEach(key => validator[key] && validator[key](errors, values[key]))
        console.log(errors)
        return errors;
    },
  
    handleSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },
  
    displayName: 'RegisterForm',
  })(RegisterForm);

