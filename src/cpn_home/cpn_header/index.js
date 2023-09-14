
import { memo, useContext, useState } from 'react';

import styles from './style.module.scss'
import Logo from './header_logo';
import Search from './header_search';
import Option from './header_option';
import { ThemeContext } from '../../App';


function Header() {
    // const [logoDefault, setLogoDefault] = useState(true);
    // const [isDark, setIsDark] = useState(false);
    const { isDark } = useContext(ThemeContext);
    //render into dom
    return (
        <div id={isDark ? styles.headerDark : styles.header}>
            <div className={styles.grid}>
                {/* logo section */}
                <Logo />
                {/* frame search */}
                <Search />
                {/* option section */}
                <Option />
            </div>
        </div>
    )
}

export default memo(Header);
