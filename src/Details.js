import React, {Component} from 'react';

import {Link, withRouter} from 'react-router-dom';
import Cookies from "universal-cookie/cjs";
import PinnedSubheaderList from "./PinnedSubheaderList";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IdMediaCard from "./IdMediaCard";
import MapLine from "./MapLine";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {makeStyles} from "@material-ui/core";
import Sticky from 'react-sticky-el';
import CardContent from "@material-ui/core/CardContent";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import PinnedSubheaderValue from "./PinnedSubheaderValue";
import whyDidYouUpdate from "why-did-you-update";

// whyDidYouUpdate(React);
class Details extends Component {

    // input = {
    //     name: null
    // };

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            id: null,
            ways: [],
            intersections: [],
            isLoading: true,
            position: [[46.769496, 23.588628], [46.769496, 23.588628]],
            gpsPoints: [],
            nextGpsPoints: []
        };
        this.getWayById = this.getWayById.bind(this);
        this.getNextWayById = this.getNextWayById.bind(this);
    }

    getWayById(id) {

        this.setState({isLoading: true});
        // let input = {...this.state.input};
        console.log("getWayById")
        axios
            .get(`/updatedWay/${id}`)
            .then(response => {
                let coordinates = [];
                response.data.forEach(point => {
                    coordinates.push([point.x, point.y])
                });
                //let coordinates = response.data.map(gpsPoint => new L.LatLng(gpsPoint.x, gpsPoint.y));

                console.log(coordinates);

                this.setState({
                    gpsPoints: coordinates,
                    isLoading: false
                })
            });


    }



    getNextWayById(id) {

        this.setState({isLoading: true});
        // let input = {...this.state.input};
        axios
            .get(`/updatedWay/${id}`)
            .then(response => {
                let coordinates = [];
                response.data.forEach(point => {
                    coordinates.push([point.x, point.y])
                });
                //let coordinates = response.data.map(gpsPoint => new L.LatLng(gpsPoint.x, gpsPoint.y));

                console.log(coordinates);

                this.setState({
                    nextGpsPoints: coordinates,
                    isLoading: false
                })
            });
    }

    componentDidMount() {

        const cookies = new Cookies();
        const name = cookies.get('street_name');
        const id = cookies.get('way_id');
        this.setState({name: name, id: id});

        axios
            .get(`/way/${id}`)
            .then(response => {
                let wayDetails = response.data;
                console.log("didMount")
                if (wayDetails.id === null) {
                    wayDetails.durationListPerHour = [];
                    wayDetails.durationPerHour = [];
                    wayDetails.intersectionMapWithTimeList = [];
                }

                let ways = [];
                Object.entries(wayDetails.durationListPerHour).map((key, value) => {
                        ways.push(key);
                    }
                );
                //console.log(ways);
                let intersections = [];
                Object.entries(wayDetails.intersectionMapWithTimeList).map((key, value) => {
                        intersections.push(key);
                    }
                );
                this.setState({
                    ways: ways,
                    intersections: intersections,
                    isLoading: false
                });
                //this.getWayById(response.data[0].id)
            });

        // this.getWayById(id);

    }


    render() {

        let {name, id, ways, intersections, isLoading} = this.state;
        if (isLoading) {
            console.log("Loading...")
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }

        //console.log(intersections);
        const uuidv4 = require('uuid/v4');
        return <div>

            <Box ml={4} mt={2}>


                <Box mb={3}>
                    {/*<IdMediaCard*/}
                    {/*    name={name}*/}
                    {/*    id={id}*/}
                    {/*    getWayById={this.getWayById}*/}
                    {/*/>*/}
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" onClick={() => this.getWayById(id)}>
                        {id}
                    </Typography>
                </Box>
                <Grid container item spacing={2}>

                    <Grid container item xs={4} spacing={2}>

                        {ways.map(way =>
                            <Box m={2}>
                                <Grid item xs={30} md={12}>
                                    <Box mb={2}>

                                        <IdMediaCard
                                            id={way[0]}
                                            getWayById={this.getNextWayById}
                                        />

                                    </Box>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography>Segment time</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <PinnedSubheaderList
                                                key={uuidv4()}
                                                hourList={way[1]}
                                                id={id}
                                            />
                                        </ExpansionPanelDetails>

                                    </ExpansionPanel>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography>Intersection time</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            {intersections.map(value => {
                                                if (value[0] === way[0]) {
                                                    return <PinnedSubheaderList
                                                        key={uuidv4()}
                                                        hourList={value[1]}
                                                        id={id}
                                                    />
                                                }
                                            })}
                                        </ExpansionPanelDetails>

                                    </ExpansionPanel>
                                </Grid>
                            </Box>)}

                    </Grid>


                    <Grid item xs={7} md={8}>
                        <Sticky>
                            <Box mt={6} ml={2}>

                                <MapLine
                                    loading={this.state.isLoading}
                                    gpsPoints={this.state.gpsPoints}
                                    nextGpsPoints={this.state.nextGpsPoints}
                                    position={this.state.position}
                                    popUpPoints={[]}
                                />

                            </Box>
                        </Sticky>
                    </Grid>

                    {/*<Grid container item xs={4} spacing={2}>*/}


                    {/*    {intersections.map(intersection =>*/}
                    {/*        <Box m={2}>*/}
                    {/*            <Grid item xs={30} md={12}>*/}
                    {/*                <Box mb={2}>*/}

                    {/*                    <IdMediaCard*/}
                    {/*                        id={intersection[0]}*/}
                    {/*                        getWayById={this.getWayById}*/}
                    {/*                    />*/}

                    {/*                </Box>*/}
                    {/*                <ExpansionPanel>*/}
                    {/*                    <ExpansionPanelSummary*/}
                    {/*                        aria-controls="panel2a-content"*/}
                    {/*                        id="panel2a-header"*/}
                    {/*                    >*/}
                    {/*                        <Typography>Intersection time</Typography>*/}
                    {/*                    </ExpansionPanelSummary>*/}
                    {/*                    <ExpansionPanelDetails>*/}
                    {/*                        <PinnedSubheaderList*/}
                    {/*                            hourList={intersection[1]}*/}
                    {/*                        />*/}
                    {/*                    </ExpansionPanelDetails>*/}

                    {/*                </ExpansionPanel>*/}
                    {/*            </Grid>*/}
                    {/*        </Box>)}*/}

                    {/*</Grid>*/}


                </Grid>


            </Box>
        </div>

    }


}

export default withRouter(Details);
