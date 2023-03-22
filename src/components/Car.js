import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Car = ({ imgURL, name, description, price, breed }) => {
    return <Grid item xs={4}>
        <Paper elevation={24}>
            <img
                src={imgURL}
                alt=""
                className="img"
            />
            <Box paddingX={2}>
                <Typography variant="subtitle1" component="h2">
                    Car
                </Typography>        
                <Typography variant="body1" component="p">
                    Lorem Ipsum blah...blah...blah...blah...blah...blah...blah...blah...blah...blah...blah...blah...blah...blah...
                </Typography>
            </Box>      
        </Paper>
    </Grid>
}

export default Car;