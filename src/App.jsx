import { useState } from "react";

import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";

function App() {
    const [toggleShowCourses, setToggleShowCourses] = useState(false);

    const toggleHandler = () => {
        setToggleShowCourses((prevToggleShowCourses) => !prevToggleShowCourses);
    };

    return (
        <>
            <Header />
            {!toggleShowCourses && <Courses onToggle={toggleHandler} />}
            {toggleShowCourses && <CreateCourse onToggle={toggleHandler} />}
        </>
    );
}

export default App;
