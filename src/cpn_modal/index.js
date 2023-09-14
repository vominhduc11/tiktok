import styles from "./style.module.scss";
import { AiOutlineQrcode, AiOutlineUser, AiOutlineTwitter, AiFillApple } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill, RiLineFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { forwardRef, memo, useContext } from "react";
import FacebookLogin from "react-facebook-login";
import { ThemeContext } from "../App";

function Modal() {
    const { closeSignIn, isOpenModal, hidden, sethidden, isModalSignIn, setIsModalSignIn, isDark, wrapTag, bodyModalTag, modalTag } = useContext(ThemeContext);

    function responseFacebook(response) {
        console.log(response);
    }

    function componentClicked(data) {
        console.warn(data);
    }
    return (
        <>
            {isOpenModal && <div id={styles.wrap} ref={wrapTag}>
                <div className={styles.modal} ref={modalTag}></div>
                <div className={isDark ? styles.bodyDark : styles.body} ref={bodyModalTag}>
                    {isModalSignIn || <div>
                        <h1>Log in to TikTok</h1>
                        <div><AiOutlineQrcode size={20} style={{ position: 'absolute', left: '12px' }} />Use QR code</div>
                        <div><AiOutlineUser size={20} style={{ position: 'absolute', left: '12px' }} />Use phone / email / username</div>
                        <div><BsFacebook size={20} color={'#0075fa'} style={{ position: 'absolute', left: '12px', backgroundColor: '#fff', borderRadius: '50%' }} />Continue with Facebook</div>
                        <div><FcGoogle size={20} style={{ position: 'absolute', left: '12px' }} />Continue with Google</div>
                        <div><AiOutlineTwitter size={20} color={'rgb(29, 161, 242)'} style={{ position: 'absolute', left: '12px' }} />Continue with Twitter</div>
                        <div>
                            <span style={{ backgroundColor: '#00b900', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: 2, position: 'absolute', left: '12px' }}>
                                <RiLineFill size={16} color={'#fff'} />
                            </span>
                            Continue with LINE</div>
                        <div>
                            <span style={{ backgroundColor: '#fbe300', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: 2, position: 'absolute', left: '12px' }}>
                                <RiKakaoTalkFill color="#000" size={16} />
                            </span>
                            Continue with KakaoTalk</div>
                        <div><AiFillApple size={20} style={{ position: 'absolute', left: '12px' }} />Continue with Apple</div>
                        <div>
                            <img style={{ borderRadius: '50%', position: 'absolute', left: '12px' }} height="20" width="20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="" />
                            Continue with Instagram
                        </div>
                    </div>}
                    {!isModalSignIn || <>
                        <div style={{ height: '410px' }} className={styles.modalSignIn}>
                            <h1>Sign up for TikTok</h1>
                            <div><AiOutlineUser size={20} style={{ position: 'absolute', left: '12px' }} />Use phone or email</div>
                            <div><BsFacebook size={20} color={'#0075fa'} style={{ position: 'absolute', left: '12px', backgroundColor: '#fff', borderRadius: '50%' }} />
                                Continue with Facebook
                                <FacebookLogin
                                    buttonStyle={{ border: 'none', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, opacity: 0 }}
                                    appId="547685373917571"
                                    fields="name,email,picture"
                                    autoLoad={false}
                                    onClick={componentClicked}
                                    callback={responseFacebook}
                                />
                            </div>
                            <div><FcGoogle size={20} style={{ position: 'absolute', left: '12px' }} />Continue with Google</div>
                            <div style={{ display: hidden ? 'none' : '' }}><AiOutlineTwitter size={20} color={'rgb(29, 161, 242)'} style={{ position: 'absolute', left: '12px' }} />Continue with Twitter</div>
                            <div style={{ display: hidden ? 'none' : '' }}>
                                <span style={{ backgroundColor: '#00b900', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: 2, position: 'absolute', left: '12px' }}>
                                    <RiLineFill size={16} color={'#fff'} />
                                </span>
                                Continue with LINE
                            </div>
                            <div style={{ display: hidden ? 'none' : '' }}>
                                <span style={{ backgroundColor: '#fbe300', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: 2, position: 'absolute', left: '12px' }}>
                                    <RiKakaoTalkFill color="#000" size={16} />
                                </span>
                                Continue with KakaoTalk
                            </div>
                            <p onClick={() => sethidden(false)} style={{ textAlign: 'center', fontSize: 30, display: hidden ? 'block' : 'none' }}><MdOutlineKeyboardArrowDown /></p>
                        </div>
                        <div>
                            <p>By continuing, you agree to TikTok’s <span>Terms of Service</span> and confirm that you have read TikTok’s <span>Privacy Policy</span>.</p>
                        </div>
                    </>
                    }
                    <div className={isDark ? styles.footerModalDark : styles.footerModal}>
                        {isModalSignIn || <p>
                            Don’t have an account?
                            <span onClick={() => setIsModalSignIn(true)}>Sign up</span>
                        </p>}
                        {!isModalSignIn || <p>
                            Already have an account?
                            <span onClick={() => { setIsModalSignIn(false); sethidden(true) }}>Log in</span>
                        </p>}
                    </div>
                    <span onClick={closeSignIn}>
                        <IoClose size={25} />
                    </span>
                </div>
            </div>}
        </>
    );
}

export default memo(forwardRef(Modal));