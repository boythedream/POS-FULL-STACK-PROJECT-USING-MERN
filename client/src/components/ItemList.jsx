import { Card } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import '../styles/itemlist.css'; // Assuming you have a custom CSS file for additional styles

const ItemList = ({ item }) => {
    const dispatch = useDispatch();
    const { Meta } = Card;

    // Update cart handler
    const handleAddToCart = () => {
        console.log("Click on add to cart");
        dispatch({
            type: "UpdateCart",
            payload: { ...item, quantity: 1 }
        });
    };

    return (
        <div className="item-card">
            <Card hoverable style={{ width: '100%' }}
                cover={<img alt={item.name} src={item.image} className="item-image" />}>
                <Meta title={item.name} description={`$${item.price}`} />
                <button className="btn btn-primary mt-3 w-100" onClick={handleAddToCart}>Add To Cart</button>
            </Card>
        </div>
    );
};

export default ItemList;
