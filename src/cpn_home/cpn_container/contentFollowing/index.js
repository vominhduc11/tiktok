import { forwardRef } from "react";
import { useContext, useEffect, useRef } from "react";
import { AiFillStepForward } from "react-icons/ai";
import { ThemeContext } from "../../../App";
import styles from "./style.module.scss"

function Following() {
    const { isDark, openModal, handleClickFollowing } = useContext(ThemeContext);

    const btnFirstPageTag = useRef();
    const wrapTag = useRef();

    function returnHead() {
        setTimeout(() => {
            wrapTag.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 300);
    }

    function handleScroll(param) {
        if (param.scrollTop === 0) {
            btnFirstPageTag.current.style.bottom = '-32px';
        } else {
            btnFirstPageTag.current.style.bottom = '8px';
        }
    }

    useEffect(() => {
        handleClickFollowing();
        document.querySelector("title").innerText = "Following - Watch videos from creators you follow";
    }, []);

    return (
        <div id={isDark ? styles.wrapDark : styles.wrap} onScroll={(e) => handleScroll(e.currentTarget)}>
            <div ref={wrapTag}>
                <div id={styles.following}>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <video src="https://v16-webapp.tiktok.com/c9b8dd480302faa1ef5363c7d14e097c/63bfd077/video/tos/alisg/tos-alisg-pve-0037/oYI9UQAsKEM3AMzxyfuQNLkPwgBBThEwoOoFA6/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=4b~OyM3a8Zmo0tTpW64jVoN6PpWrKsdm&mime_type=video_mp4&qs=0&rc=PGRlPGVoNTo3Mzk2OGZkOUBpM2VqNjQ6ZjxraDMzODgzNEAwM19eM2NgXmIxYWBiNS1jYSNscG1tcjRnLXJgLS1kLy1zcw%3D%3D&l=2023011203181888E3EFDB58C32103C413&btag=80000"></video>
                        <div>
                            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1673578800&x-signature=IvjMBVFq9P4BrocRN20gk4Mrurk%3D" alt="" />
                            <h4>Theanh28</h4>
                            <p>theanh28entertaiment</p>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    </div>
                </div>
            </div>
            <span
                ref={btnFirstPageTag}
                onClick={returnHead}
                style={{ position: 'fixed', bottom: -32, right: '2.5%', transform: "rotate(-90deg)", backgroundColor: "rgba(255, 59, 92, 1)", color: "#fff", width: 32, height: 32, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', cursor: 'pointer', transition: 'bottom 0.2s linear' }}>
                <AiFillStepForward />
            </span>
        </div>
    );
}

export default Following;