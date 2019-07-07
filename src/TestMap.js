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
        isLoading: true,
        input: this.item,
        offset: '10%',
        endOffset: '60%',
        repeat: '10%',
        wayList: [],
        redWays: [],
        greenWay: [],
        pointList: []
    };
    constructor(props) {
        super(props);


        this.getWays = this.getWays.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        let ways = ["338025195", "338025192","7976593","500749781","7976631","607189198","23893643","38215485","26616176","31584766","177921854"
            ,"177921854","466395276","26616191","177921036","177921034","177921033","23893687", "466395277","24283528"];
        // let input = {...this.state.input};
        let wayList = []
        let points = [];

        for(let i=0; i < ways.length; i++) {
            this.setState({isLoading: true});
            axios
                .get(`/wayLineString/${ways[i]}`)
                .then(response => {
                    let coordinates = [];
                    response.data.forEach(point => {
                        coordinates.push([point.x, point.y])
                        points.push([point.x, point.y])
                    });
                    wayList.push(coordinates);
                    //let coordinates = response.data.map(gpsPoint => new L.LatLng(gpsPoint.x, gpsPoint.y));
                    console.log(coordinates);
                    console.log(wayList)
                    console.log(this.state.isLoading)
                    this.setState({
                        wayList: wayList,
                        pointList: points,
                        isLoading: false,
                        zoom: 16
                    })
                });
        }

        console.log(wayList)
        this.setState({
            wayList: wayList,
            pointList: points,
            isLoading: false,
            zoom: 16
        })
    }


    async getWays() {

        this.setState({isLoading: true});
        let ways = ["626022269"];
        let redWays= ["190358918", "626022268", "695807421", "695807422"];
         let greenWay = ["411054116"]
        // let input = {...this.state.input};

        let points = [];
        let wayList = [];
        axios
            .get(`/wayLineString/${ways[0]}`)
            .then(response => {
                let coordinates = [];
                response.data.forEach(point => {
                    coordinates.push([point.x, point.y])
                    points.push([point.x, point.y])
                });
                wayList.push(coordinates);
                //let coordinates = response.data.map(gpsPoint => new L.LatLng(gpsPoint.x, gpsPoint.y));
                console.log(coordinates);
                console.log(wayList)
                console.log(this.state.isLoading)
                this.setState({
                    wayList: wayList,
                    pointList: points,
                    isLoading: false,
                    zoom: 16
                })
            });
        let wayList1 = [];
        axios
            .get(`/wayLineString/${greenWay[0]}`)
            .then(response => {
                let coordinates = [];
                response.data.forEach(point => {
                    coordinates.push([point.x, point.y])
                    points.push([point.x, point.y])
                });
                wayList1.push(coordinates);
                //let coordinates = response.data.map(gpsPoint => new L.LatLng(gpsPoint.x, gpsPoint.y));
                console.log(coordinates);
                console.log(wayList1)
                console.log(this.state.isLoading)
                this.setState({
                    greenWay: wayList1,
                    pointList: points,
                    isLoading: false,
                    zoom: 16
                })
            });
        let wayList2 = [];
        for(let i=0; i < redWays.length; i++) {
            this.setState({isLoading: true})
            axios
                .get(`/wayLineString/${redWays[i]}`)
                .then(response => {
                    let coordinates = [];
                    response.data.forEach(point => {
                        coordinates.push([point.x, point.y])
                        points.push([point.x, point.y])
                    });
                    wayList2.push(coordinates);
                    //let coordinates = response.data.map(gpsPoint => new L.LatLng(gpsPoint.x, gpsPoint.y));
                    console.log(coordinates);
                    console.log(wayList2)
                    console.log(this.state.isLoading)
                    this.setState({
                        redWays: wayList2,
                        pointList: points,
                        isLoading: false,
                        zoom: 16
                    })
                });
        }

    console.log(wayList)
        this.setState({
            wayList: wayList,
            pointList: points,
            isLoading: false,
            zoom: 16
        })
    }

    render() {
        const {wayList,redWays, greenWay, pointList, isLoading,position} = this.state;
        console.log(this.state)
        // let lat = gpsPoints[0].latitude;
        // let lng = gpsPoints[0].longitude;
        // const position = [lat, lng];
        console.log(wayList)
        console.log(pointList)
        console.log(isLoading)
        if (isLoading) {
            return <div id="app">
                <div className="logo">
                    <img src={'load.gif'} alt={"loading"}/>
                </div>
            </div>;
        }
        console.log("after")
        return (

            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {/*{ pointList.map( gpsPoint =>*/}
                {/*    <Marker key={gpsPoint.id} position={[gpsPoint[0], gpsPoint[1]]}>*/}
                {/*        <Popup>*/}
                {/*            {gpsPoint[0]}, {gpsPoint[1]}*/}
                {/*        </Popup>*/}
                {/*    </Marker>*/}
                {/*)}*/}
                { wayList.map( way => {
                        console.log(way)
                        return <Polyline color={'blue'}
                                  positions={way}/>
                    }
                )}

                { redWays.map( way => {
                        console.log(way)
                        return <Polyline color={'red'}
                                         positions={way}/>
                    }
                )}

                {/*{ greenWay.map( way => {*/}
                {/*        console.log(way)*/}
                {/*        return <Polyline color={'green'}*/}
                {/*                         positions={way}/>*/}
                {/*    }*/}
                {/*)}*/}

                <Control position="topleft" >
                    <Form onSubmit={this.handleSubmit}>
                        {/*<FormGroup>*/}
                        {/*    <Label for="id"><b>start</b></Label>*/}
                        {/*    <Input type="text" name="start" id="start" onChange={this.handleChange}*/}
                        {/*           autoComplete="latitude" style={{width: "100px"}}/>*/}
                        {/*</FormGroup>*/}
                        {/*<FormGroup>*/}
                        {/*    <Label for="id"><b>end</b></Label>*/}
                        {/*    <Input type="text" name="end" id="end"  onChange={this.handleChange}*/}
                        {/*           autoComplete="end" style={{width: "100px"}}/>*/}
                        {/*</FormGroup>*/}
                        <FormGroup>
                            <Button size="small" color="primary" onClick={() => this.getWays()}>Test</Button>
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
