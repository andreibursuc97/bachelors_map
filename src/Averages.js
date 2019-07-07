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

class Averages extends Component {

    // input = {
    //     name: null
    // };
    childDiv = {};
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            id: null,
            wayDetails: null,
            isLoading: true,
            position: [[46.769496, 23.588628], [46.769496, 23.588628]],
            gpsPoints: [],
            nextGpsPoints: [],
        };
        //console.log(localStorage);

        this.getWayById = this.getWayById.bind(this);
        this.getNextWayById = this.getNextWayById.bind(this);
        this.seeWayDetails = this.seeWayDetails.bind(this);
        this.myRef = React.createRef();

    }

    getWayById(id) {

        this.setState({isLoading: true});
        localStorage.setItem('scrollPosition',window.scrollY);
        // let input = {...this.state.input};
        axios
            .get(`/wayLineString/${id}`)
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
        localStorage.setItem('scrollPosition',window.scrollY);
        // let input = {...this.state.input};
        axios
            .get(`/wayLineString/${id}`)
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

    seeWayDetails(id) {
        localStorage.setItem('scrollPosition',window.scrollY);
        let url='/details/'+id;
        console.log(url)
        this.props.history.push(url);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        window.scrollTo(0, localStorage.getItem('scrollPosition'));

    }

    componentDidMount() {
        const cookies = new Cookies();
        const name = cookies.get('street_name');
        const id = cookies.get('way_id');
        this.setState({name: name, id: id});

        axios
            .get(`/way/${id}`)
            .then(response => {
                let coordinates = [];
                response.data.gpsPoints.map(point => {
                    console.log(point)
                    coordinates.push([point.latitude, point.longitude])
                });
                this.setState({
                    wayDetails: response.data,
                    gpsPoints:coordinates,
                    isLoading: false
                });
                //this.getWayById(response.data[0].id)
            });
        // this.getWayById(id);

    }


    render() {
        let {name, id, wayDetails, isLoading} = this.state;
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }
        //console.log(wayDetails);
        if(wayDetails.id === null) {
            wayDetails.durationListPerHour = []
            wayDetails.intersectionMapWithTimeList = []
        }
        let waysAverage = [];
        //console.log(wayDetails.durationPerHour);
        Object.entries(wayDetails.durationPerHour).map(value => {
                waysAverage.push(value);
            }
        );
        //console.log(ways);
        console.log(waysAverage);
        let intersections = [];
        Object.entries(wayDetails.intersectionMapWithTimeAverage).map(value => {
                intersections.push(value);
            }
        );
        //console.log(intersections);

        return <div ref={this.myRef}>

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

                        {waysAverage.map(way =>
                            <Box m={2}>
                                <Grid item xs={30} md={12}>
                                    <Box mb={2}>

                                        <IdMediaCard
                                            id={way[0]}
                                            getWayById={this.getNextWayById}
                                            seeWayDetails={this.seeWayDetails}
                                        />

                                    </Box>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography>Average time per hour</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <PinnedSubheaderValue
                                                hourList={way[1]}
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
                                                    console.log(value[0] + " " + way[0]);
                                                    console.log(value[1]);
                                                    return <PinnedSubheaderValue
                                                        hourList={value[1]}
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

export default withRouter(Averages);
