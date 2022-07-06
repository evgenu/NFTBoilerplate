import React, { useState } from "react";
import { Image, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import TOKEN_CONTRACT from "../constants/abis/tokenAbi.json";
import { getContract } from "../helpers/ethers";
import { contractAddress } from "../constants/contracts";

const FormNFT = ({ discardImage }: any) => {

  const web3provider = (useSelector((state : RootState) => state.web3provider.value));
  const address = useSelector((state: RootState) => state.address.value);
  const image = useSelector((state: RootState) => state.image.value);
  const contract = useSelector((state: RootState) => state.contract.value);
  const [count, setCount] = useState(0);
  

  return (
    <>
      <Image style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + image }}/>
      <Button title="Take new picture" onPress={() => discardImage}/>
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