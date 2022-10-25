import { Stack, TextField, Box, Typography, Button } from "@mui/material"
import { URL_LOGIN_ROUTE, URL_SIGNUP_ROUTE, URL_DELETE_ROUTE } from "../utils/constants"
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

function LoginCard({ updateLogin, setLoggedInEmail, loadAllUsers }) {
    const [isLogin, setIsLogin] = React.useState(false)

    const [loginEmail, setLoginEmail] = React.useState("")
    const [loginPw, setLoginPw] = React.useState("")

    const handleLogin = async () => {
        if (loginEmail == "" || loginPw == ""){
            alert("Email and Password fields cannot be empty!")
            return
        }
        axios.post(URL_LOGIN_ROUTE, { email: loginEmail, password: loginPw }).then(res => {
            console.log(res)
            setLoginEmail("")
            setLoginPw("")
            setLoggedInEmail(loginEmail)
            updateLogin(true)
        }).catch(err => {
            console.log(err.response)
            alert("Please check your credentials")
        })
    }

    const handleDelete = async () => {
        try{
            if (loginEmail == "" || loginPw == ""){
                alert("Email and Password fields cannot be empty!")
                return
            }

            console.log(loginPw)
            const res = await axios.delete(URL_DELETE_ROUTE, { data: { email: loginEmail, password: loginPw }})
            if (res.status == 200){
                alert("Account deleted")
                setLoginEmail("")
                setLoginPw("")
                await loadAllUsers()
            }
        } catch (err) {
            console.log(err.response)
            alert("Please check your credentials")
        }
    }

    const handleSignup = async () => {
        if (loginEmail == "" || loginPw == ""){
            alert("Email and Password fields cannot be empty!")
            return
        }
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
                <Button variant="outlined" onClick={handleDelete}>Delete Account</Button>
            </Stack>
        </React.Fragment>
    )
}

LoginCard.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default LoginCard