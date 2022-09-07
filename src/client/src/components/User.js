import {React , useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../styles/LittleCart.scss"

export default function User(props)  { 

        const currentUser = props.currentUser;

        let userUi ;
        if(currentUser === null ){
            userUi = (
                <div>
                    <h3 onClick={()=>props.sighIn(true)}>SighIn</h3>
                </div>
            )
        }
    
        else { 
            userUi = (
                    <div>
                        <h3>{currentUser.email}</h3>
                    </div>
             )
            
        }

    return(
            <div onMouseLeave={() => props.setHover(false)} >
                <div className="shopping-cart" style={{right:"0px"}}>
                    {userUi}
                </div>
            </div>
        
    )
 }
