import React from 'react'
import Header from './Header'
import Baseof from './Baseof'
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return (
        <>

            <Baseof title={"My about page"} content={"My page title"} key={"My about page"} />
            <Header />
            <div>About</div>
        </>
    )
}

export default About