import React, { useContext,useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";
import {useNavigate} from "react-router-dom"

import "./Cart.scss";

const Cart = () => {
    const { cartItems, setShowCart, cartSubTotal } = useContext(Context);
    
    const navigate=useNavigate();
    const stripePromise = loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );
        let sessionId=98765;
    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            console.log(sessionId);
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItems
            });
             
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
                
            });
            


        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cart-panel">
            <div
                className="opac-layer"
                
            ></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span
                        className="close-btn"
                        
                    >
                        <MdClose onClick={ 
                            setShowCart(false) }/>
                        <span className="text" >close</span>
                    </span>
                </div>

                {!cartItems.length && (
                    <div className="empty-cart">
                        <BsCartX />
                        <span>No products in the cart.</span>
                        <button className="return-cta" onClick={()=> navigate("/")}>
                            RETURN TO SHOP
                        </button>
                    </div>
                )}

                {!!cartItems.length && (
                    <>
                        <CartItem />
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span className="text">Subtotal:</span>
                                <span className="text total">
                                    &#8377;{cartSubTotal}
                                </span>
                            </div>
                            <div className="button">
                                <button
                                    className="checkout-cta"
                                    // onClick={handlePayment}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;