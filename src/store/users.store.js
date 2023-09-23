import { makeAutoObservable } from "mobx"
import { editUserInDatabase, getAllUsers, postUser } from "firebaseControllers/firestoreControllers";
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
                    this.addUserToAllUsers(change.doc)
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
        const userToModify = this.allUsers.filter(user => user.uid === userUid)[0]
        this.modifyUserInAllUsers({...userToModify, precenseData:precenseData})
    }

    async addUserToAllUsers(userToAdd) {
        const userToAddId = userToAdd.id;
        const userToAddData = userToAdd.data();
        if(!this.allUsers.filter(user => user.uid == userToAddId)[0]) {
            const precenseData = await getPrecenseData(userToAddId);
            this.pushUserToAllUsers({...userToAddData, precenseData:precenseData})
        }
    }

    pushUserToAllUsers(user) {
        this.allUsers.push(user)
    }

    removeUserFromAllUsers(userToRemove) {
        this.setAllUsers(this.allUsers.filter(user => user.uid != userToRemove.uid))
    }

    async modifyUserInAllUsers(userToModify) {
        if(!userToModify.precenseData) {
            userToModify.precenseData = await getPrecenseData(userToModify.uid);
        }
        this.setAllUsers(this.allUsers.map(user => {
            if(user.uid == userToModify.uid) {
                return userToModify;
            }
            return user
        }))
    }

    editUser(newUserValues) {
        editUserInDatabase(this.currentUser.uid, newUserValues)
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    setAllUsers(users) {
        this.allUsers = users;
    }
}

export default Users;