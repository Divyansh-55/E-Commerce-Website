import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate=useNavigate();
    return (
    <div className="hero-banner">
        <div className="content">
            <div className="text-content">
                <h1>Sales</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Similique vitae suscipit et
                    excepturi reiciendis.
                </p>
                <div className="ctas">
                    <div className="banner-cta" onClick={()=>{navigate("/readmore") 
                        
                    }}>Read More</div>
                    <div className="banner-cta v2">Shop Now</div>
                </div>
            </div>
            <img src={BannerImg} alt="Banner-img" className="Banner-img"/>
        </div>
    </div>
    )
};

export default Banner;
