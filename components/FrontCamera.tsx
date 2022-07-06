import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from 'react';
import FormNFT from "./FormNFT";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setImage } from "../store/image";


const FrontCamera = () => {
  let cameraRef = useRef<Camera | undefined>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>();
  const [photo, setPhoto] = useState<any | undefined>();

  const web3provider = useSelector((state : RootState) => state.web3provider.value);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  }

  if(photo !== undefined) {
    dispatch(setImage(photo.base64));

    return (
      <View style={styles.container}>
        <FormNFT discardImage={() => setPhoto(undefined)} />
      </View>
    );
  }

  if(hasCameraPermission === undefined) {
    return <Text>Requesting camera permissions...</Text>
  } else if(!hasCameraPermission) {
    return <Text>You need camera permissions...</Text>
  }

  return (
    <>
      <Camera style={styles.container} ref={cameraRef} type={CameraType.front} >
      </Camera>
        <View style={styles.buttonContainer}>
        <Button title="Shoot" onPress={takePicture} />
      </View>
   </>
  )

}

export default FrontCamera;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    width: '80%'
    // justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'center'
  }
});