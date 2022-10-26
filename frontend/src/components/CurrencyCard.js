import {
    Typography,
    CardContent,
    Card,
    InputLabel,
    Grid
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { makeStyles} from "@mui/styles";
import { ClassNames } from "@emotion/react";

const userStyle = makeStyles({
    gridItem: {
        variant: 'outlined',
        border: '1px solid grey',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '20px auto auto auto',
        padding: "0.25rem 0.25rem 0.25rem 0.25rem",
        backgroundColor: '#153462'
    },
    textStyle: {
        fontSize: '14',
        font: '-apple-system',
        color: "#BAD1C2"
    },
})

function CurrencyCard(objects) {
    console.log('currency card' + objects)
    const classes = userStyle();
    try{
    return objects.map((currency, i) => {
        return (
            <React.Fragment key={i}>
                <Grid item xs={'auto'}>
                    <Box className={classes.gridItem}>
                        <Typography className={classes.textStyle}>
                            {currency[0]}: {currency[1]}
                        </Typography>
                    </Box>
                </Grid>
            </React.Fragment>
        )
    })
} catch (err) {
    return (
    <div>
        <Box fullwidth>
            No results!            
        </Box>
    </div>
    )
}
}

export default CurrencyCard;
