import {useAuthState} from 'react-firebase-hooks/auth';
import { Route, Routes } from "react-router-dom";

import CreateGroupChat from "pages/CreateGroupChat";
import CreateNewChatPage from "pages/CreateNewChatPage";
import DialogPage  from "pages/DialogPage";
import HomePage from "pages/Home";
import AuthPage from "pages/AuthPage";

import { auth } from "firebaseCore";
import { Loader } from "components";
import { getUserDataByUid } from 'firebaseControllers/firestoreControllers';
import { RootStore } from 'store';
import { useState } from 'react';
import { presenceHandler } from 'firebaseControllers/realtimeDatabaseControllers';

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [initializingDialogs, setInitializingDialogs] = useState(true);

  if(RootStore.initialized === false && initializingDialogs === true && user) {
      getUserDataByUid(user.uid).then(async userData => {
          presenceHandler(userData.uid);
          await RootStore.initializeStores(userData);
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
          <Route path='*' element={<HomePage user={user}/>} />
      </Routes>
      :
      <Routes>
        <Route path='*' element={<AuthPage />} />
      </Routes>
    }
    </>
  )
}

export default App;
