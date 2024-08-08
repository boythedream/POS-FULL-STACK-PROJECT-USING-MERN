import react, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Table, Button, Space, Image, Modal, Form, Input, Select, message } from 'antd';
import '../styles/cartpage.css'; // Assuming you have a custom CSS file for additional styles
import axios from 'axios';

const Cartpage = () => {
    const navigate = useNavigate()
    const [subTotal, setSubTotal] = useState(0)
    const [billPopup, setBillPopUp] = useState(false)

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const handleIncrement = (record) => {
        dispatch({
            type: "Update",
            payload: { ...record, quantity: record.quantity + 1 }
        });
    };

    const handleDecrement = (record) => {
        if (record.quantity > 1) {
            dispatch({
                type: "Update",
                payload: { ...record, quantity: record.quantity - 1 }
            });
        }
    };
    useEffect(() => {
        let temp = 0;
        cartItems.forEach(item => temp = temp + (item.price * item.quantity))

        setSubTotal(temp)
    }, [cartItems])


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
            title: "Quantity",
            dataIndex: "_id",
            render: (id, record) => (
                <Space>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleDecrement(record)}>
                        <MinusCircleOutlined />
                    </Button>
                    <span className="font-weight-bold">{record.quantity}</span>
                    <Button variant="outline-primary" size="sm" onClick={() => handleIncrement(record)}>
                        <PlusCircleOutlined />
                    </Button>
                </Space>
            ),
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div>


                    <Button variant="outline-danger" size="sm" >
                        <DeleteOutlined onClick={() => dispatch({
                            type: "DELETE_FROM_CART",
                            payload: record,
                        })} />
                    </Button>
                </div>
            ),
        },
    ];
    const handleSubmit = async (value) => {
        try {

            const newObject = {
                ...value,
                cartItems,
                subTotal,
                tax: Number(((subTotal / 100) * 10).toFixed(2)),
                totalAmount: Number(Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))),
                userId: JSON.parse(localStorage.getItem("auth"))._id,

            }

            await axios.post('http://localhost:8080/api/bills/add-bills', newObject)
            message.success("Bill Created Successfully")
            navigate('/bills')

            setBillPopUp(false)
        } catch (error) {
            message.error("Something went wrongs")
            console.log(error);
        }
    }
    return (
        <DefaultLayout>
            <div className="container">
                <h1 className='text-center mb-4'>Cart Page</h1>
                <Table columns={columns} dataSource={cartItems} bordered className="table-striped" />

            </div>
            <div className="d-flex flex-column align-items-end">
                <hr />
                <h3>SUB TOTAL: $ <b>{subTotal} /-</b> </h3>
                <Button type='primary' onClick={() => setBillPopUp(true)}> CREATE INVOICE</Button>
            </div>
            <Modal title="create invoice" open={billPopup} footer={false} onCancel={() => setBillPopUp(false)}>
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item name={"customerName"} label="Customer Name"><Input /></Form.Item>
                    <Form.Item name={"customerContact"} label="Contact Number"><Input /></Form.Item>

                    <Form.Item name={"paymentMethod"} label='Payment Method'>

                        <Select>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="card">Card</Select.Option>


                        </Select>
                    </Form.Item>
                    <div className="bill-item">
                        <h5>
                            Sub Total: <b>{subTotal}</b>
                        </h5>
                        <h4>TAX
                            <b>{((subTotal / 100) * 10).toFixed(2)}</b>
                        </h4>
                        <h3>
                            GRAND TOTAL -  <b>{Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}</b>
                        </h3>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button type='primary' htmlType='submit '>Generate Bill</Button>
                    </div>
                </Form>
            </Modal>
        </DefaultLayout>
    );
};

export default Cartpage;
