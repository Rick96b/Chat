import { makeAutoObservable } from "mobx"
import { listenForUsersStatuses, postUser } from "firebaseCore/controllers";
import { registerNewUser } from "firebaseCore/authControllers";

class Users {
    currentUser = {};
    usersStatus = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async getOnlineUsers() {
        listenForUsersStatuses(onlineUsersArray => this.setUsersStatus(onlineUsersArray))
    }

    async registerUser(userData) {
        await registerNewUser(userData).then(userCredential => {
            postUser({user:userData, uid:userCredential.user.uid})
            this.setCurrentUser({uid:userCredential.user.uid, ...userData})
        })

    }

    setUsersStatus(newUsersStatus) {
        this.usersStatus = newUsersStatus
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }
}

export default Users;