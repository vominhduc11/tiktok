import styles from "./style.module.scss";

import { BsCaretUpSquare, BsCaretDownSquare } from "react-icons/bs"
import { HiOutlineXMark } from "react-icons/hi2"
import { useContext, useRef } from "react";
import { ThemeContext } from "../../../../App";

function Modal({ modal, setModal }) {
    const { isDark } = useContext(ThemeContext);
    let modalTag = useRef();
    let bodyModalTag = useRef();

    function closeModal() {
        modalTag.current.style.opacity = 0;
        bodyModalTag.current.style = 'transform:scale(15%);opacity:0.15';

        bodyModalTag.current.ontransitionend = function () {
            setModal(false);
        }
    }

    return (
        <>
            {modal && <div id={styles.wrap}>
                <div id={styles.modal} ref={modalTag}></div>
                <div id={isDark ? styles.bodyModalDark : styles.bodyModal} ref={bodyModalTag}>
                    <h2 className={styles.title}>Phím tắt trên bàn phím</h2>
                    <hr style={{ borderTop: '1px solid #e3e3e4', borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}></hr>
                    <div>
                        Quay về video trước
                        <BsCaretUpSquare size={19} />
                    </div>
                    <hr style={{ borderTop: '1px solid #e3e3e4', borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}></hr>
                    <div>
                        Đi đến video tiếp theo
                        <BsCaretDownSquare size={19} />
                    </div>
                    <hr style={{ borderTop: '1px solid #e3e3e4', borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}></hr>
                    <div>
                        Thích video
                        <span className={isDark ? styles.likeVidDark : styles.likeVid}>L</span>
                    </div>
                    <hr style={{ borderTop: '1px solid #e3e3e4', borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}></hr>
                    <div>
                        Tắt tiếng/ bật tiếng video
                        <span className={isDark ? styles.optVolDark : styles.optVol}>M</span>
                    </div>
                    <hr style={{ borderTop: '1px solid #e3e3e4', borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}></hr>
                    <span onClick={closeModal} style={{ height: 24, width: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', position: "absolute", top: 18, right: 18, cursor: 'pointer', borderRadius: '50%', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '' }}><HiOutlineXMark size={20} /></span>
                </div>
            </div>}
        </>
    );
}

export default Modal;