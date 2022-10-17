import { Stack, TextField, Box, Typography, Button } from "@mui/material"
import { URL_LOGIN_ROUTE, URL_SIGNUP_ROUTE } from "../utils/constants"
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

function LoginCard({ updateLogin }) {
    const [isLogin, setIsLogin] = React.useState(false)

    const [loginEmail, setLoginEmail] = React.useState("qq")
    const [loginPw, setLoginPw] = React.useState("qq")

    const handleLogin = async () => {
        axios.post(URL_LOGIN_ROUTE, { email: loginEmail, password: loginPw }).then(res => {
            console.log(res)
            setLoginEmail("")
            setLoginPw("")
            updateLogin(true)
        }).catch(err => {
            console.log(err.response)
            alert("Please check your credentials")
        })
    }

    const handleSignup = async () => {
        axios.post(URL_SIGNUP_ROUTE,{ email: loginEmail, password: loginPw }).then(res => {
            console.log(res)
            alert("Signup success")
            setLoginEmail("")
            setLoginPw("")
        }).catch (err => {
            if (err.response.status == 409){
                alert("Email already exists!")
            } else {
                alert("Unknown error occured. Please contact administrator.")
            }
            
        })
    }

    return (
        <React.Fragment>
            <Stack direction={"column"} width={300}>
                <Typography variant={"h5"} textAlign="center" marginBottom={"0.25rem"}>Update Details</Typography>
                <TextField label="Email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} variant="outlined"/>
                <TextField label="Password" value={loginPw} onChange={e=>setLoginPw(e.target.value)} variant="outlined" type="password"/>
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
                <Button variant="outlined" onClick={handleSignup}>Signup</Button>
            </Stack>
        </React.Fragment>
    )
}

LoginCard.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default LoginCard