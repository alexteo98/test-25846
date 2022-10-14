import {
    Box,
    Button,
    Typography,
    Paper,
    Stack,
    styled,
    TextField,
    Grid,
    Container,
    Card,
    CardContent
} from "@mui/material";
import {Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import queryEmail from "../utils/query";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const email="test@email"
  const phone="999"
  const address="test addr"

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}>
            Email: {email}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
            Phone: {phone}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
            Address: {address}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  const _spacing = gap => (
    <React.Fragment>
      <Box sx={{
                width: "100%",
                height: gap,
            }}/> 
    </React.Fragment>
  );
  

function MainPage() {
    const [emailQuery, setEmailQuery] = React.useState("")
    const [queryResult, setQueryResult] = React.useState([])

    const query = async () =>{
        const res = await queryEmail(emailQuery)
        console.log(res)
    }


    return (
        <div>
        <Container>
        <div>
            <Box sx={{
                width: "100%",
                height: 100,
            }}> 
                <Typography variant={"h3"} textAlign="center" marginBottom={"2rem"}>Dashboard</Typography>
            </Box>
        </div>

        <div>
            <div>
                Search for email:
            </div>
            <div>{_spacing(10)}</div>
            <div>
                <TextField fullWidth id="email_tb" label="Email" variant="outlined" onChange={(e) => setEmailQuery(e.target.value)}></TextField>
            </div>
            <div>
                <Button onClick={query}>Search</Button>
            </div>
        </div>

        <div>{_spacing(30)}</div>

        <div>
            <Box sx={{ minWidth: 275 , maxWidth: 275}}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </div>

        </Container>
        </div>     
    )
}

export default MainPage;