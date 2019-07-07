import React, {Component, PureComponent} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import {DateTime} from 'luxon';
import {withRouter} from "react-router-dom";
import memoize from "react-inline-grid/src/utils/memoize";


class PinnedSubheaderList extends Component {

    constructor(props) {
        super(props);
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
        this.state={
            useStyles: useStyles
        }


    }

//     componentDidMount() {
//         console.log("didMount");
//         this.setState({hourList: this.props.hourList})
//     }
//
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.id !== nextProps.id) {
            console.log("shouldUpdate");
            return true;
        }
        console.log("should not")
        return false;
}

    render() {
        console.log("render list")

        const classes = this.state.useStyles;
        const uuidv4 = require('uuid/v4');
        return (
            <List className={classes.root} subheader={<li/>}>
                {Object.entries(this.props.hourList).map(([hour, valueList]) => (
                    <li key={`section-${hour}-${uuidv4()}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>{`Time values at ${hour}`}</ListSubheader>
                            {valueList.map(item => {
                                console.log("map");
                                var dateTime = new Date(item.date);
                                var date = DateTime.fromMillis(item.date, {zone: 'Europe/Bucharest'})

                                return <ListItem key={`item-${uuidv4()}-${item.time}`}>

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
}

export default withRouter(PinnedSubheaderList);
