import {
    Typography,
    CardContent,
    Card,
    InputLabel,
    Grid
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function CurrencyCard(objects) {
    console.log('currency card' + objects)
    try{
    return objects.map((currency, i) => {
        return (
            <React.Fragment key={i}>
                <Grid item xs={2}>
                    <Box variant="outlined" sx={{ border: '1px solid grey', borderRadius: '16px', textAlign: 'center'}}>
                        {currency[0]}: {currency[1]}
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
