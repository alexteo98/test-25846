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
import CurrencyPanel from "./Currency";

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


function MainPage() {
    const [isLogin, setIsLogin] = React.useState(false)
    const [loggedInEmail, setLoggedInEmail] = React.useState("")
    const [emailQuery, setEmailQuery] = React.useState("")
    const [queryResult, setQueryResult] = React.useState([])

    const loadAllUsers = async () => {
        var resultSet = []
        const res = await getUserSet()

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

    const updateSearchResult = () => {
        console.log(emailQuery)
        if (!emailQuery || emailQuery==""){
            loadAllUsers()
        } else {
            query(emailQuery).then(result => {
                const contact = {email: result.email, phone: result.phone, address: result.address}
                setQueryResult([ contact ])
            }).catch(err => {
                setQueryResult([])
            })
        }
    }

    const resetSearch = () => {
        loadAllUsers().then(res => console.log(res)).catch(err => console.log(err))
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
                    <CurrencyPanel/>
                </div>
                <div>
                    <Box sx={{
                        width: "100%",
                        height: 100,
                    }}> 
                        <Typography variant={"h3"} textAlign="center" marginBottom={"2rem"}>Dashboard</Typography>
                    </Box>
                </div>

                <div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {
                            !isLogin 
                            ? <LoginCard updateLogin={setIsLogin} setLoggedInEmail={setLoggedInEmail} loadAllUsers={loadAllUsers}/>
                            : <UpdateCard updateLogin={setIsLogin} _email={loggedInEmail} loadAllUsers={loadAllUsers}/>
                        }
                    </div>
                    <div>{_spacing(30)}</div>
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