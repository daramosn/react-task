import React from "react";
import Logo from "./components/Logo/Logo";
import Button from "../../common/Button";

import classes from "./Header.module.scss";

const Header = (props) => {
    return (
        <nav className={classes["header-navbar"]}>
            <ul className={classes["header-navbar__list"]}>
                <li className={classes["header-navbar__list-logo"]}>
                    <Logo />
                    <span>COURSES</span>
                </li>
                <li className={classes["header-navbar__list-name"]}>Diego</li>
                <li>
                    <Button>Log out</Button>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
