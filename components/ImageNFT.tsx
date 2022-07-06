import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Button, Text, View } from "react-native";
import { parseEther } from "@ethersproject/units";

const ImageNFT = ({ tokenId }: any) => {
  const contract = useSelector((state: RootState) => state.contract.value);
  const address = useSelector((state: RootState) => state.address.value);
  
  const [isMinted, setIsMinter] = useState(false);
  const metadataURI = '';
  
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
  }

  const mintToken = async () => {
    const result = await contract.payToMint(address, metadataURI, {
      value: parseEther('0.05'),
    });

    await result.wait();

    getMintedStatus();
  }

  const getURI = async () => {
    const result = contract.tokenURI(tokenId);
  }

  return (
    <View>
      {isMinted ? (
        <Button title="Minted" onPress={getURI} />
      ) : (
        <Button title="Not Minted" onPress={mintToken} />
      )}
    </View>
  );
}

export default ImageNFT;