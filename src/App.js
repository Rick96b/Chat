import { observer } from "mobx-react";
import CreateGroupChat from "pages/CreateGroupChat";
import CreateNewChat from "pages/CreateNewChat";
import DialogPage  from "pages/DialogPage";
import { HomePage } from "pages/Home";
import AuthPage from "pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { auth } from "firebaseCore";
import {useAuthState} from 'react-firebase-hooks/auth';

import { UsersStore } from "store";
import { getCurrentUser } from "firebaseCore/controllers";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if(user) {
    getCurrentUser(user.uid).then(userData => {
      UsersStore.setCurrentUser(userData)
    })
  }

  if(loading) {
    return (
      <div>Whata</div>
    )
  }

  return (
    <>
    {user ?
      <Routes>
          <Route path='/dialog'> 
            <Route path=":dialogId" element={<DialogPage />} />
          </Route>
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
