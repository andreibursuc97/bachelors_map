import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import {DateTime} from 'luxon';
import generate from "@babel/generator";

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

export default function PinnedSubheaderValue(props) {
    const classes = useStyles();
    let list = [];
    Object.keys(props.hourList).forEach(function (hour) {
        let tuple = {};
        tuple.hour = hour;
        tuple.time = props.hourList[hour];
        list.push(tuple)
    });
    //console.log(list);
    return (
        <List dense={"dense"} className={classes.root}>
            {list.map((value) => {
                return <li key={`section-${value.hour}`} className={classes.listSection}>
                    <ul className={classes.ul}><ListSubheader>{`Time average at ${value.hour}`}</ListSubheader>
                        <ListItem>
                            <ListItemText
                                primary={value.time}
                            />
                        </ListItem>
                    </ul>
                </li>
            })}
        </List>
    );
}
