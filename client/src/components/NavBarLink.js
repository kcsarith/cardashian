import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBarLink = (props) => {
    return (
            <NavLink
                className='link'
                onClick={props.handle}
                to={props.path ? props.path : null}
            >
                {props.text}
            </NavLink>
    )
}

export default NavBarLink;
