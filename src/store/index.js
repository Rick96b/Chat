import { makeAutoObservable } from "mobx"

import UserStore from "./users.store";
import DialogsStore from "./dialogs.store";
import DialogStore from "./dialog.store";

class RootStoreClass {
  initialized = false;

  constructor() {
    this.usersStore = new UserStore(this)
    this.dialogsStore = new DialogsStore(this)
    this.dialogStore = new DialogStore(this)

    makeAutoObservable(this);
  }

  async initializeStores(userData) {
    await RootStore.dialogsStore.initializeStore(userData);
    await RootStore.usersStore.initializeStore(userData);
    this.setInitialize()
  }

  setInitialize() {
    this.initialized = true;
  }
}

const RootStore = new RootStoreClass()

export {RootStore};