import { FC } from "react";
import { Link, useParams } from "react-router-dom";

import Verify from "../../../../components/Animated/Verify";
import Error from "../../../../components/Animated/Error";
import Button from "../../../../components/UI/Button";
import Message from "../../../../components/UI/Message";
import { useVerifyQuery } from "../../authService";
import { FetchError } from "../../../../api/apiSlice";
import { loginLink } from "../../../../router/AuthRouter/routes";

import styles from "./emailVerify.module.scss";

const EmailVerify: FC = () => {
  const { userId, token } = useParams();

  const { data, isError, isSuccess, error } = useVerifyQuery({
    userId,
    token,
  });

  return (
    <div className={styles.emailVerifyBody}>
      <div className={styles.container}>
        {isSuccess && (
          <>
            <Verify />
            <Message type="success" text={data?.message} />
            <Link to={loginLink()}>
              <Button buttonSize="large" buttonType="primary">
                Login
              </Button>
            </Link>
          </>
        )}
        {isError && (
          <>
            <Error />
            <Message type="error" text={(error as FetchError).data.message} />
            <Link to="/">
              <Button buttonSize="large" buttonType="primary">
                Go to menu
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
