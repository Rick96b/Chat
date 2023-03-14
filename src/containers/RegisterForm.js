import { RegisterForm } from 'components';
import { registerUser } from 'firebaseCore/authControllers';
import { UsersStore } from 'store';
import { getGeneralChatLink } from 'firebaseCore/controllers';
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
      UsersStore.registerUser(user)
      setSubmitting(false);
    },
  
    displayName: 'RegisterForm',
  })(RegisterForm);

