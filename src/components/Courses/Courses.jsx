import React, { useState } from "react";

import CourseCard from "./components/CourseCard/CourseCard";
import SearchBar from "./components/SearchBar/SearchBar";
import Button from "../../common/Button";
import {
    mockedAuthorsList as AUTHORS,
    mockedCoursesList as LIST,
} from "../../constants";

import classes from "./Courses.module.scss";

const Courses = (props) => {
    const [coursesList, setCoursesList] = useState(LIST);

    const searchHandler = (search) => {
        if (search === "") {
            setCoursesList(LIST);
        } else {
            const filteredSearch = LIST.filter(
                (course) =>
                    course.id.toLowerCase().includes(search) ||
                    course.title.toLowerCase().includes(search)
            );
            setCoursesList(filteredSearch);
        }
    };

    const courseAuthors = (authorId) => {
        const author = AUTHORS.find((author) => author.id === authorId);
        return author ? author.name : "";
    };

    return (
        <div className={classes["courses"]}>
            <section className={classes["courses__actions"]}>
                <SearchBar onSearch={searchHandler} />
                <Button onClick={props.onToggle}>Add new course</Button>
            </section>

            <ul className={classes["courses__list"]}>
                {coursesList.map((course) => (
                    <CourseCard
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        duration={course.duration}
                        created={course.creationDate}
                        authors={course.authors.map(courseAuthors).join(", ")}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Courses;
