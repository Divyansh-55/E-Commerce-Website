import React from "react";

import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate=useNavigate();
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>SALES</h1>
                    <p>
                         Elevate Your Style, Illuminate Your Sound! 
                         Discover the Perfect Fusion of Fashion and Functionality at JSDEVSTORE. 
                         Explore our Collections. Unleash Your Lifestyle Upgrade Today! 
                         Shop Now for Timeless Elegance and Sonic Brilliance!
                         <br></br> 
                        🛍️ #JSDEVSTYLE
                    </p>
                    <div className="ctas">
                        <div className="banner-cta" onClick={() => navigate("/readmore")}>Read More </div>
                        <div className="banner-cta v2">Shop Now</div>
                    </div>
                </div>
                <img className="banner-img" src={BannerImg} />
            </div>
        </div>
    );
};

export default Banner;
