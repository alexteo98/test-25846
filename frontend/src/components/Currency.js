import { Container, Typography, Box, Grid } from "@mui/material"
import React, { useEffect } from 'react'
import axios from "axios"
import { stub } from "../utils/stub.js"
import CurrencyCard from "./CurrencyCard.js"


const URL = 'https://nazyxywbs2lgv7pea34636c7d40smpmi.lambda-url.ap-southeast-1.on.aws/'

function CurrencyPanel() {
    const [currencies, setCurrencies] = React.useState([])

    useEffect(() => {
        async function getRecommendedCurrencies() {
            const res = await axios.get(URL)
            console.log(res.data)
        }

        //getRecommendedCurrencies()
        setCurrencies(Object.entries(stub))
        console.log(currencies)
        //console.log(Object.entries(currencies))
    }, [])
    return (
        <React.Fragment>
            <Typography variant={"h5"} textAlign="center" marginBottom={"0.25rem"}>Recommended Currencies</Typography>
            <Box sx={{
                width: "100%",
                height: 30,
            }}/>
            <Grid container spacing={1}>
                {CurrencyCard(currencies)}
            </Grid>
            <Box sx={{
                width: "100%",
                height: 50,
            }}/>
        </React.Fragment>
    )
}





export default CurrencyPanel