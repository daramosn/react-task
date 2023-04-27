import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";

import classes from "./Modal.module.scss";

const ModalOverlay = (props) => {
    return (
        <>
            <div
                onClick={props.onCloseModal}
                className={classes.backdrop}
            ></div>
            <Card className={classes.modal}>{props.children}</Card>
        </>
    );
};

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <ModalOverlay onCloseModal={props.onCloseModal}>
                    {props.children}
                </ModalOverlay>,
                document.getElementById("modal-root")
            )}
        </>
    );
};

export default Modal;
