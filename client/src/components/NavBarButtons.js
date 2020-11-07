import React from 'react';
import NavBarLink from './NavBarLink';

const NavBarButtons = () => {
    return (
        <NavBarLink
            className='home-btn'
            path={'/'}
            text={"Home"} />
    )
}

export default NavBarButtons;
