import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Input from "../../common/Input";
import Button from "../../common/Button";
import Modal from "../../UI/Modal";
import { courseDuration } from "../../helpers/courseDuration";
import { getCurrentDate } from "../../helpers/getCurrentDate";
import {
    mockedAuthorsList as AUTHORS,
    mockedCoursesList as COURSES,
} from "../../constants";

import classes from "./CreateCourse.module.scss";

const CreateCourse = (props) => {
    const titleRef = useRef("");
    const textareaRef = useRef("");
    const [durationTime, setDurationTime] = useState(0);
    const [addAuthor, setAddAuthor] = useState("");
    const [authorList, setAuthorList] = useState(AUTHORS);
    const [courseAuthorList, setCourseAuthorList] = useState([]);
    const [modal, setModal] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        if (textareaRef.current.value.length < 2) {
            return setModal(true);
        }
        if (
            titleRef.current.value.length < 2 ||
            textareaRef.current.value.length < 2 ||
            durationTime === 0 ||
            courseAuthorList.length === 0
        ) {
            return setModal(true);
        }
        const newCourse = {
            id: uuidv4(),
            title: titleRef.current.value,
            description: textareaRef.current.value,
            creationDate: getCurrentDate(),
            duration: durationTime,
            authors: courseAuthorList.map((author) => author.id),
        };
        COURSES.push(newCourse);
        props.onToggle();
    };

    const inputDurationHandler = (event) => {
        if (event.target.value === "") {
            return setDurationTime(0);
        } else {
            setDurationTime(parseInt(event.target.value));
        }
    };

    const addAuthorHandler = (event) => {
        setAddAuthor(event.target.value);
    };

    const createAuthorHandler = () => {
        if (addAuthor.length > 1) {
            const newAuthor = { id: uuidv4(), name: addAuthor };
            AUTHORS.push(newAuthor);
            setAddAuthor("");
        }
        return;
    };

    const addAuthorListHandler = (currentAuthor) => {
        setCourseAuthorList((prevCourseAuthorList) => [
            currentAuthor,
            ...prevCourseAuthorList,
        ]);
        setAuthorList((prevAuthorList) =>
            prevAuthorList.filter((author) => author.id !== currentAuthor.id)
        );
    };
    const deleteAuthorListHandler = (currentAuthor) => {
        setCourseAuthorList((prevCourseAuthorList) =>
            prevCourseAuthorList.filter(
                (author) => author.id !== currentAuthor.id
            )
        );
        setAuthorList((prevAuthorList) => [currentAuthor, ...prevAuthorList]);
    };

    const modalToggleHandler = () => {
        setModal((prevModal) => !prevModal);
    };

    return (
        <>
            {modal && (
                <Modal onCloseModal={modalToggleHandler}>
                    <h3>Please fill correctly the form!</h3>
                </Modal>
            )}
            <form onSubmit={submitHandler} className={classes["new-course"]}>
                <div className={classes["new-course__actions"]}>
                    <Input
                        label={"Title"}
                        ref={titleRef}
                        placeholder={"Enter title..."}
                        minCharacters={2}
                    />
                    <Button type={"submit"}>Create course</Button>
                    <textarea
                        className={classes["new-course__actions-textarea"]}
                        name="actions-textarea"
                        id="actions-textarea"
                        cols="30"
                        rows="10"
                        placeholder={"Enter description..."}
                        ref={textareaRef}
                    ></textarea>
                </div>

                <div className={classes["new-course__details"]}>
                    <div className={classes["new-course__details--one-column"]}>
                        <h4 className={classes["new-course--title"]}>
                            Add author
                        </h4>
                        <Input
                            label={"Author name"}
                            placeholder={"Enter author name..."}
                            value={addAuthor}
                            onChange={addAuthorHandler}
                            minCharacters={2}
                        />
                        <Button
                            type={"button"}
                            onClick={createAuthorHandler}
                            className={classes["new-course__button"]}
                        >
                            Create author
                        </Button>
                    </div>

                    <div className={classes["new-course__details--one-column"]}>
                        <h4 className={classes["new-course--title"]}>
                            Authors
                        </h4>
                        <ul className={classes["new-course--no-padding"]}>
                            {authorList.map((author) => (
                                <li
                                    className={classes["new-course__list-item"]}
                                    key={author.id}
                                >
                                    <span>{author.name}</span>
                                    <Button
                                        onClick={addAuthorListHandler.bind(
                                            null,
                                            author
                                        )}
                                    >
                                        Add author
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={classes["new-course__details--one-column"]}>
                        <h4 className={classes["new-course--title"]}>
                            Duration
                        </h4>
                        <Input
                            label={"Duration"}
                            placeholder={"Enter duration in minutes..."}
                            type={"number"}
                            onChange={inputDurationHandler}
                            minNumber={5}
                        />
                        <span>Duration: {courseDuration(durationTime)}</span>
                    </div>

                    <div className={classes["new-course__details--one-column"]}>
                        <h4 className={classes["new-course--title"]}>
                            Course authors
                        </h4>
                        <ul className={classes["new-course--no-padding"]}></ul>
                        {courseAuthorList?.map((author) => (
                            <li
                                className={classes["new-course__list-item"]}
                                key={author.id}
                            >
                                <span>{author.name}</span>
                                <Button
                                    onClick={deleteAuthorListHandler.bind(
                                        null,
                                        author
                                    )}
                                >
                                    Delete author
                                </Button>
                            </li>
                        ))}
                    </div>
                    <Button type={"button"} onClick={props.onToggle}>
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateCourse;
