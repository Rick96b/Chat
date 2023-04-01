import { makeAutoObservable } from "mobx"
import { listenForUsersStatuses, postUser } from "firebaseCore/controllers";
import { registerNewUser, signInUser } from "firebaseCore/authControllers";

class Users {
    currentUser = {};
    usersStatus = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    getOnlineUsers() {
        listenForUsersStatuses(onlineUsersArray => this.setUsersStatus(onlineUsersArray))
    }

    registerUser(userData) {
        registerNewUser(userData).then(userCredential => {
            postUser({user:userData, uid:userCredential.user.uid})
            this.setCurrentUser({uid:userCredential.user.uid, ...userData})
        })

    }

    signInUser(userData) {
        return signInUser(userData)
    }

    setUsersStatus(newUsersStatus) {
        this.usersStatus = newUsersStatus
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }
}

export default Users;