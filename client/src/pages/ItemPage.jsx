import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios';
import '../styles/itemsPage.css'
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Button, Form, Image, Input, message, Modal, Select, Table } from 'antd';

const ItemPage = () => {
    const [ItemsData, setItemsData] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [popModel, setPopModal] = useState(false);
    const getAllItems = async () => {
        try {

            const { data } = await axios.get("http://localhost:8080/api/v1/items/get-items");
            console.log('Full API Response:', data);

            // Since data is already an array, no need for additional checks
            setItemsData(data);

        } catch (error) {

            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);


    // handle submit data
    const handleSubmit = async (value) => {
        if (editItem === null) {
            try {
                await axios.post("http://localhost:8080/api/v1/items/add-item", value);
                message.success("Item Add Successfully")
                getAllItems()
                setPopModal(false)
                console.log(value);
            } catch (error) {
                message.error("SomeThing Went Wrong")
            }
        }
        else {
            try {
                await axios.put("http://localhost:8080/api/v1/items/update-item", { ...value, itemId: editItem._id });
                message.success("Item Updated Successfully")
                getAllItems()
                setPopModal(false)
                console.log(value);
            } catch (error) {
                message.error("SomeThing Went Wrong")
            }
        }

    }

    // handle delete 
    const handleDelete = async (record) => {
        try {
            await axios.post("http://localhost:8080/api/v1/items/delete-item", { itemId: record._id });
            message.success("Item Delete Successfully")
            getAllItems()
            setPopModal(false)
        } catch (error) {
            message.error("SomeThing Went Wrong")
            console.log(error)
        }
    }
    // table data
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text) => <span className="font-weight-bold">{text}</span>,
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => <Image className='cart-image' src={image} alt={record.name} width='60' height='30' rounded />,
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (text) => <span className="text-success">${text}</span>,
        },

        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div>

                    <Button variant="outline-success" size="sm">
                        <EditOutlined onClick={() => {
                            setEditItem(record); setPopModal(true)
                        }} />
                    </Button>
                    <Button variant="outline-danger" size="sm" >
                        <DeleteOutlined
                            onClick={() => handleDelete(record)} />
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <DefaultLayout>

            <div className="container">
                <h1 className='text-center mb-4'>Item Page</h1>
                <Button type="primary" onClick={() => setPopModal(true)}>Add Item</Button>
                <Table columns={columns} dataSource={ItemsData} bordered className="table-striped" />
                {popModel && (
                    <Modal title={`${editItem !== null ? 'Edit item' : 'Add new items'}`} open={popModel} onCancel={() => {
                        setEditItem(null), setPopModal(false)
                    }} footer={false}>
                        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
                            <Form.Item name={"name"} label="Name"><Input /></Form.Item>
                            <Form.Item name={"price"} label="Price"><Input /></Form.Item>
                            <Form.Item name={"image"} label="Image URL"><Input /></Form.Item>
                            <Form.Item name={"category"} label='Categories'>

                                <Select>
                                    <Select.Option value="drinks">Drinks</Select.Option>
                                    <Select.Option value="rice">Rice</Select.Option>
                                    <Select.Option value="nodels">Noodels</Select.Option>

                                </Select>
                            </Form.Item>
                            <div className="d-flex justify-content-end">
                                <Button type='primary' htmlType='submit '>Save</Button>
                            </div>
                        </Form>
                    </Modal>
                )}
            </div>

        </DefaultLayout >
    )
}

export default ItemPage