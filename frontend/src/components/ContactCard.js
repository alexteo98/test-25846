import {
    Typography,
    CardContent
} from "@mui/material";

function ContactCard(objects) {
    try{
    return objects.map((contact, i) => {
        return (
            <div>
                <div key={i}>
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
                </div>
            </div>
        )
    })
} catch (err) {
    return <div></div>
}
}

export default ContactCard;
