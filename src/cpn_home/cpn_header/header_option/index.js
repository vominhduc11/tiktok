import Tippy from '@tippyjs/react/headless';
import { FaEllipsisV, FaPlus, FaChevronLeft } from 'react-icons/fa'
import { IoLanguage } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs"
import { TbKeyboard } from "react-icons/tb"
import { CiDark } from "react-icons/ci"

import styles from "./style.module.scss";
import { memo, useContext, useEffect, useRef, useState } from 'react';
import Modal from './modal';
import { ThemeContext } from '../../../App';

const languages = ['English', 'العربية', 'বাঙ্গালি (ভারত)', 'Cebuano (Pilipinas)', 'Čeština (Česká republika)', 'Deutsch', 'Ελληνικά (Ελλάδα)', 'Español', 'Suomi (Suomi)', 'Filipino (Pilipinas)', 'Français', 'עברית (ישראל)', 'हिंदी', 'Magyar (Magyarország)', 'Bahasa Indonesia (Indonesia)', 'Italiano (Italia)', '日本語（日本)', 'Basa Jawa (Indonesia)', 'ខ្មែរ (កម្ពុជា)', '한국어 (대한민국)', 'ไทย (ไทย)', 'Русский (Россия)', 'Română (Romania)', 'Türkçe (Türkiye)', 'اردو', 'Українська (Україна)', 'Tiếng Việt (Việt Nam)']

function Option() {
    const { openModal, openDark, closeDark, isDark, setLogoDefault } = useContext(ThemeContext);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [modal, setModal] = useState(false);

    //get input tag
    let toggleTag = useRef();
    let rst = useRef();

    //toggle witch in order to change background color
    const handelToggleSwitch = () => {
        if (toggleTag.current.style.marginLeft === "20px") {
            localStorage.setItem("marginLeft", 0);
            localStorage.setItem("backgroundColor", "rgb(207, 204, 204)");
            toggleTag.current.style.marginLeft = 0;
            toggleTag.current.parentElement.style.backgroundColor = "rgb(207, 204, 204)"
            setLogoDefault(true);
            // setIsDark(false);
            closeDark();
        } else {
            localStorage.setItem("marginLeft", "20px");
            localStorage.setItem("backgroundColor", "rgb(127, 230, 127)");
            toggleTag.current.style.marginLeft = "20px";
            toggleTag.current.parentElement.style.backgroundColor = "rgb(127, 230, 127)";
            setLogoDefault(false);
            // setIsDark(true);
            openDark();
        }
    }
    //handel when hover out site
    function hoverOutSite() {
        rst.current = setTimeout(() => {
            setVisible2(false);
            setTimeout(() => {
                setVisible1(false)
            }, 400)
        }, 1000);
    }
    //handel when hover option
    function hoverOption() {
        if (visible1 === false) {
            setVisible1(true);
        } else {
            clearTimeout(rst.current);
        }
    }
    //handel when mouse in tag
    function mouseIn() {
        clearTimeout(rst.current);
    }
    //render into dom
    return (
        <>
            <div className={isDark ? styles.optionDark : styles.option}>
                <button onClick={openModal}>
                    <FaPlus />
                    <span>Upload</span>
                </button>
                <button onClick={openModal}>
                    <span>Log in</span>
                </button>
                <Tippy
                    interactive
                    visible={visible1}
                    offset={[-80, 17]}
                    onHidden={() => setVisible2(false)}
                    zIndex={1}
                    render={attrs => (
                        <div className={isDark ? styles.customConfigDark : styles.customConfig} tabIndex="-1" {...attrs} onMouseLeave={hoverOutSite} onMouseOver={mouseIn}>
                            <ul>
                                <Tippy
                                    interactive
                                    visible={visible2}
                                    offset={[0, -100]}
                                    render={attrs => (
                                        <div className={isDark ? styles.languagesDark : styles.languages} tabIndex="-1" {...attrs}>
                                            <div>
                                                Language
                                                <FaChevronLeft style={{ position: "absolute", left: 20 }} onClick={() => setVisible2(false)} />
                                            </div>
                                            <ul>
                                                {languages.map((language, index) => (
                                                    <li key={index}>{language}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                >
                                    <li onClick={() => setVisible2(true)}>
                                        <IoLanguage size={20} />
                                        <p>English</p>
                                    </li>
                                </Tippy>
                                <li>
                                    <BsQuestionCircle size={20} />
                                    <p>Feedback and help</p>
                                </li>
                                <li onClick={() => setModal(true)}>
                                    <TbKeyboard size={20} />
                                    <p>Keyboard shortcuts</p>
                                </li>
                                <li>
                                    <CiDark size={20} />
                                    <p style={{ marginRight: 25 }}>Dark more</p>
                                    <div className={styles.switch} onClick={handelToggleSwitch} style={{ backgroundColor: localStorage.getItem("backgroundColor") || "rgb(207, 204, 204)" }}>
                                        <div ref={toggleTag} style={{ marginLeft: localStorage.getItem("marginLeft") || 0 }}></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <span onMouseOver={hoverOption} style={{ marginLeft: 10 }}>
                        <FaEllipsisV color={isDark ? '#fff' : '#000'} />
                    </span>
                </Tippy>
            </div>
            {/* modal */}
            <Modal modal={modal} setModal={setModal} />
        </>
    );
}

export default memo(Option);