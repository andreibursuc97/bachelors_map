import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import { DateTime } from 'luxon';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

export default function PinnedSubheaderList(props) {
    const classes = useStyles();
    
    return (
        <List dense={"dense"} className={classes.root} subheader={<li/>}>
            {Object.entries(props.hourList).map(([hour, valueList]) => (
                <li key={`section-${hour}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>{`Time values at ${hour}`}</ListSubheader>
                        {valueList.map(item => {

                            var dateTime = new Date(item.date);
                            var date = DateTime.fromMillis(item.date,{zone: 'Europe/Bucharest'})

                            return <ListItem key={`item-${hour}-${item.time}`}>

                                    <Tooltip title={date.toISO()}>
                                    <ListItemText primary={`${item.time} s`}/>
                                    </Tooltip>
                                </ListItem>
                        })}
                    </ul>
                </li>
            ))}
        </List>
    );
}
