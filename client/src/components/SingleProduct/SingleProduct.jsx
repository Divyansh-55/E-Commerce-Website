import "./SingleProduct.scss";
import { useState ,useContext} from "react";
import RelatedProducts from "./RelatedProducts/RelatedProducts"
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaPinterest,
    FaCartPlus
} from "react-icons/fa";
import useFetch from '../../hooks/useFetch'
import { useParams } from "react-router-dom";
import { Context } from "../../utils/context";

const SingleProduct = () => {
    const [quantity,setQuantity]=useState(1);
    const {id}= useParams();
    const {data}=useFetch(`/api/products?populate=*&[filters][id]=${id}`);

    const {handleAddToCart}=useContext(Context);

    const increment=()=>{
        setQuantity((prevState) => prevState+1 )
    }
    
    const decrement=()=>{
        setQuantity((prevState)=>{
            if(prevState===1) return 1;
            else return  prevState-1;
         });
    }

    if(!data) return ;
    const product=data.data[0].attributes;
    return <div className="single-product-main-content">
        <div className="layout">
            <div className="single-product-page">
                <div className="left">
                    <img src={process.env.REACT_APP_DEV_URL+
                                product.img.data[0].attributes.url} alt="" />
                </div>
                <div className="right">
                    <span className="name">{product.title}</span>
                    <span className="price">&#8377; {product.Price}</span>
                    <span className="desc">{product.Desc}</span>

                    <div className="cart-buttons">
                        <div className="quantity-buttons">
                            <span onClick={decrement}>-</span>
                            <span >{quantity}</span>
                            <span onClick={increment}>+</span>
                        </div>
                        <button className="add-to-cart-button" onClick={()=>{
                            handleAddToCart(data?.data[0],quantity);
                            setQuantity(1); 
                        }}>
                            <FaCartPlus size={20}  />
                            ADD TO CART
                        </button>
                    </div>

                    <span className="divider" />
                    <div className="info-item">
                        <span className="text-bold">Category :
                            <span> {product?.categories?.data[0]?.attributes?.title}</span>
                        </span>

                        <span className="text-bold">Share:
                            <span className="social-icons">
                            <a href="https://www.facebook.com/" target="blank"><FaFacebookF size={20} /></a>
                            <a href="https://www.instagram.com/" target="blank"><FaInstagram size={20} /></a>
                            <a href="https://www.linkedin.com/" target="blank"><FaLinkedin size={20} /></a>
                            <a href="https://www.pinterest.com/" target="blank"><FaPinterest size={20} /></a>
                            <a href="https://www.twitter.com/" target="blank"><FaTwitter size={20} /></a>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <RelatedProducts productId={id} categoryId={product?.categories?.data[0]?.id}/>
        </div>
    </div>
};

export default SingleProduct;
