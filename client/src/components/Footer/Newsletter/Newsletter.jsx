import "./Newsletter.scss";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
}from "react-icons/fa"; 
const Newsletter = () => {
    return <div className="newsletter-section">
        <div className="newsletter-content">
            <div className="small-text">NewsLwtter</div>
            <span className="big-text">Sign up for, Latest Updates and Offers</span>
            <div className="form">
                <input type="text" placeholder="Email Address" />
                <button>Subscribe</button>
            </div>
            <div className="text">Will be used in accordance with our Privacy Policy</div>
            <div className="social-icons">
            <a href="https://www.facebook.com/" target="blank"> <div className="icon" ><FaFacebookF/></div></a>
            <a href="https://www.twitter.com/" target="blank"><div className="icon"><FaTwitter/></div></a>
            <a href="https://www.instagram.com/" target="blank"> <div className="icon"><FaInstagram/></div></a>
            <a href="https://www.linkedin.com/" target="blank"><div className="icon"><FaLinkedin/></div></a>
            </div>
        </div>
    </div>
};

export default Newsletter;
