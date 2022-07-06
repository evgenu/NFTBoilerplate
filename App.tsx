import './global';
import '@ethersproject/shims';
import 'dotenv/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import WalletConnectExperience from './screens/WalletConnectScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNFT from './screens/CreateNFTScreen';
import { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { formatEther } from '@ethersproject/units';
import { Provider } from 'react-redux';
import { store } from './store';
import LibraryNFTScreen from './screens/LibraryNFTScreen';

const Stack = createNativeStackNavigator();

const SCHEME_FROM_APP_JSON = 'walletconnect';

export default function App() {
  const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null);
  const [tokenContract, setTokenContract] = useState<Contract | null>(null);
  const [addressBalance, setAddressBalance] = useState('');
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [address, setAddress] = useState('');

  const getBalance = async () => {
    if (web3Provider && address && !balanceLoading) {
      try {
        await setBalanceLoading(true);
        const balance = await web3Provider.getBalance(address);
        await setAddressBalance(formatEther(balance));
        await setBalanceLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };
  

  return (
      <WalletConnectProvider
        redirectUrl={Platform.OS === 'web' ? window.location.origin : `${SCHEME_FROM_APP_JSON}://`}
        storageOptions={{
          asyncStorage: AsyncStorage as any,
        }}
      >
        <Provider store={store}>
          <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Home page" component={WalletConnectExperience} />
                <Stack.Screen name="Create NFT" component={CreateNFT} />
                <Stack.Screen name="Library NFT" component={LibraryNFTScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
        <StatusBar style="dark" />
      </WalletConnectProvider>
  );
}
