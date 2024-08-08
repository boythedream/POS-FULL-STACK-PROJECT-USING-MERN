import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const navigate = useNavigate()
    const handleSubmit = async (value) => {
        try {

            const res = await axios.post('http://localhost:8080/api/v1/users/register', value)
            message.success("User registered successfully")
            navigate('/login')

        } catch (error) {
            message.error("Some thing went wrong")
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
                <div className='register-form'>

                    <h1>Pos App</h1>
                    <h3>Register App</h3>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item name={"name"} label="Name"><Input /></Form.Item>
                        <Form.Item name={"email"} label="Email"><Input /></Form.Item>
                        <Form.Item name={"password"} label="Password"><Input /></Form.Item>

                        <div className="d-flex justify-content-between">
                            <p>
                                Already Register Please
                                <Link to={'/login'}> Login Here!</Link>
                            </p>
                            <Button type='primary' htmlType='submit '>Register</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Register