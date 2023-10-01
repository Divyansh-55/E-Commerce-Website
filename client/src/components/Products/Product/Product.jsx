import {useNavigate} from "react-router-dom";
import "./Product.scss";
const Product = ({id,data}) => {
    const navigte=useNavigate();    
    return (<div className="product-card" onClick={()=>navigte("/product/"+id)}>
        <div className="thumbnail">
            <img src={process.env.REACT_APP_DEV_URL +
                                data.img.data[0].attributes.url  } alt="product"/>
        </div>
        <div className="product-details">
            <span className="name">{data.title}</span>
            <span className="price">&#8377;{data.Price}</span>
        </div>
    </div>
    );
};

export default Product;