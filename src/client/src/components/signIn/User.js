import { React } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../../styles/LittleCart.scss";
import { initUser } from '../../slices/userSlice';
import { changeSignIn } from '../../slices/signInSlice';

export default function User(props) {

    const currentUser = useSelector((state) => state.user.currentUser);
    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user !== null) {
            localStorage.removeItem('currentUser');
        }
        dispatch(initUser(user));
    }

    let userUi;
    if (currentUser === null || currentUser === undefined) {
        userUi = (
            <div>
                <p style={{ cursor: "pointer" }} onClick={() => dispatch(changeSignIn(true))}>Sign In</p>
            </div>
        )
    }
    else if (props.isManager && orders.length !== 0) {
        userUi = (
            <div>
                <p style={{ marginBottom: "0" }}>{currentUser.email}</p>
                <Link to="orders" style={{ marginTop: "0" , display:"block"}}>Your orders</Link>
                <Link to="management" style={{ marginTop: "0" }}>To the management</Link>
                <p style={{ cursor: "pointer" }} onClick={() => handleSignOut()}>Sign Out</p>
            </div>
        )

    }  else if (props.isManager ) {
        userUi = (
            <div>
                <p style={{ marginBottom: "0" }}>{currentUser.email}</p>
                <Link to="management" style={{ marginTop: "0" }}>To the management</Link>
                <p style={{ cursor: "pointer" }} onClick={() => handleSignOut()}>Sign Out</p>
            </div>
        )

    } else if (orders.length !== 0) {
        userUi = (
            <div>
                <p style={{ marginBottom: "0" }}>{currentUser.email}</p>
                <Link to="orders" style={{ marginTop: "0" }}>Your orders</Link>
                <p style={{ cursor: "pointer" }} onClick={() => handleSignOut()}>Sign Out</p>
            </div>
        )

    }  else {
        userUi = (
            <div>
                <p>{currentUser.email}</p>
                <p style={{ cursor: "pointer" }} onClick={() => handleSignOut()}>Sign Out</p>
            </div>
        )
    }

    return (
        <div onMouseLeave={() => props.setHover(false)} >
            <div className="shopping-cart" style={{ right: "0px", width: "200px" }}>
                {userUi}
            </div>
        </div>

    )
}
