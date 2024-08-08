import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    UsergroupAddOutlined,
    OrderedListOutlined,
    MoneyCollectOutlined,
    HomeOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import "../styles/defualtLayout.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const loading = useSelector(state => state.rootReducer);
    const cartItems = cart?.cartItems || []; // Safely access cartItems
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const menuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link to='/'>Home</Link>,
        },
        {
            key: '/bills',
            icon: <MoneyCollectOutlined />,
            label: <Link to='/bills'>Bills</Link>,
        },
        {
            key: '/items',
            icon: <OrderedListOutlined />,
            label: <Link to='/items'>Items</Link>,
        },
        {
            key: '/customers',
            icon: <UsergroupAddOutlined />,
            label: <Link to='/customers'>Customers</Link>,
        },
        {
            key: '/Logout',
            icon: <LogoutOutlined />,
            label: <Link to={'/login'}>Logout</Link>
        },
    ];

    return (
        <Layout>
            {loading && <Spinner />}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <h1 className='text-center text-light mt-4 font-bold'>POS</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[window.location.pathname]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        padding: '0 16px',
                        background: colorBgContainer
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="cart-item d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/cart')}>
                        <ShoppingCartOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
                        <p className="mb-0">{cartItems.length}</p>
                    </div>
                </Header>
                <Content
                    className="p-4"
                    style={{
                        margin: '24px 16px',
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default DefaultLayout;
