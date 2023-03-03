
import CreateGroupChat from "pages/CreateGroupChat";
import CreateNewChat from "pages/CreateNewChat";
import DialogPage  from "pages/DialogPage";
import { HomePage } from "pages/Home";
import AuthPage from "pages/AuthPage";
import { Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <Routes>
      <Route path='/dialog'> 
        <Route path=":dialogId" element={<DialogPage />} />
      </Route>
      <Route path='*' element={<AuthPage />} />
    </Routes>
  );
}

export default App;
