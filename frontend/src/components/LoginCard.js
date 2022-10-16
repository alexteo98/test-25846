import { Stack, TextField, Box, Typography, Button } from "@mui/material"
import React, { useState } from 'react'
import PropTypes from 'prop-types'

function LoginCard({ updateLogin }) {
    const [isLogin, setIsLogin] = React.useState(false)

    const [loginEmail, setLoginEmail] = React.useState("")
    const [loginPw, setLoginPw] = React.useState("")

    const handleLogin = async () => {
        updateLogin(true)
    }

    return (
        <React.Fragment>
            <Stack direction={"column"} width={300}>
                <Typography variant={"h5"} textAlign="center" marginBottom={"0.25rem"}>Update Details</Typography>
                <TextField label="Email" variant="outlined"/>
                <TextField label="Password" variant="outlined" type="password"/>
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
            </Stack>
        </React.Fragment>
    )
}

LoginCard.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default LoginCard