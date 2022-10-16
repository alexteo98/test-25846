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
import React, { useEffect, useState } from 'react'
import { queryEmail, getUserSet } from "../utils/query";
import axios from "axios";
import ContactCard from "./ContactCard";
import LoginCard from "./LoginCard";
import UpdateCard from "./UpdateCard";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

    const _spacing = gap => (
    <React.Fragment>
      <Box sx={{
                width: "100%",
                height: gap,
            }}/> 
    </React.Fragment>
  );
  
  const query = async (_email) =>{
    const res = await queryEmail(_email)
    //console.log(res.data)
    return res.data
}

let userSet1 = []
const getUserSet1 = async () => {
    const res = await getUserSet()
    userSet1 = res
    //console.log(userSet)
}

let resultSet1 = []

const loadAllUsers1 = async () => {
    var resultSet = []
    await getUserSet1()

    for(const user of userSet1) {
        const result = await query(user)
        //console.log(result)
        const _email = result.email
        const _phone = result.phone
        const _address = result.address
        const contact = {email: _email, phone:_phone, address:_address}
        resultSet.push(contact)
    }

    return resultSet
    //setQueryResult(resultSet)
    //console.log('user details',resultSet)
}

function MainPage() {
    const [isLogin, setIsLogin] = React.useState(false)
    const [emailQuery, setEmailQuery] = React.useState("")
    const [queryResult, setQueryResult] = React.useState([])
    //const [queryResult, setQueryResult] = React.useState({})
    const [userSet, setUserSet] = React.useState([])

    const _getUserSet = async () => {
        const res = await getUserSet()
        setUserSet(res)
        //console.log(userSet)
    }

    const loadAllUsers = async () => {
        var resultSet = []
        await _getUserSet()

        for(const user of userSet) {
            const result = await query(user)
            //console.log(result)
            const _email = result.email
            const _phone = result.phone
            const _address = result.address
            const contact = {email: _email, phone:_phone, address:_address}
            resultSet.push(contact)
        }

        //return resultSet
        setQueryResult(resultSet)
        //return
        //console.log('user details',resultSet)
    }

    const updateSearchResult = () => {
        console.log(emailQuery)
        query(emailQuery).then(result => {
            const contact = {email: result.email, phone: result.phone, address: result.address}
            setQueryResult([ contact ])
        }).catch(err => {
            setQueryResult([])
        })
    }

    useEffect(() => {
        async function loadAllUsers2 () {
            const res = await getUserSet()
            var resultSet = []
            for(const user of res) {
                const result = await query(user)
                //console.log(result)
                const _email = result.email
                const _phone = result.phone
                const _address = result.address
                const contact = {email: _email, phone:_phone, address:_address}
                resultSet.push(contact)
            }
            setQueryResult(resultSet)
        }
        loadAllUsers2()
    }, [])

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
                    <Stack direction="row">
                        {
                            !isLogin 
                            ? <LoginCard updateLogin={setIsLogin}/>
                            : <UpdateCard updateLogin={setIsLogin}/>
                        }
                    </Stack>
                    <div>{_spacing(30)}</div>
                </div>

                <div>
                    <div>{_spacing(10)}</div>
                    <div>
                        <TextField fullWidth id="email_tb" label="Search Email" variant="outlined" onChange={(e) => setEmailQuery(e.target.value)}></TextField>
                    </div>
                    <div>
                        <Button onClick={()=>{}}>Search</Button>
                    </div>
                </div>

                <div>{_spacing(30)}</div>

                <div>
                    {ContactCard(queryResult)}
                </div>

            </Container>
        </div>     
    )
}

export default MainPage;