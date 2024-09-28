// src/utils/locationUtils.ts

import {Platform, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  Permission, // Import the Permission type
} from 'react-native-permissions';

/**
 * Requests location permission based on the platform.
 * @returns {Promise<boolean>} - Returns true if permission is granted, else false.
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    let permission: Permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else {
      Alert.alert(
        'Unsupported Platform',
        'Location permissions are not supported on this platform.',
      );
      return false;
    }

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    }

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }

    if (result === RESULTS.BLOCKED) {
      Alert.alert(
        '권한이 필요합니다',
        '앱 설정에서 위치 권한을 허용해주세요.',
        [
          {text: '취소', style: 'cancel'},
          {
            text: '설정으로 이동',
            onPress: () => openSettings(),
          },
        ],
      );
      return false;
    }

    return false;
  } catch (error) {
    console.warn('Error requesting location permission:', error);
    return false;
  }
};

/**
 * Retrieves the current geographic location.
 * @returns {Promise<{ latitude: number; longitude: number }>} - Returns the current latitude and longitude.
 */
export const getCurrentLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      error => {
        console.warn(
          'Error getting current location:',
          error.code,
          error.message,
        );
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  });
};
