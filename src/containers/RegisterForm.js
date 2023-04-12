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
  
    handleSubmit: (values, actions) => {
      const user = {
        avatar: '',
        login: values.login,
        email: values.email,
        password: values.password,
        description: '',
      }
      RootStore.usersStore.signUpUser(user).catch(error => {
        if(error.code == "auth/email-already-in-use") {
          actions.setStatus({firebaseErrorMessage: "Такая почта уже используется!"})  
          actions.setFieldValue('email', '')  
        } 
      })
      actions.setSubmitting(false);
    },
  
    displayName: 'RegisterForm',
  })(BaseForm);

