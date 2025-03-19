import './gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { setSignalStrength, setSignalType } from './src/redux/slice/loadingSlice';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import { COLORS } from './src/utils/color';
import { useAppDispatch } from './src/redux/hooks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RouteStack from './src/Routes/RouteStack';
import Loader from './src/component/Loader';
import InternetScreen from './src/Screen/InternetScreen';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
  }, []);



  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      dispatch(setSignalType(state.type));
      if (state.details && 'strength' in state.details) {
        const strength = state.details.strength;
        dispatch(setSignalStrength(strength));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      {isConnected ? (
        <>
          <StatusBar
            animated={true}
            backgroundColor={COLORS.white}
            barStyle="dark-content"
          />
          {/* <RouteStack /> */}
          <PaperProvider>
      <RouteStack />
    </PaperProvider>
          <Loader />
          <FlashMessage position="top" />
        </>
      ) : (
        <InternetScreen isConnected={isConnected} setIsConnected={setIsConnected} />
      )}
    </SafeAreaProvider>
  );
};

export default App;


