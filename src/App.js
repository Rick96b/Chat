import {useAuthState} from 'react-firebase-hooks/auth';
import { Route, Routes } from "react-router-dom";

import CreateGroupChat from "pages/CreateGroupChat";
import CreateNewChatPage from "pages/CreateNewChatPage";
import DialogPage  from "pages/DialogPage";
import HomePage from "pages/Home";
import AuthPage from "pages/AuthPage";

import { auth } from "firebaseCore";
import { Loader } from "components";


const App = () => {
  const [user, loading, error] = useAuthState(auth);
  
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
