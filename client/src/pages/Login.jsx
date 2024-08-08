
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const handleSubmit = async (value) => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/users/login", value)
            message.success("user Login successfully")
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate("/")
        } catch (error) {
            message.error("SomeThing went wrong")
        }

    }
    // currently login user
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate('/')

        }


    }, [])

    return (
        <>
            <div className="register">
                <div className="register-form">

                    <h1>Pos App</h1>
                    <h3>Login page</h3>
                    <Form layout='vertical' onFinish={handleSubmit}>

                        <Form.Item name={"email"} label="Email"><Input /></Form.Item>
                        <Form.Item name={"password"} label="Password"><Input /></Form.Item>

                        <div className="d-flex justify-content-between">
                            <p>
                                Don't  have an Account Please
                                <Link to={'/register'}> Register Here!</Link>
                            </p>
                            <Button type='primary' htmlType='submit '>Login</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login