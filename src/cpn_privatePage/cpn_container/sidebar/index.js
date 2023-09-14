import axios from "axios";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { BsHouseDoorFill } from "react-icons/bs"
import { MdPeopleOutline } from "react-icons/md"
import { RiHashtag } from "react-icons/ri"
import { HiMusicalNote } from "react-icons/hi2"
import { RiLiveLine } from "react-icons/ri"
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Tippy from "@tippyjs/react/headless";
import { ThemeContext } from "../../../App";


const Sidebar = () => {
    const { openModal, isDark, setRecAcc1s } = useContext(ThemeContext);

    const [appearRA, setAppearRA] = useState(false);
    const [discovers, setDiscovers] = useState([]);
    const [recAccs, setRecAccs] = useState([]);

    const listSA = useRef();
    const forYouTag = useRef();
    const followingTag = useRef();
    const liveTag = useRef();
    // click see all
    function handelClickSeeAll() {
        setAppearRA(true);
        listSA.current.style = "overflow:unset;height:unset";
    }
    // click see less
    function handelClickSeeLess() {
        setAppearRA(false);
        listSA.current.style = "overflow:hidden;height:calc(52px*5)";
    }
    //call api suggested accounts
    useEffect(() => {
        axios.get('https://duc12345-ba353ac50bd7.herokuapp.com/api/recAcc')
            .then(res => {
                setRecAccs(res.data);
                setRecAcc1s(res.data);
                axios.get('https://duc12345-ba353ac50bd7.herokuapp.com/api/discover')
                    .then(res => setDiscovers(res.data))
            })
    }, [])

    return (
        <div id={isDark ? styles.sidebarDark : styles.sidebar}>
            <ul>
                <li>
                    <Link to="/" ref={forYouTag}>
                        <BsHouseDoorFill style={{ fontSize: '2.3rem' }} />
                        <span>For You</span>
                    </Link>
                </li>
                <li>
                    <Link to="/following" ref={followingTag}>
                        <MdPeopleOutline style={{ fontSize: '2.3rem' }} />
                        <span>Following</span>
                    </Link>
                </li>
                <li>
                    <Link to="/live" ref={liveTag}>
                        <RiLiveLine style={{ fontSize: '2.3rem' }} />
                        <span>LIVE</span>
                    </Link>
                </li>
            </ul>
            <hr style={{ borderTop: "1px #f1f1f2 solid", margin: "14px 0px 20px 0", opacity: isDark ? 0 : 1, borderBottom: "1px transparent solid", borderLeft: "1px transparent solid", borderRight: "1px transparent solid" }}></hr>
            <p>Log in to follow creators, like videos, and view comments.</p>
            <button onClick={openModal}>Log in</button>
            <hr style={{ borderTop: isDark ? "1px  #202020 solid" : "1px  #f1f1f2 solid", margin: "22px 0px 20px 0", borderBottom: "1px transparent solid", borderLeft: "1px transparent solid", borderRight: "1px transparent solid" }}></hr>
            <h4>Suggested accounts</h4>
            {recAccs.length === 0 || <ul ref={listSA}>
                {recAccs.map((user, index) =>
                    <Tippy
                        key={index}
                        interactive
                        delay={[1100, 800]}
                        offset={[-30, -215]}
                        zIndex={1}
                        render={attrs => (
                            <div className={isDark ? styles.infoRecAccDark : styles.infoRecAcc} tabIndex="-1" {...attrs}>
                                <img src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${user.avatar}.jpg`} alt="" />
                                <h1>{user.name}</h1>
                                <p>{user.nickname}</p>
                                <p>
                                    <span>
                                        <span>{user.follow}</span>
                                        <span>Followers</span>
                                    </span>
                                    <span>
                                        <span>{user.like}</span>
                                        <span>Likes</span>
                                    </span>
                                </p>
                                <button onClick={openModal}>Follow</button>
                            </div>
                        )}
                    >
                        <li>
                            <Link to={`/@${user.name}`} >
                                <img src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${user.avatar}.jpg`} height={36} alt="" />
                                <div>
                                    <h4>{user.name}</h4>
                                    <p>{user.nickname}</p>
                                </div>
                            </Link>
                        </li>
                    </Tippy>
                )}
            </ul>
            }
            {
                recAccs.length === 0 && <div className={styles.loadingSugAcc}>
                    <Skeleton height={40} width={40} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} circle={true} />
                    <div>
                        <Skeleton width={150} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} style={{ borderRadius: 12 }} />
                        <Skeleton width={100} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} style={{ borderRadius: 12 }} />
                    </div>
                </div>
            }
            {recAccs.length !== 0 && (appearRA || <p onClick={handelClickSeeAll}>See all</p>)}
            {recAccs.length !== 0 && (appearRA && <p onClick={handelClickSeeLess}>See less</p>)}
            <hr style={{ borderTop: isDark ? "1px #202020 solid" : "1px #f1f1f2 solid", margin: "14px 0px 16px 0", borderBottom: "1px transparent solid", borderLeft: "1px transparent solid", borderRight: "1px transparent solid" }}></hr>
            <h4>Discover</h4>
            {
                discovers.length === 0 || <div className={isDark ? styles.discoverDark : styles.discover}>
                    {discovers.map((discover, index) =>
                        <div key={index}>
                            {discover.isMusic || <span><RiHashtag size={16} color={isDark ? '#eaeaea' : ''} /></span>}
                            {discover.isMusic && <span><HiMusicalNote size={16} color={isDark ? '#eaeaea' : ''} /></span>}
                            <p>{discover.content}</p>
                        </div>
                    )}
                </div>
            }
            {
                discovers.length === 0 && <div className={styles.loadingDisc}>
                    <Skeleton width={200} height={24} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} style={{ borderRadius: 12, marginBottom: 8 }} />
                    <Skeleton width={200} height={24} baseColor={isDark ? '#444744bb' : ""} highlightColor={isDark ? '5a5a5a' : ''} style={{ borderRadius: 12 }} />
                </div>
            }
            <hr style={{ borderTop: isDark ? "1px  #202020 solid" : "1px  #f1f1f2 solid", margin: "18px 0px 16px 0", borderBottom: "1px transparent solid", borderLeft: "1px transparent solid", borderRight: "1px transparent solid" }}></hr>
            <div className={isDark ? styles.contactDark : styles.contact}>
                <div>
                    <span>About</span>
                    <span>Newsroom</span>
                    <span>Contact</span>
                    <span>Careers</span>
                    <span>ByteDance</span>
                </div>
                <div>
                    <div>
                        <span>TikTok for Good</span>
                        <span>Advertise</span>
                        <span>Developers</span>
                        <span>Transparency</span>
                    </div>
                    <div>
                        <span>TikTok Rewards</span>
                        <span>TikTok Browse</span>
                        <span>TikTok Embeds</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Help</span>
                        <span>Safety</span>
                        <span>Terms</span>
                        <span>Privacy</span>
                        <span>Creator Portal</span>
                    </div>
                    <div>
                        <span>Community Guidelines</span>
                    </div>
                </div>
                <div style={{ marginTop: 10 }}>
                    <span>© 2022 TikTok</span>
                </div>
            </div>
        </div>
    )
}

export default memo(Sidebar);