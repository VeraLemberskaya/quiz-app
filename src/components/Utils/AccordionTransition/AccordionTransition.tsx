import { FC, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
  inProp: boolean;
  timeout: number;
  children: ReactNode;
  styles: Record<string, string>;
};

const AccordionTransition: FC<Props> = ({
  inProp,
  timeout,
  children,
  styles,
}) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      classNames={{
        enter: styles.accordionEnter,
        enterActive: styles.accordionEnterActive,
        exit: styles.accordionExit,
        exitActive: styles.accordionExitActive,
      }}
      mountOnEnter
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default AccordionTransition;
