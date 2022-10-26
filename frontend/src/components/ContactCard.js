import {
    Typography,
    CardContent,
    Card, 
    StyledEngineProvider
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
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
    emailStyle: {
        fontSize: '14',
        font: '-apple-system',
        color: "#BAD1C2"
    },
    cardStyle: {
        margin: '0.5rem 0 0 0'
    }
})

function ContactCard(objects) {
    const classes = useStyles();
    try{
    return objects.map((contact, i) => {
        return (
                <React.Fragment key={i}>
                    <StyledEngineProvider injectFirst>
                    <Box fullwidth={'true'}>
                        <Card variant="outlined" className={`${classes.backgroundDarkBlue} ${classes.cardStyle}`}>
                            <CardContent>
                                <Typography className={`${classes.emailStyle}`}>
                                    Email: {contact.email}
                                </Typography>
                                <Typography className={`${classes.emailStyle}`}>
                                    Phone: {contact.phone}
                                </Typography>
                                <Typography className={`${classes.emailStyle}`}>
                                    Address: {contact.address}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    </StyledEngineProvider>
                </React.Fragment>

        )
    })
} catch (err) {
    return (
    <div>
        <Box fullwidth="true">
            No results!            
        </Box>
    </div>
    )
}
}

export default ContactCard;
