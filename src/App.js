import { observer } from "mobx-react";
import CreateGroupChat from "pages/CreateGroupChat";
import CreateNewChatPage from "pages/CreateNewChatPage";
import DialogPage  from "pages/DialogPage";
import { HomePage } from "pages/Home";
import AuthPage from "pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { auth } from "firebaseCore";
import {useAuthState} from 'react-firebase-hooks/auth';

import { RootStore } from "store";
import { getCurrentUser } from "firebaseCore/controllers";
import { useState } from "react";
import { Loader } from "components";
import presenceHandler from "firebaseCore/controllers/presenceHandler";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [initializingDialogs, setInitializingDialogs] = useState(true);

  if(user && initializingDialogs) {
    getCurrentUser({userUid: user.uid}).then(async userData => {
        presenceHandler(user.uid);
        await RootStore.dialogsStore.initializeStore(userData);
        RootStore.usersStore.setCurrentUser(userData);
        RootStore.usersStore.getOnlineUsers();
        setInitializingDialogs(false);
    })

    return (
      <Loader />
    )
  }

  if(loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
    {user ?
      <Routes>
          <Route path='/dialog'> 
            <Route path=":dialogId" element={<DialogPage />} />
          </Route>
          <Route path='createChat' element={<CreateNewChatPage />} />
          <Route path='*' element={<HomePage />} />
      </Routes>
      :
      <Routes>
        <Route path='*' element={<AuthPage />} />
      </Routes>
    }
    </>
  )
  
}

export default observer(App);
