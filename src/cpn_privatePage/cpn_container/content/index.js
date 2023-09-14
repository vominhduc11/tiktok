import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef, useState } from "react";
import { AiFillStepForward, AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../App";
import styles from "./style.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

function Content() {
    const location = useLocation();
    const { isDark, openModal } = useContext(ThemeContext);

    const [active, setActive] = useState(1);
    const [playVidFirst, setPlayVidFirst] = useState(true);
    const [showVideo, setShowVideo] = useState(true);
    const [user, setUser] = useState();


    const changeContent = useRef();
    const btnFirstPageTag = useRef();
    const wrapTag = useRef();
    const index = useRef(1);

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

    function showVidPrivate() {
        index.current = 1;
        setActive(index.current);
        setShowVideo(true)
    }

    function showVidLiked() {
        index.current = 2;
        setActive(index.current);
        setShowVideo(false)
        setPlayVidFirst(true)
    }

    function playVid(param) {
        if (param.classList.contains("playVidPrivate")) {
            return;
        } else {
            if (playVidFirst === true) {
                setPlayVidFirst(false);
            }

            document.querySelector(".playVidPrivate").querySelector("video").pause();
            document.querySelector(".playVidPrivate").querySelector("video").currentTime = 0;

            document.querySelector(".playVidPrivate").classList.remove("playVidPrivate");
            param.classList.add("playVidPrivate");
            console.log(document.querySelector(".playVidPrivate").querySelector("video"));
            document.querySelector(".playVidPrivate").querySelector("video").play();
        }
    }

    useEffect(() => {
        axios.get(`https://duc12345-ba353ac50bd7.herokuapp.com/api/user?q=${location.pathname.slice(2)}`)
            .then(res => setUser(res.data));
    }, [])

    return (
        <div id={isDark ? styles.contentDark : styles.content} onScroll={(e) => handleScroll(e.currentTarget)}>
            <div ref={wrapTag}>
                {user === undefined || <>
                    <div>
                        <div>
                            <img height={116} width={116} src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${user.avatar}.jpg`} alt="" />
                            <div>
                                <h3>{user.name}</h3>
                                <p>{user.nickname}</p>
                                <button onClick={openModal}>Follow</button>
                            </div>
                        </div>
                        <div>
                            <span>
                                <span>{user.following}</span> Following
                            </span>
                            <span>
                                <span>{user.followers}</span> Followers
                            </span>
                            <span>
                                <span>{user.likes}</span> Likes
                            </span>
                        </div>
                        <p>{user.content.split("\n").map((ct, index) => (<><span key={index} style={{ marginTop: 12 }}>{ct}</span><br /></>))}</p>
                    </div>
                    <div>
                        {isDark || <div>
                            <div onMouseOut={() => { index.current === 1 ? changeContent.current.style.transform = 'translateX(0%)' : changeContent.current.style.transform = 'translateX(100%)' }} onMouseOver={() => changeContent.current.style.transform = 'translateX(0%)'} onClick={showVidPrivate} style={{ color: active === 1 ? "" : "rgba(22, 24, 35, 0.5)" }}>Videos</div>
                            <div onMouseOut={() => { index.current === 2 ? changeContent.current.style.transform = 'translateX(100%)' : changeContent.current.style.transform = 'translateX(0%)' }} onMouseOver={() => changeContent.current.style.transform = 'translateX(100%)'} onClick={showVidLiked} style={{ color: active === 2 ? "#000" : "" }}><HiLockClosed style={{ marginRight: 4 }} />Liked</div>
                        </div>}
                        {!isDark || <div>
                            <div onMouseOut={() => { index.current === 1 ? changeContent.current.style.transform = 'translateX(0%)' : changeContent.current.style.transform = 'translateX(100%)' }} onMouseOver={() => changeContent.current.style.transform = 'translateX(0%)'} onClick={showVidPrivate} style={{ color: active === 1 ? "" : "rgba(255, 255, 255, 0.5)" }}>Videos</div>
                            <div onMouseOut={() => { index.current === 2 ? changeContent.current.style.transform = 'translateX(100%)' : changeContent.current.style.transform = 'translateX(0%)' }} onMouseOver={() => changeContent.current.style.transform = 'translateX(100%)'} onClick={showVidLiked} style={{ color: active === 2 ? "#fff" : "" }}><HiLockClosed style={{ marginRight: 4 }} />Liked</div>
                        </div>}
                        <div ref={changeContent}></div>
                    </div>
                    {showVideo && <div>
                        {user.posts.lentgh === 0 || user.posts.map((post, index) => {
                            if (index === 0) {
                                return (<div key={index} onMouseOver={(e) => { playVid(e.currentTarget) }} className="playVidPrivate">
                                    <ReactPlayer onReady={(e) => { console.log(e.getInternalPlayer().style.height); e.getInternalPlayer().parentElement.parentElement.children[2].style.display = "none"; e.getInternalPlayer().parentElement.parentElement.children[1].style.display = "block" }} playing={playVidFirst} muted loop width={187} height={250} url={`https://res.cloudinary.com/dh1mwnnyl/video/upload/v1/tiktok/video/${post.video}.mp4`} />
                                    <p style={{ display: 'none' }}>{post.content}{post.links.map((link, index) => <span key={index} style={{ fontWeight: '700' }}>#{link.link}</span>)}</p>
                                    <div>
                                        {isDark || <Skeleton baseColor="#dedede" highlightColor="#d1d1d1" style={{ zIndex: 0, position: 'absolute', top: 0, bottom: 30 }} />}
                                        {!isDark || <Skeleton baseColor="#353535" highlightColor="#2a2b2b" style={{ position: 'absolute', top: 0, bottom: 30 }} />}
                                    </div>
                                </div>)
                            } else {
                                return (<div key={index} onMouseOver={(e) => { playVid(e.currentTarget) }} >
                                    <ReactPlayer onReady={(e) => { e.getInternalPlayer().parentElement.parentElement.children[2].style.display = "none"; e.getInternalPlayer().parentElement.parentElement.children[1].style.display = "block" }} muted loop width={187} height={250} url={`https://res.cloudinary.com/dh1mwnnyl/video/upload/v1/tiktok/video/${post.video}.mp4`} />
                                    <p style={{ display: 'none' }}>{post.content}</p>
                                    <div>
                                        {isDark || <Skeleton baseColor="#dedede" highlightColor="#d1d1d1" style={{ zIndex: 0, position: 'absolute', top: 0, bottom: 30 }} />}
                                        {!isDark || <Skeleton baseColor="#353535" highlightColor="#2a2b2b" style={{ position: 'absolute', top: 0, bottom: 30 }} />}
                                    </div>
                                </div>)
                            }
                        })}
                        {user.posts.length === 0 && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', marginLeft: 'unset', width: "100%" }}>
                            <div style={{ textAlign: 'center' }}>
                                <AiOutlineUser size={90} color={isDark ? '#5a5a5a' : 'rgba(22, 24, 35, 0.75)'} />
                                <div style={{ marginTop: 30 }}>
                                    <h2 style={{ color: isDark ? 'rgba(255, 255, 255, 0.9)' : '' }}>No content</h2>
                                    <p style={{ marginTop: 5, color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(22, 24, 35, 0.75)' }}>This user has not published any videos.</p>
                                </div>
                            </div>
                        </div>}
                    </div>}
                    {!showVideo && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', marginLeft: 'unset' }}>
                        <div style={{ textAlign: 'center' }}>
                            <BiLockAlt size={90} color={isDark ? '#5a5a5a' : 'rgba(22, 24, 35, 0.75)'} />
                            <div style={{ marginTop: 30 }}>
                                <h2 style={{ color: isDark ? 'rgba(255, 255, 255, 0.9)' : '' }}>This user's liked videos are private</h2>
                                <p style={{ marginTop: 5, color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(22, 24, 35, 0.75)' }}>Videos liked by {user.name} are currently hidden</p>
                            </div>
                        </div>
                    </div>}
                </>}
                {user === undefined && <div style={{ display: 'flex' }}>
                    {isDark || <Skeleton borderRadius={'50%'} width={116} height={116} />}
                    {!isDark || <Skeleton borderRadius={'50%'} width={116} height={116} baseColor='#444744bb' highlightColor="#5a5a5a" />}
                    {isDark || <div style={{ marginTop: 'unset', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: 20 }}>
                        <Skeleton width={300} height={25} />
                        <Skeleton width={200} height={25} />
                    </div>}
                    {!isDark || <div style={{ marginTop: 'unset', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: 20 }}>
                        <Skeleton width={300} height={25} baseColor='#444744bb' highlightColor="#5a5a5a" />
                        <Skeleton width={200} height={25} baseColor='#444744bb' highlightColor="#5a5a5a" />
                    </div>}
                </div>}
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

export default Content;
