import { RegisterForm as BaseForm} from 'components';
import { RootStore } from 'store';
import { withFormik } from 'formik';
import { validator } from 'utils';

export default withFormik({
    mapPropsToValues: () => ({
        login: "",
        email: "",
        password: ""
    }), 

    validate: values => {
        let errors = {};
        const keys = Object.keys(values)
        keys.forEach(key => validator[key] && validator[key](errors, values[key]))
        return errors;
    },
  
    handleSubmit: (values, { setSubmitting }) => {
      const user = {
        avatar: '',
        login: values.login,
        email: values.email,
        password: values.password,
      }
      RootStore.usersStore.registerUser(user)
      setSubmitting(false);
    },
  
    displayName: 'RegisterForm',
  })(BaseForm);

