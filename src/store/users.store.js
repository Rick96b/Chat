import { makeAutoObservable, reaction } from "mobx"
import { getAllUsers, postUser } from "firebaseControllers/firestoreControllers";
import { registerNewUser, signInUser } from "firebaseControllers/authControllers";
import { listenForAllUsers } from "firebaseControllers/firestoreListeners";
import { getPrecenseData, listenForUsersStatuses } from "firebaseControllers/realtimeDatabaseControllers";

class Users {
    currentUser = {};
    allUsers = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);

        reaction(
            () => this.allUsers,
            () => console.log(this.allUsers)
        )
    }

    async initializeStore(user) {
        setAllUsers(await getAllUsers());
        listenForUsersStatuses((userPrecenseData) => {
            this.changeUserPrecenseData(userPrecenseData.key, userPrecenseData.val())
        })
        listenForAllUsers((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added') {
                    this.addUserToAllUsers(change.doc.data())
                }
                if (change.type === "modified") {
                    this.removeUserFromAllUsers(change.doc.data())
                    this.addUserToAllUsers(change.doc.data())
                }
                if (change.type === "removed") {
                    this.removeUserFromAllUsers(change.doc.data())
                }
            })
        })
        this.setCurrentUser(user);
    }

    signUpUser(userData) {
        return registerNewUser(userData).then(userCredential => {
            postUser({user:userData, uid:userCredential.user.uid})
            this.setCurrentUser({uid:userCredential.user.uid, ...userData})
        })
    }

    signInUser(userData) {
        return signInUser(userData)
    }

    changeUserPrecenseData(userUid, precenseData) {
        this.allUsers = this.allUsers.map(user => {
            if(user.uid == userUid) {
                return {precenseData:precenseData, ...user}
            }
            return user
        })
    }

    async addUserToAllUsers(userToAdd) {
        if(!this.allUsers.filter(user => user.uid == userToAdd.uid)[0]) {
            const precenseData = await getPrecenseData(userToAdd.uid)
            this.pushUserToAllUsers({precenseData:precenseData, ...userToAdd})
        }
    }

    pushUserToAllUsers(user) {
        this.allUsers.push(user)
        console.log(this.allUsers)
    }

    removeUserFromAllUsers(userToRemove) {
        this.allUsers = this.allUsers.filter(user => user.uid != userToRemove.uid)
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    setAllUsers(users) {
        this.allUsers = users;
    }
}

export default Users;