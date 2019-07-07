import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
});

export default function IdMediaCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.card} style={{flex: 1}} width={"100%"} margin={"10px"}>
            {/*<CardActionArea onClick={() => props.getWayById(props.id)}>*/}
            {/*<CardMedia*/}
            {/*    component="img"*/}
            {/*    alt="Contemplative Reptile"*/}
            {/*    height="140"*/}
            {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
            {/*    title="Contemplative Reptile"*/}
            {/*/>*/}
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.id}
                </Typography>
            </CardContent>
            {/*</CardActionArea>*/}
            <CardActions>
                {/*<Button size="small" color="primary" onClick={() => props.seeDetails(props.id, props.name)}>*/}
                {/*    See details*/}
                {/*</Button>*/}
                <Button size="small" color="primary" onClick={() => props.getWayById(props.id)}>
                    On map
                </Button>
                <Button size="small" color="primary" onClick={() => props.seeWayDetails(props.id)}>
                    Details
                </Button>
                {/*<Button size="small" color="primary">*/}
                {/*    Learn More*/}
                {/*</Button>*/}
            </CardActions>
        </Card>
    );
}
