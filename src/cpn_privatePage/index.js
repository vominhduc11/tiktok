import Header from "./cpn_header";
import Container from "./cpn_container"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PrivatePage() {
    const path = useLocation().pathname;
    // const { setPosts } = useContext(ThemeContext);
    useEffect(() => {
        document.querySelector("title").innerText = path.slice(1);
    }, [])
    return (
        <>
            <Header />
            <Container />
        </>
    );
}

export default PrivatePage;