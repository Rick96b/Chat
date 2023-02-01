import { makeAutoObservable } from "mobx"

class dialogs {
    activeGroup = 'All chats';

    constructor() {
        makeAutoObservable(this)
    }

    setActiveGroup(newGroup) {
        this.activeGroup = newGroup;
    }
}

export default new dialogs();