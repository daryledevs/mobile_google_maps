import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// try to search for reverse geolocation from @react-native-community/geolocation
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from "react-native-maps"; 
import * as turf from '@turf/turf'

const App = () => {

  // 14.572463333333333, 121.00340333333334 (origin)
  // 14.576687626098934, 121.0068478435278 (destination)
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R =  6373; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  // console.log("Distance: ", getDistanceFromLatLonInKm(14.572463333333333, 121.00340333333334, 14.576687626098934, 121.0068478435278));
  //  * 0.621371
  //  degrees, radians
  
  var from = turf.point([-121.00340333333334, 14.572463333333333]);
  var to = turf.point([-121.0068478435278, 14.576687626098934]);
  var options1 = {units: 'kilometers'};


  var distance1 = turf.distance(from, to, options1);
  // console.log(distance1, distance2)

  const mapRef = useRef(null)
  const [location, setLocation] = useState();
  const [markerLocation, setMarkerLocation] = React.useState();
  const [changeLocation, setChangeLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  });
  
  const myPlace = {
    ...location,
    latitudeDelta: 0.0041,
    longitudeDelta: 0.0052
  }
  const targetPlace = {
    latitude: 14.573534817215265,
    longitude: 121.00562995299698,
  }

  function goToMyLocation(){
    // console.log(mapRef.current);
    mapRef.current.animateToRegion(myPlace, 3 * 1000);
  }

  useEffect(() => {
    const _watchId = Geolocation.watchPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        
        console.log(latitude, longitude)
      },
      (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
      },
      
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    console.log(_watchId)
    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
    
  });
  
  // console.log("location: ", changeLocation.latitude, changeLocation.longitude);
  // console.log("Ref: ", mapRef.current)
  // console.log(markerLocation)

  const userCoor = [{x:14.111, y:120.930}];
  const clinics = [
    {name: "clinic04", x:16.234, y:122.242}, 
    {name: "clinic01", x:19.234, y:125.242},
    {name: "clinic03", x:17.234, y:123.242},
    {name: "clinic05", x:15.234, y:121.242},
    {name: "clinic02", x:18.234, y:124.242},
  ]; 

    
  let km = []

  for(let a = 0; a < userCoor.length; a++){
    for(let b = 0; b < clinics.length; b++){
      let distance = getDistanceFromLatLonInKm(
        userCoor[a].x, userCoor[a].y, 
        clinics[b].x, clinics[b].y
      );
      // console.log(distance, clinics[b].name)
      km.push(distance);
    }
    // console.log(km)
  }
  
  function bubbleSort(km, clinic){
    console.log("BEFORE");
    for(let a = 0; a < km.length; a++){
      console.log(km[a], clinic[a])
    }
    for(var i = 0; i < km.length; i++){
      for(var j = 0; j < km.length; j++){        
        if(km[j] > km[j+1]){
          var previous_km = km[j];
          var previous_clinic = clinic[j];

          km[j]     = km[j + 1];
          clinic[j] = clinic[j + 1];

          km[j + 1] = previous_km;
          clinic[j + 1] = previous_clinic;
        }
      }
    }
    console.log("AFTER")
    for(let a = 0; a < km.length; a++){
      console.log(km[a], clinic[a])
    }
  }

  // bubbleSort(km, clinics)
 return (
   <View style={styles.container}>
     {location ? (
        <React.Fragment>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ...location,
              latitudeDelta: 0.0041,
              longitudeDelta: 0.0052
            }}
            onRegionChangeComplete={(changeLocation) => setChangeLocation(changeLocation)}
            showsUserLocation={false}  
            zoomEnabled={true}  
            zoomControlEnabled={true}  
          >

          {/* <Polyline 
            coordinates={[myPlace, targetPlace]} //specify our coordinates
            strokeColor={"#000"}
            strokeWidth={3}
            lineDashPattern={[1]}
          /> */}

          <Marker
            title='You are here'
            pinColor="green"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />

          <Marker
            draggable
            pinColor="yellow"
            title='Draggable'
            coordinate={{
              latitude: 14.57353514170404,
              longitude: 121.00562995299698,
            }}
            onDragEnd={(value) => setMarkerLocation(value.nativeEvent.coordinate)}
          />
          {/* (e) => {console.log('dragEnd', e.nativeEvent.coordinate)} */}
          <Marker
            title='Target place'
            coordinate={{
              latitude: 14.576220918958388,
              longitude: 121.00161468610168,
            }}
          />
          </MapView>
          <View style={styles.coordinateContainer}>
            <Text style={styles.text}>Latitude: {changeLocation.latitude}</Text>
            <Text style={styles.text}>Latitude: {changeLocation.longitude}</Text>
            <Button title='Go to my mark' onPress={() => goToMyLocation()} />
          </View>
        </React.Fragment>
      ) : (
        <Text>Loading...</Text>
      )}
   </View>
 );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coordinateContainer:{
    height: 80,
    width: 220,
    backgroundColor: 'white',
  },
  text:{
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default App;