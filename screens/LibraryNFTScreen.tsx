import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { contractAddress } from "../constants/contracts";
import { getContract } from "../helpers/ethers";
import { RootState } from "../store";

import TOKEN_CONTRACT from "../constants/abis/tokenAbi.json";
import ImageNFT from "../components/ImageNFT";


const LibraryNFTScreen = () => {

  const web3provider = useSelector((state: RootState) => state.web3provider.value);
  const address = useSelector((state: RootState) => state.address.value);
  const contract = useSelector((state: RootState) => state.contract.value);
  
  const signer = web3provider.getSigner();

  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  }, [])

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  }

  return (
    <View>
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <View key={i}>
            <ImageNFT tokenId={i}/>
          </View>
        ))
      }
    </View>
  );
}

export default LibraryNFTScreen;