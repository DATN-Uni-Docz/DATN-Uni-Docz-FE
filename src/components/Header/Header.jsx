import CustomButton from '../CustomButton/CustomButton';
import classes from "./Header.module.css";
import AccountMenu from '../AccountMenu/AccountMenu';
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import HeaderBottom from '../HeaderBottom/HeaderBottom';

function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.header_black}>
                <CustomButton type='text' color='white'>Login</CustomButton>
                <CustomButton type='text' color='white'>Sign up</CustomButton>
                <AccountMenu name='Nhi' />
            </div>
            <HeaderBottom logo={logo} isMain={true} title="MY CART"/>
        </header>
    )
}

export default Header