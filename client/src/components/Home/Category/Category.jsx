import { useNavigate } from "react-router-dom";
import "./Category.scss";

const Category = ({ categories,headingText }) => {
    const navigate = useNavigate();
    return (
        <div className="shop-by-category">
            <div className="categories">
            {<div className="sec-heading">{headingText}</div> }
                {categories?.data?.map((item) => (
                    <div
                        key={item.id}
                        className="category"
                        onClick={() => navigate(`/category/${item.id}`)}
                    >
                        <img
                            src={
                                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                                item.attributes.img.data.attributes.url
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
