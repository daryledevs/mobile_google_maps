// import React, { Component } from 'react'
// import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// console.disableYellowBox = true;

// export default class DiscoveryLocation extends Component {
// render() {
// return (
//     <View style={styles.container}>
//   <View style={styles.vwheader} >
//       <TouchableOpacity
//           onPress={() => { this.props.navigation.goBack() }}
//       >
//           <Image source={require('../../Images/left-arrow-red.png')} style={{ height: 25, width: 30, marginTop: 22, marginLeft: 15, }}
//           />
//       </TouchableOpacity>
//       <Text style={styles.txtdisloc}>Discovery Location </Text>
//   </View>

//   <View style={styles.mapcontainer}>

//       <MapView
//           provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           region={{
//               latitude: 37.78825,
//               longitude: -122.4324,
//               latitudeDelta: 0.015,
//               longitudeDelta: 0.0121,
//           }}
//       >
//       </MapView>
//       <View style={{ marginTop: hp('12%'), }}>
//           <GooglePlacesAutocomplete
//               placeholder='Enter City, State, Country'
//               minLength={2} // minimum length of text to search
//               autoFocus={false}
//               fetchDetails={true}
//               onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//                   console.log(data);
//                   console.log(details);
//               }}
//               getDefaultValue={() => {
//                   return 'Mataram';
//               }}

//               query={{
//                   // available options: https://developers.google.com/places/web-service/autocomplete
//                   key: 'MY_API_KEY',
//                   language: 'en', // language of the results
//                   types: '(cities)' // default: 'geocode'
//               }}

              // styles={{
              //     textInputContainer: {
              //         width: wp('90%%'), height: hp('7%'), borderRadius: 11, borderTopWidth: 0,
              //         borderBottomWidth: 0
              //     },
              //     textInput: {
              //         marginLeft: 0,
              //         marginRight: 0,
              //         backgroundColor: 'D3D3D3'
              //     },
              //     description: {
              //         fontWeight: 'bold',
              //     },
              //     predefinedPlacesDescription: {
              //         color: '#1faadb'
              //     },
              //     powered: {

              //     },

              // }}
//               filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//               predefinedPlacesAlwaysVisible={true}
//           />
//       </View>
//   </View>

//   <View style={{ marginTop: 10, marginBottom: 10 }}>
//       <TouchableOpacity style={styles.btn}>
//           <Text style={styles.txtbtn}>Confirm Location</Text>
//       </TouchableOpacity>
//   </View>

// </View>
// );
