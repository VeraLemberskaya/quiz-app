import { FC, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

const Portal: FC<Props> = ({ children }) => {
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return createPortal(children, el);
};

export default Portal;
