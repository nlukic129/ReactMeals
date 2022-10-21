import { Fragment, useContext } from "react";
import { createPortal } from "react-dom";
import CartContext from "../../Context/cart-context";
import classes from "./Modal.module.css";

const portalElement = document.getElementById("overlays");

const Backdrop = () => {
  const ctx = useContext(CartContext);
  return <div className={classes.backdrop} onClick={ctx.hideCart} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop hideCart={props.hideCart} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
