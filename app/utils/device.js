import { Dimensions } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

export const softbarHeight = Platform.OS === 'ios'?0:((ExtraDimensions.isSoftMenuBarEnabled() && ExtraDimensions.getSoftMenuBarHeight() === 0)?48:ExtraDimensions.getSoftMenuBarHeight());

export const statusbarHeight = Platform.OS === 'ios'?0:ExtraDimensions.getStatusBarHeight();

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Platform.OS === 'ios'?Dimensions.get('window').height:
                            ExtraDimensions.getRealWindowHeight();

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = deviceHeight - statusbarHeight - softbarHeight;

//console.log(statusbarHeight, softbarHeight, deviceHeight, screenHeight);