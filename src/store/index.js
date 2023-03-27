import UserStore from "./users.store";
import DialogsStore from "./dialogs.store";

class RootStoreClass {
  constructor() {
    this.usersStore = new UserStore(this)
    this.dialogsStore = new DialogsStore(this)
  }
}

const RootStore = new RootStoreClass()

export {RootStore};