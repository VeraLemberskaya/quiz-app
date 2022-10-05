import { FC } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./emailVerify.module.scss";
import Verify from "../../../../components/Animated/Verify";
import Error from "../../../../components/Animated/Error";
import Button from "../../../../components/UI/Button";
import Message from "../../../../components/UI/Message";
import { useVerifyQuery } from "../../authService";
import { FetchError } from "../../../../api/apiSlice";
import { loginLink } from "../../../../router/AuthRouter/routes";

const EmailVerify: FC = () => {
  const { userId, token } = useParams();

  const { data, isLoading, isError, isSuccess, error } = useVerifyQuery({
    userId,
    token,
  });

  let content;

  if (isError) {
    content = (
      <>
        <Error />
        <Message type="error" text={(error as FetchError).data.message} />
        <Link to="/">
          <Button buttonSize="large" buttonType="primary">
            Go to menu
          </Button>
        </Link>
      </>
    );
  }

  if (isSuccess) {
    content = (
      <>
        <Verify />
        <Message type="success" text={data?.message} />
        <Link to={loginLink()}>
          <Button buttonSize="large" buttonType="primary">
            Login
          </Button>
        </Link>
      </>
    );
  }
  if (!isLoading) {
    return (
      <div className={styles.emailVerifyBody}>
        <div className={styles.container}>{content}</div>
      </div>
    );
  }

  return null;
};

export default EmailVerify;
