import React from 'react';
// import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authentication';
import { useHistory } from 'react-router-dom';


const NavBar = () => {
    const authSelector = useSelector(state => state.authentication)
    const loggedOut = authSelector.id;
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
    }
    const handleClickHome = () => {
        history.push('/')
    }

    const handleProfile = (e, { name }) => {
        history.push('/profile')
    }

    const history = useHistory()

    return (
        // <Menu fixed='top' inverted >
        //     <Container>
        //         <Menu.Item onClick={handleClickHome}> Home</Menu.Item>
        //         <Menu.Item onClick={handleClickHome} header>
        //             <Image size='mini' src='https://cdn2.iconfinder.com/data/icons/flat-pro-word-processing-set-5/32/table-512.png' style={{ marginRight: '1.5em' }} />
        //                 FOODIE
        //             </Menu.Item>
        //         {authSelector.name &&
        //             <Dropdown item text={`Hi ${authSelector.name}`}>
        //                 <Dropdown.Menu>
        //                     <Dropdown.Header style={{ fontSize: '16px' }}>You have {authSelector.points}/2000 points!</Dropdown.Header>
        //                     <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
        //                     <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        //                 </Dropdown.Menu>
        //             </Dropdown>}
        //         {!authSelector.name && <Menu.Item>Login</Menu.Item>}
        //     </Container>
        // </Menu>
        <>
        </>
    )
}

export default NavBar;
