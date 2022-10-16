import {
    Typography,
    CardContent,
    Card
} from "@mui/material";
import { Box } from "@mui/system";

function ContactCard(objects) {
    try{
    return objects.map((contact, i) => {
        return (
                <div width={200}>
                    <Box fullwidth key={i}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }}>
                                    Email: {contact.email}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }}>
                                    Phone: {contact.phone}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }}>
                                    Address: {contact.address}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </div>

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

export default ContactCard;
