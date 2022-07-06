import { Web3Provider } from '@ethersproject/providers';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import LoginButton from '../components/LoginButton';
import LoginTitle from '../components/LoginTitle';
import LogoutButton from '../components/LogoutButton';
import { RootState } from '../store';
import { useEffect } from 'react';
import React from 'react';
import { setWeb3Provider } from '../store/web3provider';
import { setAddress } from '../store/address';
import { setContract } from '../store/contract';
import { setFirebase } from '../store/firebase';
import { getContract } from '../helpers/ethers';
import { contractAddress } from '../constants/contracts';
import { initializeApp } from 'firebase/app';


import TOKEN_CONTRACT from "../constants/abis/tokenAbi.json";



const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
};

export default function WalletConnectExperience({ navigation }: any) {
  const connector = useWalletConnect();

  const web3provider = useSelector((state : RootState) => state.web3provider.value);
  const address = useSelector((state : RootState) => state.address.value);
  const contract = useSelector((state: RootState) => state.contract.value);
  const firebase = useSelector((state: RootState) => state.firebase.value);
  const dispatch = useDispatch();

  const firebaseConfig = {
    apiKey: "AIzaSyCb1sRArLczY1KTWxS_WTrLSa6hWvcV530",
    authDomain: "nfttest-9fb23.firebaseapp.com",
    projectId: "nfttest-9fb23",
    storageBucket: "nfttest-9fb23.appspot.com",
    messagingSenderId: "713311321147",
    appId: "1:713311321147:web:6def3cab4737af84ea701e",
    measurementId: "G-SG576QYM6N"
  };

  useEffect(() => {
    if (connector.connected) {
      const initProvider = async () => {
        const provider = new WalletConnectProvider({
          infuraId: process.env.INFURA_ID,
          connector,
          qrcode: false,
        });
        await provider.enable();
        const web3Provider = new Web3Provider(provider);
        await setWeb3Provider(web3Provider);
        dispatch(setWeb3Provider(web3Provider));
        if (!address) {
          dispatch(setAddress(connector.accounts[0]));
        }
      };
      initProvider();

      dispatch(setContract(getContract(contractAddress, TOKEN_CONTRACT.abi, web3provider, address)));
      dispatch(setFirebase(initializeApp(firebaseConfig)));

    }
  }, [connector.connect]);

  const connectWallet = React.useCallback(async () => {
    const state = await connector.connect();
    dispatch(setAddress(state.accounts[0]));
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center',
    justifyContent: 'center',}}>
      {!connector.connected ? (
        <>
          <LoginTitle />
          <LoginButton onPress={connectWallet} />
        </>
      ) : (
        <>
          <View style={styles.accountInformationContainer}>
            <Text style={styles.accountInformation}>{shortenAddress(connector.accounts[0])}</Text>
          </View>
          <View style={styles.navigationButtonsContainer}>
            <Button style={styles.navigationButton} label="Create NFT" onPress={() => {navigation.navigate('Create NFT')}}/>
            <Button style={styles.navigationButton} label="Library NFT" onPress={() => {navigation.navigate('Create NFT')}}/>
          </View>
          <LogoutButton onPress={killSession} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5A45FF',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  accountInformationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountInformation: {
    textAlign: 'center',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationButtonsContainer: {
    flex: 1,
    width: '80%'
  },
  navigationButton: {
    alignSelf: 'center',
    textAlign: 'center'
  }
});
