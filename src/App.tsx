import { ToastContainer } from "react-toastify";

import Loader from "./components/UI/Loader";
import { useGetSettingsQuery } from "./features/settings/services/slice";
import { useGetSavedUserQuery } from "./features/user/services/slice";
import Routes from "./routes";

function App() {
  useGetSavedUserQuery(undefined, {
    skip: !Boolean(localStorage.getItem("rememberMe")),
  });

  const { isLoading, isSuccess } = useGetSettingsQuery();

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {isSuccess && (
        <>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes />
        </>
      )}
    </>
  );
}

export default App;
