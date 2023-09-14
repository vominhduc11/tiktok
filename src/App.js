
import Modal from "./cpn_modal";
import { createContext, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./cpn_home/Home";
import ForYou from "./cpn_home/cpn_container/contentHome";
import Following from "./cpn_home/cpn_container/contentFollowing";
import PrivatePage from "./cpn_privatePage";

export const ThemeContext = createContext();

const App = () => {
    const location = useLocation();

    const [recAcc1s, setRecAcc1s] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isModalSignIn, setIsModalSignIn] = useState(false);
    const [hidden, sethidden] = useState(true);
    const [isDark, setIsDark] = useState(localStorage.getItem("isDark") === "true" ? true : false);
    const [logoDefault, setLogoDefault] = useState((localStorage.getItem("logoDefault") === null) ? true : (localStorage.getItem("logoDefault") === "true" ? true : false));
    const wrapTag = useRef();
    const bodyModalTag = useRef();
    const modalTag = useRef();
    const forYouTag = useRef();
    const followingTag = useRef();
    const liveTag = useRef();


    // handle when click sign in close button
    function closeSignIn() {

        modalTag.current.style.display = "none";
        bodyModalTag.current.style = "transform:scale(15%);opacity:0.15";
        bodyModalTag.current.ontransitionend = function () {
            setIsOpenModal(false);
            if (isModalSignIn === true) {
                setIsModalSignIn(false);
            }
            if (hidden === false) {
                sethidden(true);
            }
        }
    }

    //click for you
    function handleClickForYou() {
        document.querySelector('.active').classList.remove('active');
        forYouTag.current.classList.add('active');
    }
    //click following
    function handleClickFollowing() {
        document.querySelector('.active').classList.remove('active');
        followingTag.current.classList.add('active');
    }
    //click live
    function handleClickLIVE() {
        document.querySelector('.active').classList.remove('active');
        liveTag.current.classList.add('active');
    }

    const contextObj = {
        openModal() {
            setIsOpenModal(true);
        },
        openDark() {
            setIsDark(true);
            localStorage.setItem("isDark", true);
            localStorage.setItem("logoDefault", false);
        },
        closeDark() {
            setIsDark(false);
            localStorage.setItem("isDark", false);
            localStorage.setItem("logoDefault", true);
        },
        closeSignIn() {
            closeSignIn();
        },
        isOpenModal
        ,
        hidden
        ,
        isModalSignIn
        ,
        isDark
        ,
        sethidden(param) {
            sethidden(param);
        }
        ,
        setIsModalSignIn(param) {
            setIsModalSignIn(param)
        },
        wrapTag,
        bodyModalTag,
        modalTag,
        logoDefault,
        setLogoDefault,
        setRecAcc1s,
        forYouTag,
        followingTag,
        liveTag,
        handleClickFollowing,
        handleClickForYou,
        handleClickLIVE
    }

    return (
        <ThemeContext.Provider value={contextObj}>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/" element={<ForYou />} />
                    <Route path="/following" element={<Following />} />
                </Route>
                {recAcc1s.map((recAcc1, index) => <Route key={index} path={`/@${recAcc1.name}`} element={<PrivatePage key={index} />} />)}
                <Route path={`/@${location.pathname.slice(2)}`} element={<PrivatePage />}></Route>
            </Routes>
            <Modal />
        </ThemeContext.Provider>
    )
}


export default App;