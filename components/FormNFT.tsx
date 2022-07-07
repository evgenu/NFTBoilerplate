import React, { useState } from "react";
import { Image, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import TOKEN_CONTRACT from "../constants/abis/tokenAbi.json";
import { getContract } from "../helpers/ethers";
import { contractAddress } from "../constants/contracts";
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'

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

function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

const FormNFT = ({ discardImage }: any) => {

  const web3provider = (useSelector((state : RootState) => state.web3provider.value));
  const address = useSelector((state: RootState) => state.address.value);
  const image = useSelector((state: RootState) => state.image.value);
  const contract = useSelector((state: RootState) => state.contract.value);
  const firebase = useSelector((state: RootState) => state.firebase.value);
  
  const [count, setCount] = useState(0);
  const [numberOfDocuments, setNumberOfDocuments] = useState(0);

  const publishNFT = async () => {
    const storage = getStorage(firebase);
    const firestore = getFirestore(firebase);
    const fileName = makeid(10).concat('.jpg');
    const storageRef = ref(storage, fileName);

    await firestore.collection('tokens').get().then(result => setNumberOfDocuments(result.size))

    await uploadBytesResumable(storageRef, _base64ToArrayBuffer(image))
      .then(uploadResult => console.log(uploadResult));

    await addDoc(collection(firestore, 'tokens'), {
      image: 'fileName',
      tokenId: numberOfDocuments + 1
    }).catch(e => console.log(e));
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