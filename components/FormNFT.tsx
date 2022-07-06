import React, { useState } from "react";
import { Image, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import TOKEN_CONTRACT from "../constants/abis/tokenAbi.json";
import { getContract } from "../helpers/ethers";
import { contractAddress } from "../constants/contracts";
import { getBlob, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage'

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

const FormNFT = ({ discardImage }: any) => {

  const web3provider = (useSelector((state : RootState) => state.web3provider.value));
  const address = useSelector((state: RootState) => state.address.value);
  const image = useSelector((state: RootState) => state.image.value);
  const contract = useSelector((state: RootState) => state.contract.value);
  const firebase = useSelector((state: RootState) => state.firebase.value);
  
  const [count, setCount] = useState(0);
  const storage = getStorage();


  const publishNFT = async () => {
    let storage = getStorage(firebase);
    let storageRef = ref(storage, makeid(10).concat('.jpg'));
    console.log(makeid(10).concat('.jpg'));
    console.log(image.length);
    await uploadBytesResumable(storageRef, image, 'base64')
      .then(uploadResult => console.log(uploadResult));
  }

  return (
    <>
      <Image style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + image }}/>
      <Button title="Take new picture" onPress={() => discardImage}/>
      <Button title="Use picture" onPress={publishNFT}/>
    </>
  );
}

export default FormNFT;

const styles = StyleSheet.create({
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});