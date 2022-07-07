import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Button, Image, Text, View } from "react-native";
import { parseEther } from "@ethersproject/units";
import { collection, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { resolve } from "node:path/win32";

const ImageNFT = ({ tokenId }: any) => {
  const contract = useSelector((state: RootState) => state.contract.value);
  const address = useSelector((state: RootState) => state.address.value);
  const firebase = useSelector((state: RootState) => state.firebase.value);
  const firestore = getFirestore(firebase);

  const [image, setImage] = useState('');

  useEffect(() => {
    const q = query(collection(firestore, 'tokens'), where('tokenId', '==', tokenId));
    const queryResults = getDocs(q).then(result => {
      result.forEach(doc => {
        setImage(doc.image);
      });
    });
    
    
  }, [])
    

  return (
    <View>
      <Image source={{ uri: 'data:image/jpg;base64,' + image }} >
    </View>
  );
}

export default ImageNFT;