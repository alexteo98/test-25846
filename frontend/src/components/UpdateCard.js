import { Stack, TextField, Box, Typography, Button } from "@mui/material"
import React, { useState } from 'react'


function UpdateCard({ updateLogin }) {
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [address, setAddress] = React.useState("")

    const handleLogout = async () => {
        updateLogin(false)
    }

    return (
        <React.Fragment>
            <Stack direction={"column"} width={300}>
                <Typography variant={"h5"} textAlign="center" marginBottom={"0.25rem"}>Your Details</Typography>
                <TextField label="Email" variant="outlined"/>
                <TextField label="Phone" variant="outlined"/>
                <TextField label="Address" variant="outlined"/>
                <Button variant="outlined">Update</Button>
                <Button variant="outlined" onClick={handleLogout}>Log Out</Button>
            </Stack>
        </React.Fragment>
    )
}

export default UpdateCard