import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.scss';

export default function Carousel()  { 

    return (
        <div style={{position:"absolute" , margin:"10px"}}>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/vendor-stories/2022/adidas/2022_aug_fl_onl_adidas_nmd_homepage_banner/2022_Aug_FL_ONL_Adidas_NMD_homepage_banner_1600x300.jpg" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/hubs/flx/2022/2022_07_04_flx_high_heat_august/05_final_output_files/dct/2022_07_04_flx_high_heat_august_en_HP_Banner_1600x300.gif" alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://images.footlocker.com//content/dam/final/footlockereurope/Online_activations/fl-campaign/2022/2022_01_03_fl_onl_release_-calaendar-/05_final_output_files/2022_01_03_fl_onl_release_calendar_1600x300_en.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="circleImages">
                <div>
                    <Link to="kids">
                    <img className="linkImage" src="https://d2ichgn6omvugs.cloudfront.net/images/19762189/za_1e4d6319e48231954.jpg" alt="image"/>  
                    <h2 className="linkText">KIDS</h2>
                    </Link>
                </div>
                <div>
                    <Link to="men">
                    <img className="linkImage" src="https://d2ichgn6omvugs.cloudfront.net/images/19762189/za_0fc76319e4a1914d7.jpg" alt="image"/> 
                    <h2 className="linkText">MEN</h2>
                    </Link>
                </div>
                <div>
                    <Link to="women">
                    <img className="linkImage" src="https://d2ichgn6omvugs.cloudfront.net/images/19762189/za_97476319e4ed05918.jpg" alt="image"/> 
                    <h2 className="linkText">WOMEN</h2>
                    </Link>
                </div>
                <div>
                    <Link to="plus">
                    <img style={{ height:"200px" }} className="linkImage" src="https://th.bing.com/th/id/OIP.yzErexZLJ0DRUJjwu-fcygHaLH?w=204&h=306&c=7&r=0&o=5&pid=1.7" alt="image"/>   
                    <h2 className="linkText">PLUS SIZE</h2>
                    </Link>
                </div>
            </div>
            <div style={{textAlign:"center"}}>
                <h1 style={{fontSize:"90px" , color:"DarkBlue"}}>Bring Your Style</h1>
                <h3>Be the first to get your hands on the most wanted fashion clothes.</h3>
                <img style={{ width:"100%" , margin:"10px" , height:"80%"}} src={require("../../images/fashion.png")} alt="image"/>   
            </div>
        </div>
    )
}
 