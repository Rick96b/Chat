import { makeAutoObservable } from "mobx"
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
    }

    async initializeStore(user) {
        this.setAllUsers(await getAllUsers());
        listenForUsersStatuses((userPrecenseData) => {
            this.changeUserPrecenseData(userPrecenseData.key, userPrecenseData.val())
        })
        listenForAllUsers((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added') {
                    this.addUserToAllUsers(change.doc.data())
                }
                if (change.type === "modified") {
                    this.modifyUserInAllUsers(change.doc.data())
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
        const userToModify = this.allUsers.filter(user => user.uid == userUid)[0]
        this.modifyUserInAllUsers({...userToModify, precenseData:precenseData})
    }

    async addUserToAllUsers(userToAdd) {
        if(!this.allUsers.filter(user => user.uid == userToAdd.uid)[0]) {
            const precenseData = await getPrecenseData(userToAdd.uid)
            this.pushUserToAllUsers({...userToAdd, precenseData:precenseData})
        }
    }

    pushUserToAllUsers(user) {
        this.allUsers.push(user)
    }

    removeUserFromAllUsers(userToRemove) {
        this.setAllUsers(this.allUsers.filter(user => user.uid != userToRemove.uid))
    }

    modifyUserInAllUsers(userToModify) {
        this.setAllUsers(this.allUsers.map(user => {
            if(user.uid == userToModify.uid) {
                return userToModify
            }
            return user
        }))
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    setAllUsers(users) {
        this.allUsers = users;
    }
}

export default Users;