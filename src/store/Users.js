import { makeObservable, runInAction, action, observable } from "mobx"
import { postUser } from "firebaseCore/controllers";
import { registerNewUser } from "firebaseCore/authControllers";

class Users {
    currentUser = {};

    constructor() {
        makeObservable(this, {
            currentUser: observable,
            registerUser: action,
            setCurrentUser: action,
        });
    }

    async registerUser(userData) {
        await registerNewUser(userData).then(userCredential => {
            postUser({user:userData, uid:userCredential.user.uid})
            this.setCurrentUser({uid:userCredential.user.uid, ...userData})
        })

    }

    setCurrentUser(user) {
        this.currentUser = user;
    }
}

export default new Users();