import { LoginForm as BaseForm} from 'components';
import { RootStore } from 'store';
import { withFormik } from 'formik';

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }), 

    handleSubmit: (values, actions) => {
        const user = {
            email: values.email,
            password: values.password,
        }
        RootStore.usersStore.signInUser(user).catch(error => {
            actions.setStatus({firebaseErrorMessage: 'Неправильная почта или пароль'})     
        })
        actions.setSubmitting(false);
    },
  
    displayName: 'LoginForm',
  })(BaseForm);