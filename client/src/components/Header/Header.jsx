import "./Header.scss";

import { useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom"

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";

import Cart from "../Cart/Cart";
import Search from "./Search/Search";
import { Context } from "../../utils/context";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showSearch,setShowSearch]=useState(false);
    const {cartCount}= useContext(Context);
    const navigate=useNavigate();
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);
    const x = Math.floor(Math.random() * 4)+1; 

    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
                <div className="header-content">
                    <ul className="left">
                        <li onClick={()=> navigate("/")}>Home</li>
                        <li onClick={()=> navigate("/readmore")}>About</li>
                        <li onClick={()=> navigate(`/category/${x}`)}>Category</li>
                    </ul>
                    <div className="center" onClick={()=> navigate("/")}>DIVSTORE</div>
                    <div className="right">
                        <TbSearch onClick={()=>setShowSearch(true) }/>
                      
                        <div className="cart-icon" onClick={()=>setShowCart(true)}>
                            <CgShoppingCart />
                            {!!cartCount && <span>{cartCount}</span>}
                        </div>

                    </div>
                </div>
            </header>
            {showCart && < Cart setShowCart={setShowCart}/>}
            {showSearch && <Search setShowSearch={setShowSearch}/>}
        </>
    )
};

export default Header;
