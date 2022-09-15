import { React } from 'react';
import { Link} from 'react-router-dom';
import "../../styles/LittleCart.scss"

export default function User(props)  { 

        const currentUser = props.currentUser;
        
        const handleSignOut = () => {
            let user = JSON.parse(localStorage.getItem('currentUser'));
            console.log(user)
                if(user !== null) {
                    localStorage.removeItem('currentUser')
                }
            props.setUser(null);
        }

        let userUi ;
        if(currentUser === null ){
            userUi = (
                <div>
                    <p style={{cursor:"pointer"}} onClick={()=>props.signIn(true)}>Sign In</p>
                </div>
            )
        }
    
        else if(props.orders.length !== 0){ 
            userUi = (
                    <div>
                        <p>{currentUser.email}</p>
                        <Link to="orders" style={{marginTop:"0"}}>Your orders</Link>
                        <p style={{cursor:"pointer"}} onClick={()=>handleSignOut()}>Sign Out</p>
                    </div>
             )
            
        } else {
            userUi = (
                <div>
                    <p>{currentUser.email}</p>
                    <p style={{cursor:"pointer"}} onClick={()=>handleSignOut()}>Sign Out</p>
                </div>
         )
        }

    return(
            <div onMouseLeave={() => props.setHover(false)} >
                <div className="shopping-cart" style={{right:"0px" , width:"200px"}}>
                    {userUi}
                </div>
            </div>
        
    )
 }
