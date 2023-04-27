import React, { forwardRef, useState } from "react";

import classes from "./Input.module.scss";

const Input = forwardRef((props, ref) => {
    const [styleInput, setStyleInput] = useState("custom-input__input");

    const onBlurMessageHandler = (event) => {
        const value = event.target.value;
        if (Number.isInteger(parseInt(value))) {
            if (value < props.minNumber) {
                setStyleInput("custom-input--error");
                alert(`Number should be more or equal to ${props.minNumber}`);
            } else {
                setStyleInput("");
            }
        } else {
            if (value.length < props.minCharacters) {
                setStyleInput("custom-input--error");
                alert(
                    `Text length should be at least ${props.minCharacters} characters!`
                );
            } else {
                setStyleInput("");
            }
        }
    };

    return (
        <div className={classes["custom-input"]}>
            {props.label !== undefined && (
                <label
                    htmlFor={props.label}
                    className={classes["custom-input__label"]}
                >
                    {props.label}
                </label>
            )}
            <input
                className={`${classes["custom-input__input"]} ${classes[styleInput]}`}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                id={props.label}
                placeholder={props.placeholder}
                ref={ref}
                onBlur={onBlurMessageHandler}
            />
        </div>
    );
});

export default Input;
