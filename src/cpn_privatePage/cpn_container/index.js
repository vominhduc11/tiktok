import { createContext, memo, useContext, useRef } from "react"
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../App";
import Content from "./content";
// import { ThemeContext } from "../App";
import Sidebar from "./sidebar";
import styles from "./style.module.scss"

export const ThemeContextContainer = createContext();

const Container = () => {
    const { isDark } = useContext(ThemeContext);

    return (
        <div id={isDark ? styles.containerDark : styles.container}>
            {/* <div className={styles.grid}> */}
            <div className={styles.wrap}>
                <Sidebar />
                <Content />
            </div>
            {/* </div> */}
        </div>
    )
}

export default memo(Container);