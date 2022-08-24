import { FC, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
  inProp: boolean;
  timeout: number;
  children: ReactNode;
  styles: Record<string, string>;
};

const FadeTransition: FC<Props> = ({ inProp, timeout, children, styles }) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      classNames={{
        enter: styles.fadeEnter,
        enterActive: styles.fadeEnterActive,
        exit: styles.fadeExit,
        exitActive: styles.fadeExitActive,
      }}
      mountOnEnter
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default FadeTransition;
