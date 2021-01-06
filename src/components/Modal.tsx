import React, { FunctionComponent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal : FunctionComponent = ({ children }) => {

  const elRef = useRef(document.createElement('div'));

  useEffect(() => {
    const modalroot = document.getElementById("modal");
    if(!modalroot){
      return;
    }
    modalroot.appendChild(elRef.current);

    return () =>  { modalroot.removeChild(elRef.current)};
  });

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
