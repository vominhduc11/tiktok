import { forwardRef, memo, useContext, useEffect, useRef, useState } from "react"
import styles from "./style.module.scss"
import { HiMusicNote } from "react-icons/hi";
import { AiFillHeart, AiFillMessage, AiFillStepForward } from "react-icons/ai";
import { RiShareForwardFill } from "react-icons/ri"
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { RiVolumeMuteFill } from "react-icons/ri";
import Tippy from "@tippyjs/react/headless";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { ThemeContext } from "../../App";
import useDebounce from "./useDebounce";
import clsx from "clsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../App";
import ReactLoading from 'react-loading';
import ReactPlayer from "react-player";

const ForYou = () => {
    // use useContext in order to get data
    const { openModal, isDark, handleClickForYou } = useContext(ThemeContext);
    // const { wrapVideoTag } = useContext(ThemeContextContainer);
    // state
    const [valVol, setValVol] = useState("0");
    const [valueScroll, setValueScroll] = useState();
    const [show, setShow] = useState(false);
    const [playVidFirst, setPlayVidFirst] = useState(true);
    const [posts, setPosts] = useState([]);
    const [firstPost, setFirstPost] = useState();
    //ref
    const contentTag = useRef();
    const prevValVol = useRef("5");
    const btnFirstPageTag = useRef();
    const wrapVideoTag = useRef();
    const count = useRef(1);
    //debounce
    const debounce = useDebounce(valueScroll, 600);
    // play video
    function playVid() {
        document.querySelector(".playVid").parentElement.querySelector(".hidden").classList.remove("hidden");
        document.querySelector(".playVid").parentElement.querySelector(".playIcon").classList.add("hidden");
        document.querySelector(".playVid").querySelector("video").play();
    }
    //pause video
    function pauseVid() {
        document.querySelector(".playVid").parentElement.querySelector(".hidden").classList.remove("hidden");
        document.querySelector(".playVid").parentElement.querySelector(".pauseIcon").classList.add("hidden");
        document.querySelector(".playVid").querySelector("video").pause();
    }
    //off volume
    function unmute() {
        if (valVol === "0") {
            document.querySelectorAll("video").forEach(ele => {
                if (ele.muted) {
                    ele.muted = false;
                }
            })
        }
        setValVol(prevValVol.current);
    }
    //on volume
    function mute() {
        prevValVol.current = valVol;
        setValVol("0");
    }
    //change volume
    function changeVol(e) {
        //set value of volume
        setValVol(e.target.value);

        document.querySelectorAll("video").forEach(ele => {
            ele.muted = false;
        })
        document.querySelector(".playVid").parentElement.querySelector(".volOn").style.opacity = 1;
    }
    //handel when scroll content
    function handleScroll(param) {
        setValueScroll(param.scrollTop);
        if (param.scrollTop === 0) {
            btnFirstPageTag.current.style.bottom = '-32px';
        } else {
            btnFirstPageTag.current.style.bottom = '8px';
        }

        if (param.offsetHeight + param.scrollTop >= param.scrollHeight - 10) {

            if (show === false) {
                setShow(true);

                axios.get(`https://duc12345-ba353ac50bd7.herokuapp.com/api/posts?q=${count.current}`)
                    .then(res => {
                        setShow(false);
                        setPosts([...posts, ...res.data]);
                        count.current = count.current + 1;
                    })
            }
        }
    }
    //change watching video
    useEffect(() => {
        if (debounce === undefined) {
            return;
        }
        let max = document.querySelectorAll("video")[0];
        document.querySelectorAll("video").forEach(ele => {
            if (Math.floor(ele.getBoundingClientRect().top - 60) <= 450) {
                if (Math.floor(ele.getBoundingClientRect().top - 60) > Math.floor(max.getBoundingClientRect().top - 60)) {
                    max = ele;
                }
            }
        })

        if (!max.parentElement.classList.contains("playVid")) {
            if (playVidFirst === true) {
                setPlayVidFirst(false);
            }

            pauseVid();
            document.querySelector(".playVid").querySelector("video").currentTime = 0;
            document.querySelector(".playVid").classList.toggle("playVid");
            max.parentElement.classList.toggle("playVid");
            playVid();
        }
    }, [debounce])


    function showContr(param) {
        param.children[1].style.opacity = '1';
        if (Number(valVol) !== 0) {
            param.children[2].children[0].style.opacity = '1';
        }
    }

    function hideContr(param) {
        param.children[1].style.opacity = '0';
        if (Number(valVol) !== 0) {
            param.children[2].children[0].style.opacity = '0';
        }
    }

    //set height for video element
    function heightVid(param) {
        param.parentElement.parentElement.style.height = "";
        param.parentElement.parentElement.style.width = "";
    }

    // call api posts
    useEffect(() => {
        handleClickForYou();
        document.querySelector("title").innerText = "Tiktok - Make your day";
        axios.get(`https://duc12345-ba353ac50bd7.herokuapp.com/api/postsFirst?q=${count.current}`)
            .then(res => {
                setFirstPost(res.data[0]);
                res.data.shift();
                setPosts(res.data);
                count.current = count.current + 1;
            })
    }, [])
    //return head page
    function returnHead() {
        setTimeout(() => {
            wrapVideoTag.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 300);
    }
    //render ui
    return (
        <div id={isDark ? styles.wrapDark : styles.wrap} onScroll={(e) => handleScroll(e.currentTarget)}>
            <div id={isDark ? styles.contentDark : styles.content} ref={contentTag}>
                {posts.length === 0 || <div ref={wrapVideoTag} >
                    {firstPost === undefined || <div className={isDark ? styles.postUsersDark : styles.postUsers}>
                        <Tippy
                            interactive
                            offset={[110, 4]}
                            delay={[700, 500]}
                            placement='bottom'
                            popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                            zIndex={1}
                            render={attrs => (
                                <div className={isDark ? styles.infoUserPostDark : styles.infoUserPost} tabIndex="-1" {...attrs}>
                                    <Link target="_blank" to={`/@${firstPost.name}`}><img src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${firstPost.avatar}.jpg`} alt=""></img></Link>
                                    <Link to={`/@${firstPost.name}`}>
                                        <div>
                                            <h5>{firstPost.name}</h5>
                                            <p>{firstPost.nickname}</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <span>
                                            <span>{firstPost.followers}</span>
                                            Followers
                                        </span>
                                        <span>
                                            <span>{firstPost.likes}</span>
                                            likes
                                        </span>
                                    </div>
                                    <button onClick={openModal}>Follow</button>
                                </div>
                            )}
                        >
                            <Link to={`/@${firstPost.name}`} style={{ display: 'inline-block', height: 54, width: 54 }}><img height={54} src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${firstPost.avatar}.jpg`} alt="" /></Link>
                        </Tippy>
                        <div>
                            <Tippy
                                interactive
                                offset={[-20, 40]}
                                delay={[700, 500]}
                                zIndex={1}
                                render={attrs => (
                                    <div className={isDark ? styles.infoUserPostDark : styles.infoUserPost} tabIndex="-1" {...attrs}>
                                        <Link to={`/@${firstPost.name}`}><img src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${firstPost.avatar}.jpg`} alt=""></img></Link>
                                        <Link to={`/@${firstPost.name}`}>
                                            <div>
                                                <h5>{firstPost.name}</h5>
                                                <p>{firstPost.nickname}</p>
                                            </div>
                                        </Link>
                                        <div>
                                            <span>
                                                <span>{firstPost.followers}</span>
                                                Followers
                                            </span>
                                            <span>
                                                <span>{firstPost.likes}</span>
                                                likes
                                            </span>
                                        </div>
                                        <button onClick={openModal}>Follow</button>
                                    </div>
                                )}
                            >
                                <Link to={`/@${firstPost.name}`}>
                                    <div>
                                        <span>{firstPost.name}</span>
                                        <span>{firstPost.nickname}</span>
                                    </div>
                                </Link>
                            </Tippy>
                            <div>
                                <span>{firstPost.content}</span>
                                {firstPost.links.map((ele, index) =>
                                    <span key={index} className={isDark ? styles.attachDark : styles.attach}>#{ele.link}</span>
                                )}
                            </div>
                            <p>
                                <HiMusicNote style={{ marginRight: 5 }} />
                                {firstPost.music}

                            </p>
                            <div>
                                <div onMouseOver={(e) => { showContr(e.currentTarget) }} onMouseOut={(e) => { hideContr(e.currentTarget) }} style={{ height: 491, width: 276 }}>
                                    <ReactPlayer onReady={(e) => { heightVid(e.getInternalPlayer()) }} muted volume={valVol / 10} width={"100%"} height='100%' playing={playVidFirst} loop url={`https://res.cloudinary.com/dh1mwnnyl/video/upload/v1/tiktok/video/${firstPost.video}.mp4`} className="playVid" />
                                    {/* <video width={'100%'} autoPlay loop muted src={`https://res.cloudinary.com/dszxfxzig/video/upload/v11/videos/${firstPost.video}.mp4`}  ></video> */}
                                    <span style={{ opacity: 0, transition: 'opacity 0.15s linear' }}>
                                        <BsPauseFill className="pauseIcon" color="#fff" size="26" style={{ position: 'absolute', right: 22, bottom: 35, cursor: 'pointer' }} onClick={pauseVid} />
                                        <BsPlayFill className={clsx("playIcon", "hidden")} color="#fff" size="26" style={{ position: 'absolute', right: 22, bottom: 35, cursor: 'pointer' }} onClick={playVid} />
                                    </span>
                                    <Tippy
                                        interactive
                                        offset={[32, 86]}
                                        hideOnClick={false}
                                        render={attrs => (
                                            <div className={styles.wrapVolBar} tabIndex="-1" {...attrs} >
                                                <input className={styles.volBar} type={'range'} value={valVol} step="0.1" min="0" max="10" onChange={(e) => { changeVol(e) }} />
                                            </div>
                                        )}
                                    >
                                        <span>
                                            {/* {Number(valVol) === 0 && <RiVolumeMuteFill style={{ position: 'absolute', right: 22, bottom: 35, cursor: 'pointer' }} color="#fff" size="23" onClick={unmute} />}
                                            {Number(valVol) !== 0 && <IoVolumeMediumOutline className="volOn" style={{ position: 'absolute', right: 22, bottom: 35, cursor: 'pointer', opacity: 0, transition: 'opacity 0.15s linear' }} color="#fff" size="25" onClick={mute} />} */}
                                            {Number(valVol) !== 0 && <IoVolumeMediumOutline className="volOn" style={{ position: 'absolute', left: 22, bottom: 35, cursor: 'pointer', opacity: 0, transition: 'opacity 0.15s linear' }} color="#fff" size="25" onClick={mute} />}
                                            {Number(valVol) === 0 && <RiVolumeMuteFill style={{ position: 'absolute', left: 22, bottom: 35, cursor: 'pointer' }} color="#fff" size="23" onClick={unmute} />}
                                        </span>
                                    </Tippy>
                                </div>
                                <div>
                                    <div onClick={openModal}>
                                        <span><AiFillHeart size={24} /></span>
                                        <span>{firstPost.userLike}</span>
                                    </div>
                                    <div onClick={openModal}>
                                        <span><AiFillMessage size={24} /></span>
                                        <span>{firstPost.userComment}</span>
                                    </div>
                                    <div onClick={openModal}>
                                        <span><RiShareForwardFill size={24} /></span>
                                        <span>{firstPost.userShare}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={openModal}>Follow</button>
                    </div>}

                    {posts.map((post, index) =>
                        <div key={index} className={isDark ? styles.postUsersDark : styles.postUsers}>
                            <Tippy
                                interactive
                                delay={[700, 500]}
                                offset={[110, 4]}
                                placement='bottom'
                                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                                zIndex={1}
                                render={attrs => (
                                    <div className={isDark ? styles.infoUserPostDark : styles.infoUserPost} tabIndex="-1" {...attrs}>
                                        <Link target="_blank" to={`/@${post.name}`}><img src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${post.avatar}.jpg`} alt=""></img></Link>
                                        <Link to={`/@${post.name}`}>
                                            <div>
                                                {console.log(post.nickname)}
                                                <h5>{post.name}</h5>
                                                <p>{post.nickname}</p>
                                            </div>
                                        </Link>
                                        <div>
                                            <span>
                                                <span>{post.followers}</span>
                                                Followers
                                            </span>
                                            <span>
                                                <span>{post.likes}</span>
                                                likes
                                            </span>
                                        </div>
                                        <button onClick={openModal}>Follow</button>
                                    </div>
                                )}
                            >
                                {/* <Link to={`@${post.name}`} style={{ borderRadius: '50%' }}><img height="54" src={`https://res.cloudinary.com/dszxfxzig/image/upload/v1673595714/images/posts/${post.avatar}.jpg`} alt="" /></Link> */}
                                <Link to={`/@${post.name}`} style={{ height: 54, width: 54 }}><img height={54} src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${post.avatar}.jpg`} alt="" /></Link>
                            </Tippy>
                            <div>
                                <Tippy
                                    interactive
                                    offset={[-72, 40]}
                                    delay={[700, 500]}
                                    placement="bottom-start"
                                    popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                                    zIndex={1}
                                    render={attrs => (
                                        <div className={isDark ? styles.infoUserPostDark : styles.infoUserPost} tabIndex="-1" {...attrs}>
                                            <Link to={`/@${post.name}`}><img src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${post.avatar}.jpg`} alt=""></img></Link>
                                            <Link to={`/@${post.name}`}>
                                                <div>
                                                    <h5>{post.name}</h5>
                                                    <p>{post.nickname}</p>
                                                </div>
                                            </Link>
                                            <div>
                                                <span>
                                                    <span>{post.followers}</span>
                                                    Followers
                                                </span>
                                                <span>
                                                    <span>{post.likes}</span>
                                                    likes
                                                </span>
                                            </div>
                                            <button onClick={openModal}>Follow</button>
                                        </div>
                                    )}
                                >
                                    <Link to={`/@${post.name}`}>
                                        <div>
                                            <span>{post.name}</span>
                                            <span>{post.nickname}</span>
                                        </div>
                                    </Link>
                                </Tippy>
                                <div>
                                    <span>{post.content}</span>
                                    {post.links.map((ele, index) =>
                                        <span key={index} className={isDark ? styles.attachDark : styles.attach}>#{ele.link}</span>
                                    )}
                                </div>
                                <p>
                                    <HiMusicNote style={{ marginRight: 5 }} />
                                    {post.music}
                                </p>
                                <div>
                                    <div onMouseOver={(e) => { showContr(e.currentTarget) }} onMouseOut={(e) => { hideContr(e.currentTarget) }} style={{ height: 491, width: 276 }}>
                                        <ReactPlayer onReady={(e) => { heightVid(e.getInternalPlayer()) }} volume={valVol / 10} width={"100%"} height={"100%"} loop url={`https://res.cloudinary.com/dh1mwnnyl/video/upload/v1/tiktok/video/${post.video}.mp4`} />
                                        {/* <video preload="auto" width={'100%'} muted loop src={`https://res.cloudinary.com/dszxfxzig/video/upload/v1/videos/${post.video}.mp4`}></video> */}
                                        <span style={{ opacity: 0, transition: 'opacity 0.15s linear' }}>
                                            <BsPauseFill className={clsx("pauseIcon", "hidden")} color="#fff" size="26" style={{ position: 'absolute', right: 22, bottom: 35, cursor: 'pointer' }} onClick={pauseVid} />
                                            <BsPlayFill className="playIcon" color="#fff" size="26" style={{ position: 'absolute', right: 22, bottom: 35, cursor: 'pointer' }} onClick={playVid} />
                                        </span>
                                        <Tippy
                                            interactive
                                            offset={[32, 86]}
                                            hideOnClick={false}
                                            render={attrs => (
                                                <div className={styles.wrapVolBar} tabIndex="-1" {...attrs}>
                                                    <input className={styles.volBar} type={'range'} value={valVol} step="0.1" min="0" max="10" onChange={(e) => { changeVol(e) }} />
                                                </div>
                                            )}
                                        >
                                            <span>
                                                {Number(valVol) === 0 && <RiVolumeMuteFill color="#fff" size="23" style={{ position: 'absolute', left: 22, bottom: 35, cursor: 'pointer' }} onClick={unmute} />}
                                                {Number(valVol) !== 0 && <IoVolumeMediumOutline className="volOn" color="#fff" size="25" style={{ position: 'absolute', left: 22, bottom: 35, cursor: 'pointer', opacity: 0, transition: 'opacity 0.15s linear' }} onClick={mute} />}
                                            </span>
                                        </Tippy>
                                    </div>
                                    <div>
                                        <div onClick={openModal}>
                                            <span><AiFillHeart size={24} /></span>
                                            <span>{post.userLike}</span>
                                        </div>
                                        <div onClick={openModal}>
                                            <span><AiFillMessage size={24} /></span>
                                            <span>{post.userComment}</span>
                                        </div>
                                        <div onClick={openModal}>
                                            <span><RiShareForwardFill size={24} /></span>
                                            <span>{post.userShare}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={openModal}>Follow</button>
                        </div>
                    )}
                    {true && <div style={{ padding: '0 300px', position: 'absolute', bottom: 0, opacity: show ? 1 : 0 }}><ReactLoading height={50} type="bubbles" color="red" /></div>}
                </div>}



                {posts.length === 0 && <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 180 }}>
                    <div style={{ display: 'flex' }}>
                        <Skeleton width={54} height={54} style={{ borderRadius: '100%' }} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} />
                        <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Skeleton width={320} height={20} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} />
                            <Skeleton width={280} height={20} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} />
                        </div>
                    </div>
                    <Skeleton width={500} height={20} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} style={{ marginLeft: 73 }} />
                    <Skeleton width={500} height={20} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} style={{ marginLeft: 73 }} />
                </div>}
            </div>


            <span
                ref={btnFirstPageTag}
                onClick={returnHead}
                style={{ position: 'fixed', bottom: -32, right: '2.5%', transform: "rotate(-90deg)", backgroundColor: "rgba(255, 59, 92, 1)", color: "#fff", width: 32, height: 32, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', cursor: 'pointer', transition: 'bottom 0.2s linear' }}>
                <AiFillStepForward />
            </span>
        </div>
    )
}

export default memo(forwardRef(ForYou));




