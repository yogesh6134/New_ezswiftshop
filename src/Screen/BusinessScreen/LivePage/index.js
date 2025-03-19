import React from 'react';
import { StyleSheet, View } from 'react-native';
// import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
// import * as ZIM from 'zego-zim-react-native';

export default function LivePage({route}) {
    console.log('route----------------:', route)
    return (
        <View style={styles.container}>
            {/* <ZegoUIKitPrebuiltLiveStreaming
                appID={152973573}
                appSign={'8f451ab5198f3bff4e70b6ea83007936d4f4909bec674e865096e57be54bd30a'}
                userID={'userID'}
                userName={'userName'}
                liveID={'liveID'}
                config={{
                  ...HOST_DEFAULT_CONFIG,
                  onStartLiveButtonPressed: () => {},
                  onLiveStreamingEnded: () => {},
                  onLeaveLiveStreaming: () => { props.navigation.navigate('HomePage') },
              }}
              plugins={[ZIM]}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
  }
});

