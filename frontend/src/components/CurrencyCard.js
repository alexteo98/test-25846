import {
    Typography,
    CardContent,
    Card,
    InputLabel
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function CurrencyCard(objects) {
    console.log('currency card' + objects)
    try{
    return objects.map((currency, i) => {
        return (
            <React.Fragment key={i}>
                {currency[0]}: {currency[1]} {"\t"}
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
