import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Header()  { 

    return (
        <div style={{width:"100%"}}>
            <img className="imgHeader" src="https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2022/2022_03_19_fl_onl_back_to_school_neutral_narrative/05_final_output_files/asp_banner/v2/2022_03_19_FL_OMN_BACK_TO_SCHOOL_NEUTRAL_NARRATIVE_Design_Digital_ASPbanner_WOMEN_SHOES_en_1600x200.jpg" alt="header"/>
            <Navbar/>
            {/* <Outlet /> */}
        </div>
    )
}
 