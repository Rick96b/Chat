import { getCurrentUser } from "firebaseCore/controllers";

const DialogPrepocesser = async ({dialogsData, authUser}) => {
    const dialogsDataPromises = dialogsData.map(async (dialog) => {
        if (!dialog.isGroup) {
            const firstUser = await getCurrentUser({userRef: dialog.partners[0]});
            const secondUser = await getCurrentUser({userRef: dialog.partners[1]});
            const currentUser = firstUser.uid === authUser.uid ? secondUser : firstUser
            return {
                name: currentUser.login, 
                avatar: currentUser.avatar, 
                isOnline: currentUser.isOnline,
                unread: dialog.unreads[authUser.uid],
                ...dialog,
            }
        }
        return dialog
    })
    return Promise.all(dialogsDataPromises)
}

export default DialogPrepocesser;