import React, {Component} from 'react';

import {Map, TileLayer, Polyline, Marker, Popup} from 'react-leaflet'
import * as L from "leaflet";


export default function MapLine(props) {
    let zoom = 18;
    let position = props.position;
    let coordinates = props.gpsPoints;


    let nextCoordinates = props.nextGpsPoints;
    


    // if (coordinates.length > 0) {
    //     position = coordinates[Math.floor(coordinates.length / 2)];
    // }
    console.log(coordinates);
    if(coordinates.length < 1) {
        coordinates = position;
        console.log(coordinates);
        // coordinates.push(position);
        console.log("here")
    }

    if (props.loading) {
        return <div id="app">
            <div className="logo">
                <img src={'load.gif'} alt={"loading"}/>
            </div>
        </div>;
    }
    let name = "";
    console.log(props.tags);
    if(props.tags != undefined) {
        name = props.tags.name;
    }
    // console.log(props.popUpPoints);
    // console.log(coordinates);
    return (

        <Map center={position[0]} maxZoom={zoom}  bounds={coordinates} onDblclick={props.handleDbClick} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            { props.popUpPoints.map( gpsPoint =>
                <Marker key={gpsPoint.id} position={[gpsPoint.latitude, gpsPoint.longitude]}>
                    <Popup>
                        {gpsPoint.latitude}, {gpsPoint.longitude} <br/> {name} <br/> Id: {props.wayId}
                    </Popup>
                </Marker>
            )}
            <Polyline color={'blue'}
                      positions={coordinates}/>
            <Polyline color={'red'}
                      positions={nextCoordinates}/>
        </Map>

    );
}
