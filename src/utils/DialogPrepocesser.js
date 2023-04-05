import { getUserDataByUid } from "firebaseControllers/firestoreControllers";

const DialogPrepocesser = async ({dialogsData, authUser}) => {
    const dialogsDataPromises = dialogsData.map(async (dialog) => {
        if (!dialog.isGroup) {
            const firstUser = await getUserDataByUid(dialog.partners[0]);
            const secondUser = await getUserDataByUid(dialog.partners[1]);
            const currentUser = firstUser.uid === authUser.uid ? secondUser : firstUser
            return { 
                unread: dialog.unreads[authUser.uid],
                isGroup: dialog.isGroup,
                lastMessage: dialog.lastMessage,
                partner: currentUser.uid
            }
        }
        return dialog
    })
    return Promise.all(dialogsDataPromises)
}

export default DialogPrepocesser;