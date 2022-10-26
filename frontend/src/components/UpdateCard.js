import { Stack, TextField, Box, Typography, Button, StyledEngineProvider } from "@mui/material"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL_DETAILS_ROUTE } from "../utils/constants"
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles({
    background: {
        backgroundColor:"#000000"
    },
    outline: {
        outline: "solid 2px"
    },
    backgroundDarkBlue: {
        backgroundColor: "#153462"
    },
    backgroundTeal: {
        backgroundColor: "#4FA095"
    },
    backgroundLightBlue: {
        backgroundColor: "#BAD1C2"
    },
    textAlignCenter: {
        textAlign: "center"
    },
    buttonStyle: {
        outline: "solid 2px #4FA095",
        borderRadius: "10px",
        backgroundColor: "#4FA095",
        borderColor: "#4FA095",
        margin: '0.4rem 0 0 0'
    }

})

function UpdateCard({updateLogin, _email, loadAllUsers}) {
    const [email, setEmail] = React.useState(_email)
    const [phone, setPhone] = React.useState("")
    const [address, setAddress] = React.useState("")

    const handleLogout = async () => {
        updateLogin(false)
    }

    const getDetails = async () => {
        const res = await axios.post(URL_DETAILS_ROUTE, {email: email})
        console.log(res)
        return res
    }

    console.log("passed paramter: " + _email)

    const handleUpdate = async () => {
        try{
            const _phone = phone || null
            const _address = address || null

            const res = await axios.put(URL_DETAILS_ROUTE,{email: email,phone: _phone, address: _address})
            //console.log(res)
            await loadAllUsers()
        } catch (err){
            console.log("error occured when updating info")
            console.log(err)
            alert("Update failed.")
        }
    }

    useEffect(() => {
        const _getDetails = async () => {
            const res = await axios.post(URL_DETAILS_ROUTE, {email: email})
            console.log(res)
            const phone = res.data.phone || ""
            const address = res.data.address || ""
            setPhone(phone)
            setAddress(address)
        }

        _getDetails();
    },[])
    const classes = useStyles();
    return (
        <React.Fragment>
            <StyledEngineProvider injectFirst>
            <Stack direction={"column"} width={300}>
                <Typography variant={"h5"} textAlign="center" marginBottom={"0.25rem"}>Your Details</Typography>
                <TextField label="Email" variant="outlined" value={email} disabled={true}/>
                <TextField label="Phone" variant="outlined" value={phone} onChange={e => setPhone(e.target.value)}/>
                <TextField label="Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)}/>
                <Button className={`${classes.buttonStyle} ${classes.textAlignCenter}`} onClick={handleUpdate}>
                    <Typography color={'black'}>Update</Typography>
                </Button>
                <Button className={`${classes.buttonStyle} ${classes.textAlignCenter}`} onClick={handleLogout}>
                <Typography color={'black'}>Log Out</Typography>
                </Button>
            </Stack>
            </StyledEngineProvider>
        </React.Fragment>
    )
}

export default UpdateCard