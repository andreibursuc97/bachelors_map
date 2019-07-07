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
import Sticky from 'react-sticky-el';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import SimpleMediaCard from "./SimpleMediaCard";

class WayDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            ways: [],
            intersections: [],
            isLoading: true,
            position: [[46.769496, 23.588628], [46.769496, 23.588628]],
            gpsPoints: [],
            nextGpsPoints: []
        };
    }

    componentDidMount() {

        const cookies = new Cookies();
        const name = cookies.get('street_name');
        const id = cookies.get('way_id');
        this.setState({ name: name, id: id});
        let nextWayId = this.props.match.params.id;
        axios
            .get(`/way/${id}`)
            .then(response => {
                let wayDetails = response.data;
                console.log("didMount");
                if (wayDetails.id === null) {
                    wayDetails.durationListPerHour = [];
                    wayDetails.durationPerHour = [];
                    wayDetails.intersectionMapWithTimeList = [];
                    wayDetails.gpsPoints = []
                }

                let ways = [];
                Object.entries(wayDetails.durationListPerHour).map((key, value) => {

                        if(key[0] === nextWayId) {
                            ways.push(key);
                        }
                        console.log(key);
                    }
                );
                //console.log(ways);
                let intersections = [];
                Object.entries(wayDetails.intersectionMapWithTimeList).map((key, value) => {
                        if(key[0] === nextWayId) {
                            intersections.push(key);
                        }
                    }
                );
                let coordinates = [];
                wayDetails.gpsPoints.map(point => {
                    console.log(point)
                    coordinates.push([point.latitude, point.longitude])
                });

                console.log(wayDetails.gpsPoints);
                this.setState({
                    ways: ways,
                    intersections: intersections,
                    gpsPoints: coordinates,
                    isLoading: false
                });
                //this.getWayById(response.data[0].id)
            });
        console.log(this.props.match.params.id);
        // this.getWayById(id);

        axios
            .get(`/wayLineString/${nextWayId}`)
            .then(response => {
                let coordinates = [];
                response.data.forEach(point => {
                    coordinates.push([point.x, point.y])
                });
                //let coordinates = response.data.map(gpsPoint => new L.LatLng(gpsPoint.x, gpsPoint.y));

                console.log(coordinates);

                this.setState({
                    nextGpsPoints: coordinates
                })
            });
    }


    render() {

        let {name, id, ways, intersections, isLoading} = this.state;
        console.log(isLoading);
        if (isLoading) {
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
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        {id}
                    </Typography>
                </Box>
                <Grid container item spacing={2}>

                    <Grid container item xs={4} spacing={2}>

                        {ways.map(way =>
                            <Box m={2}>
                                <Grid item xs={30} md={12}>
                                    <Box mb={2}>

                                        <SimpleMediaCard
                                            id={way[0]}
                                            name={name}
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
                </Grid>


            </Box>
        </div>

    }


}

export default withRouter(WayDetails);
