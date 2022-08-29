import React from 'react';
import Navbar from './Navbar';

export default function Carousel()  { 

    return (
        <div>
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
            <div style={{textAlign:"center"}}>
                <img style={{ width:"60%"}} src={require("../images/logo2.png")} alt="image"/>   
                <h1 style={{fontSize:"90px" , color:"DarkBlue"}}>Bring Your Style</h1>
                <h3>Be the first to get your hands on the most wanted sneakers, tracksuits, backpacks, and more.</h3>
            </div>
            <div style={{margin:"30px" , display:"flex"}}>
                <img style={{marginRight:"30px" , width:"100%"}} src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2022/2022_08_13_fl_onl_converse_animalie/05_final_output_files/ecom/2022_08_13_FL_ONL_CONVERSE_ANIMALIER_HPbanner_800x300.jpg" alt="image"/>
                <img src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2022/2022_08_27_fl_onl_on_running/05_final_output_files/eCom/2022_08_27_FL_ONL_ON_Running_DESIGN_HPbanner_800x300.jpg" alt="image"/>
            </div>
            <div style={{margin:"30px" , display:"flex"}}>
                <img style={{ width:"100%"}} src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2022/2022_03_22_fl_onl_summer/05_final_output_files/clearpay/2022_03_22_FL_ONL_Summer_gender_clearpay_1600x300.jpg" alt="image"/>   
            </div>
            <div style={{margin:"30px" , display:"flex"}}>
                <img style={{marginRight:"30px" , width:"100%"}} src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/2020_09_017_onl_basketball_hub/bballhub-update21-12/05_final_output_files/fl-hp/2021_09_28_1307_fashion-week_striper-hub_header_800x300.jpg" alt="image"/>
                <img src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/2020_09_017_onl_basketball_hub/bballhub-update21-12/05_final_output_files/fl-hp/02_RTG_Main_landing_RTG_Header_op3_800x300.jpg" alt="image"/>
            </div>
        </div>
    )
}
 