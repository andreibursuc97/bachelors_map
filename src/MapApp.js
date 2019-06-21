import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Control from 'react-leaflet-control';

import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import {Button, Container} from "reactstrap";
import axios from 'axios';
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";

class MapApp extends Component {

    item = {
      start: null,
      end: null
    };
    state = {
        gpsPoints: [],
        markers: [],
        lat: 46.769496,
        lng: 23.588628,
        position: [46.769496, 23.588628],
        zoom: 15,
        isLoading: false,
        input: this.item,
        offset: '10%',
        endOffset: '60%',
        repeat: '10%'
    };
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const position = [this.state.lat, this.state.lng];
        const position2 = [51.510, -0.09];
        this.setState({markers: [position, position2]});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let input = {...this.state.input};
        input[name] = value;
        this.setState({input});
    }

    seeMarkers() {
        this.setState({isLoading: true});
        let input = {...this.state.input};
        axios
            .get(`/street/points/start/220/end/250?optimized=off` )
            .then(response => this.setState({position: [response.data[0].latitude,response.data[0].longitude], gpsPoints: response.data, isLoading: false}));
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        let input = {...this.state.input};
        axios
            .get(`/street/points/start/${input.start}/end/${input.end}?optimized=off` )
            .then(response => this.setState({position: [response.data[0].latitude,response.data[0].longitude], gpsPoints: response.data, isLoading: false}));
    }

    render() {
        const {gpsPoints, markers, isLoading,position} = this.state;

        // let lat = gpsPoints[0].latitude;
        // let lng = gpsPoints[0].longitude;
        // const position = [lat, lng];
        console.log(markers);
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }
        return (

            <Map center={position} zoom={this.state.zoom}>
                <Button  size="bg" color="danger" onClick={() => this.deleteDoctor()}>Delete</Button>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {/*<Polyline color={'red'} positions={markers}/>*/}
                { gpsPoints.map( gpsPoint =>
                <Marker key={gpsPoint.id} position={[gpsPoint.latitude, gpsPoint.longitude]}>
                    <Popup>
                        {gpsPoint.latitude}, {gpsPoint.longitude} <br/> {new Date(parseInt(gpsPoint.date,10)).toString('MM/dd/yy HH:mm:ss')} <br/> {gpsPoint.street}
                    </Popup>
                </Marker>
                )}
                <Control position="topleft" >
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="id"><b>start</b></Label>
                            <Input type="text" name="start" id="start" onChange={this.handleChange}
                                   autoComplete="latitude" style={{width: "100px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"><b>end</b></Label>
                            <Input type="text" name="end" id="end"  onChange={this.handleChange}
                                   autoComplete="end" style={{width: "100px"}}/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="danger" type="submit">See Markers</Button>
                        </FormGroup>
                    </Form>
                    {/*<button*/}
                        {/*onClick={ () => this.seeMarkers() }*/}
                    {/*>*/}
                        {/*See Markers*/}
                    {/*</button>*/}
                </Control>
            </Map>

        );
    }
}

export default MapApp;
