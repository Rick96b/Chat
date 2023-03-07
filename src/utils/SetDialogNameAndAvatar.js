const { getCurrentUser } = require("firebaseCore/controllers")

const SetDialogNameAndAvatar = async ({dialogsData, authUser}) => {
    const dialogsDataPromises = dialogsData.map(async (dialog) => {
        if (!dialog.isGroup) {
            const firstUser = await getCurrentUser({userRef: dialog.partners[0]});
            const secondUser = await getCurrentUser({userRef: dialog.partners[1]});
            const currentUser = firstUser.uid === authUser.uid ? secondUser : firstUser
            return {
                name: currentUser.login, 
                avatar: currentUser.avatar, 
                isOnline: currentUser.isOnline,
                ...dialog
            }
        }
        return dialog
    })
    return Promise.all(dialogsDataPromises)
}

export default SetDialogNameAndAvatar;