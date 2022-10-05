import { ToastContainer } from "react-toastify";

import Loader from "./components/UI/Loader";
import Routes from "./router/AppRoutes";
import { useAppSelector } from "./store/hooks";
import { selectIsLoading } from "./store/loader/selectors";

function App() {
  const isLoading = useAppSelector(selectIsLoading);

  return (
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
      {isLoading && <Loader />}
    </>
  );
}

export default App;
