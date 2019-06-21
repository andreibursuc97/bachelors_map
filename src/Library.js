import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {Button, TextField} from "@material-ui/core"
import axios from "axios";
import MapLine from "./MapLine";
import Box from "@material-ui/core/Box";
import ImgMediaCard from "./ImgMediaCard";
import CardDeck from "reactstrap/es/CardDeck";
import Grid from "@material-ui/core/Grid";
import * as L from "leaflet";
import Sticky from 'react-sticky-el';
import Cookies from "universal-cookie";


class Library extends Component {

    input = {
        name: null
    };

    constructor(props) {
        super(props);

        this.state = {
            product: this.emptyItem,
            isLoading: true,
            position: [[46.769496, 23.588628], [46.769496, 23.588628]],
            gpsPoints: [],
            wayNodeReferenceData: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitId = this.handleSubmitId.bind(this);
        this.getWayById = this.getWayById.bind(this);
        this.seeDetails = this.seeDetails.bind(this);
        this.seeAverages = this.seeAverages.bind(this);
        this.searchWayByName = this.searchWayByName.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const cookies = new Cookies();
        if (cookies.get('search')) {

            const name = cookies.get('search');
            this.searchWayByName(name);

        } else {
            this.setState({isLoading: false});
        }

    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        let input = {...this.state.input};
        input.name = value;
        const cookies = new Cookies();
        cookies.set('search', input.name);
        console.log(input);
        this.setState({input});
    }

    handleChangeId(event) {
        const target = event.target;
        const value = target.value;
        let input = {...this.state.input};
        input.id = value;
        console.log(input);
        this.setState({input});
    }

    getWayById(id) {

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
                    gpsPoints: coordinates,
                    isLoading: false
                })
            });
    }

    seeDetails(id, name) {

        const cookies = new Cookies();
        cookies.set("street_name", name);
        cookies.set("way_id", id);
        this.props.history.push(`/details`);
    }

    seeAverages(id, name) {

        const cookies = new Cookies();
        cookies.set("street_name", name);
        cookies.set("way_id", id);
        this.props.history.push(`/averages`);
    }

    searchWayByName(name) {

        axios
            .get(`/updatedWay?name=${name}`)
            .then(response => {
                this.setState({
                    wayNodeReferenceData: response.data,
                    isLoading: false
                });
                if (response.data.length > 0) {

                    this.getWayById(response.data[0].id)

                }
            });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        let input = {...this.state.input};
        this.searchWayByName(input.name)
    }

    async handleSubmitId(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        let input = {...this.state.input};
        this.getWayById(input.id)
    }


    render() {
        //console.log(this.state.wayNodeReferenceData);
        let {isLoading} = this.state;
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }

        return <div >
            <Box ml={20} mr={2} mt={4} mb={2}>
                <Grid container spacing={48}>
                    <Grid item xs={4}>
                        <Container>
                            <h2>Search for way</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>

                                    <Box mb={4}>
                                        <TextField
                                            name="name"
                                            label="Road name"
                                            margin="dense"
                                            onChange={this.handleChange}
                                        />

                                    </Box>
                                    <Button variant="contained" color={"primary"} type="submit">Searching</Button>

                                </FormGroup>

                            </Form>
                            <Box mt={4} mb={4}>
                                <CardDeck style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: "100em",
                                    justifyContent: "center"
                                }}>
                                    {this.state.wayNodeReferenceData.map(way =>
                                        <ImgMediaCard
                                            key={way.id}
                                            id={way.id}
                                            name={way.tags.name}
                                            getWayById={this.getWayById}
                                            seeDetails={this.seeDetails}
                                            seeAverages={this.seeAverages}
                                        />
                                    )}
                                </CardDeck>

                            </Box>
                            <Form onSubmit={this.handleSubmitId}>
                                <FormGroup>

                                    <Box mb={4}>
                                        <TextField
                                            name="id"
                                            label="Road id"
                                            margin="dense"
                                            onChange={this.handleChangeId}
                                        />

                                    </Box>
                                    <Button variant="contained" color={"primary"} type="submit">Searching</Button>

                                </FormGroup>
                            </Form>
                        </Container>
                    </Grid>
                    <Grid item xs={8}>
                        <Sticky>
                            <Box mt={4}>
                                <MapLine
                                    loading={this.state.isLoading}
                                    gpsPoints={this.state.gpsPoints}
                                    nextGpsPoints={[]}
                                    position={this.state.position}
                                />
                            </Box>
                        </Sticky>
                        {/*<StickyContainer>*/}
                        {/*    <Sticky>*/}

                        {/*    </Sticky>*/}
                        {/*</StickyContainer>*/}
                    </Grid>
                </Grid>
            </Box>
        </div>
    }


}

export default withRouter(Library);
