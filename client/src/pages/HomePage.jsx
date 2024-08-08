import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import '../styles/homepage.css'; // Assuming you have a custom CSS file for additional styles
import { useDispatch } from 'react-redux'
const HomePage = () => {
    const [ItemsData, setItemsData] = useState([]);
    const [selectCategory, setSelectCategory] = useState("Drinks");
    const categories = [
        {
            name: "Drink",
            image: "kdljfsdlfjals"
        },
        {
            name: "Rice",
            image: "askdjlksadj"
        },
        {
            name: "Noodels",
            image: "jskfljd"
        },
    ]
    const getAllItems = async () => {
        try {

            const { data } = await axios.get("http://localhost:8080/api/v1/items/get-items");
            console.log('Full API Response:', data);

            // Since data is already an array, no need for additional checks
            setItemsData(data);
            // dispatch({
            //     type: 'HIDE_LOADING'
            // })
        } catch (error) {

            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <DefaultLayout>
            <div className="container ">
                <h1 className="text-center mb-4">Items List</h1>
                <div className="d-flex item-center ">
                    {categories.map(category => (
                        <div key={category.name} className={`d-flex category ${selectCategory === category.name && 'category-active'}`} onClick={() => setSelectCategory(category.name)}>
                            <h4>{category.name}</h4>
                            <img src={category.image} alt={category.name} width={60} height={40} />
                        </div>
                    ))}
                </div>
                <Row gutter={[13, 13]}>
                    {ItemsData.filter((i) => i.categories !== selectCategory).map((item) => (
                        <Col key={item._id} xs={24} lg={6} md={12} sm={12} className="mb-4">
                            <ItemList key={item.id} item={item} />
                        </Col>
                    ))}
                </Row>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
