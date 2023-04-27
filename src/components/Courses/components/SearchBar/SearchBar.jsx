import React, { useState } from "react";

import Button from "../../../../common/Button";
import Input from "../../../../common/Input";

import classes from "./SearchBar.module.scss";

const SearchBar = (props) => {
    const [enteredValue, setEnteredValue] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        props.onSearch(enteredValue.toLowerCase());
    };

    const inputChangeHandler = (event) => {
        setEnteredValue(event.target.value);

        if (event.target.value === "") {
            props.onSearch(""); // Reset search result when the searchbar is empty
        }
    };

    return (
        <form onSubmit={submitHandler} className={classes["search-form"]}>
            <Input
                // label={"Search"}
                type="text"
                value={enteredValue}
                onChange={inputChangeHandler}
                placeholder={" Title or id..."}
            />
            <Button>Search</Button>
        </form>
    );
};

export default SearchBar;
