import { observer } from "mobx-react";
import CreateGroupChat from "pages/CreateGroupChat";
import CreateNewChatPage from "pages/CreateNewChatPage";
import DialogPage  from "pages/DialogPage";
import { HomePage } from "pages/Home";
import AuthPage from "pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { auth } from "firebaseCore";
import {useAuthState} from 'react-firebase-hooks/auth';

import { UsersStore, DialogsStore } from "store";
import { getCurrentUser } from "firebaseCore/controllers";
import { useState } from "react";
import { Loader } from "components";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [initializing, setInitializing] = useState(true);

  if(user) {
    getCurrentUser({userUid: user.uid}).then(userData => {
      UsersStore.setCurrentUser(userData)
      if(!DialogsStore.initialized) {
        DialogsStore.initializeStore(userData).then(() => setInitializing(false));
      }
    })
  }

  if(initializing) {
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
