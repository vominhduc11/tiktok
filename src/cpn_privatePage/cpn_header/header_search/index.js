
import { RiCloseFill } from "react-icons/ri";
import { AiOutlineSearch, AiFillCheckCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import Tippy from '@tippyjs/react/headless';
import { memo, useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import useDebounce from "./useDebounce";
import { ThemeContext } from "../../../App";

function Search() {
    const { isDark } = useContext(ThemeContext);

    const [close, setClose] = useState(false);
    const [value, setValue] = useState('');
    const [load, setLoad] = useState(false);
    const [accounts, setAccount] = useState([]);
    const [typeInput, setTypeInput] = useState();
    const [visible, setVisible] = useState(false);
    const [borderSearch, setBorderSearch] = useState(false);

    const debounce = useDebounce(value, 500);

    //get input tag
    let inputTag = useRef();

    //close and open list account
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    //handel when change value input 
    const handelSearch = (e) => {
        setValue(e.target.value);
        setClose(true)

        if (e.target.value === '') {
            hide();
            setClose(false);
        }
    }
    //handel when click close icon
    const handelCloseSearch = () => {
        hide();
        setValue('');
        setClose(false);
        inputTag.current.focus();
    }

    useEffect(() => {
        if (debounce !== false && debounce.trim() !== '') {
            //handel when correct condition
            hide();
            setLoad(true);
            setTypeInput(debounce);
            // call api which is list user 
            axios.get(`https://duc12345-ba353ac50bd7.herokuapp.com/api/userSearch?q=${debounce}`)
                .then((res) => {
                    setLoad(false);
                    setAccount(res.data);

                    if (res.data.length === 0) {
                        hide();
                    } else {
                        show();
                    }
                })
        } else {
            setAccount([])
            return;
        }
    }, [debounce]);
    //render into dom
    return (
        <div className={isDark ? styles.searchDark : styles.search} style={borderSearch ? { border: "0.2px solid  rgb(131, 129, 129)" } : { border: '' }}>

            <Tippy
                interactive
                visible={visible}
                onClickOutside={hide}
                offset={[26, 9]}
                render={attrs => (
                    <div className={isDark ? styles.usersDark : styles.users} tabIndex="-1" {...attrs}>
                        <h4>Accounts</h4>
                        <ul>
                            {accounts.map((account, index) =>
                                <li key={index}>
                                    <Link to={`/@${account.name}`}>
                                        <img className={styles.avatar} src={`https://res.cloudinary.com/dh1mwnnyl/image/upload/v16/tiktok/image/${account.avatar}.jpg`} alt="" />
                                        <div className={styles.infoUser}>
                                            <h4>{account.name}
                                                <div className={styles.wrapIcon}>
                                                    <AiFillCheckCircle style={{ color: 'rgb(32, 213, 236)' }} />
                                                </div>
                                            </h4>
                                            <p>{account.nickname}</p>
                                        </div>
                                    </Link>

                                </li>
                            )}
                        </ul>
                        <p>View all results for "{typeInput}"</p>
                    </div>
                )}
            >
                <input
                    ref={inputTag}
                    placeholder='Search accounts and videos'
                    value={value}
                    onChange={(e) => { handelSearch(e) }}
                    onClick={accounts.length === 0 ? hide : show}
                    onFocus={() => setBorderSearch(isDark ? false : true)}
                    onBlur={() => setBorderSearch(false)}
                />
            </Tippy>
            {/* search button */}
            <button>
                <AiOutlineSearch size={25} style={{ color: '#4c4e57' }} />
            </button>
            {/* separate */}
            <div></div>
            {/* load and close*/}
            {close && (load ? <div className={styles.BiLoaderAlt}><BiLoaderAlt /></div> :
                <div className={isDark ? styles.RiCloseFillDark : styles.RiCloseFill} onClick={handelCloseSearch}><RiCloseFill /></div>)
            }
        </div>
    );
}

export default memo(Search);