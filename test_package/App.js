import { StyleSheet, Text, SafeAreaView, Button, StatusBar, Image } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import React, { useState, useCallback } from 'react';
import * as RNFS from 'react-native-fs';
// if only pdf can be select from the file manager  
// type: [DocumentPicker.types.pdf]
const App = () => {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      // console.log(response)
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);
  
  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle={'dark-content'} />
      {fileResponse.map((file, index) => (
        <React.Fragment>
          <Image 
            key={index.toString()}
            source={{ uri: file.uri}}
            style={styles.image}
           />
        </React.Fragment>
      ))}
      <Button title="Select 📑" onPress={handleDocumentSelection} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 100,
    height: 100
  }
});

{/* <Text
  key={index.toString()}
  style={styles.uri}
  numberOfLines={1}
  ellipsizeMode={'middle'}>
  {file?.uri}
</Text> */}