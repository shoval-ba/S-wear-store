import React from 'react';
// import Person2Icon from '@mui/icons-material/Person2';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Navbar from './Navbar'

export default function Header()  { 

    return (
        <div>
            <img className="imgHeader" src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2022/2022_03_19_fl_onl_back_to_school_neutral_narrative/05_final_output_files/asp_banner/v2/2022_03_19_FL_OMN_BACK_TO_SCHOOL_NEUTRAL_NARRATIVE_Design_Digital_ASPbanner_WOMEN_SHOES_en_1600x200.jpg" alt="header"/>
            <Navbar/>
            {/* <div className="navbar">
                <div className="nameLogo">
                    <img className="imgLogo" src={require('../images/logo2.png')} alt="logo"/>
                </div>
                <div className="categories">
                    <div className="barChild">MEN</div>
                    <div className="barChild">WOMEN</div>
                    <div className="barChild">KIDS</div>
                    <div className="barChild">BACK TO SCOOL</div>
                    <div className="barChild">SALE</div>
                </div>
                <form className="form">
                    <input className="search" type="text" placeholder="Search..." name="search"></input>
                    <Person2Icon style={{fontSize: "2em"}}/>
                    <ShoppingCartIcon style={{fontSize: "2em"}}/>
                    <FavoriteIcon style={{fontSize: "2em"}}/>
                </form>
            </div> */}
        </div>
    )
}
 