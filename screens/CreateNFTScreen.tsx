import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import FrontCamera from "../components/FrontCamera";
import { contractAddress } from "../constants/contracts";
import { getContract } from "../helpers/ethers";

import TOKEN_CONTRACT from "../constants/abis/tokenAbi.json";

const CreateNFT = () => {


  return (
    <View style={styles.cameraContainer}>
      <FrontCamera />
    </View>
  );
}

export default CreateNFT;

const styles = StyleSheet.create({
  cameraContainer: {
    // flex: 1,
    alignItems: 'center',
    height: 400,
    width: 400
  }
});