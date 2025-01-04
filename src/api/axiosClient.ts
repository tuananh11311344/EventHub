import axios from 'axios';
import queryString from 'query-string';
import {appInfo} from '../constants/appInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async () => {
  const res = await AsyncStorage.getItem('auth');
  return res ? JSON.parse(res).accessToken : '';
};

const axiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: parms => queryString.stringify(parms),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const accessToken = await getAccessToken();  
  config.headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;
  return config;
});

axiosClient.interceptors.response.use((res: any) => {
  if (res.data && res.status === 200) {
    return res.data;
  }
  throw new Error('Error');
}),
  (error: any) => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  };

export default axiosClient;
