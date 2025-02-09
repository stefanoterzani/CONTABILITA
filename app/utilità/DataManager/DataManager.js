import { Platform } from 'react-native';
import CacheManagerWeb from '../DataManager/CacheManagerWeb';
import CacheManagerMobile from '../DataManager/CacheManagerMobile';
// Importa FirestoreManager quando sarà necessario
// import FirestoreManager from './FirestoreManager';
console.log('Platform.OS:', Platform.OS);
const DataManager = Platform.OS === 'web' ? CacheManagerWeb : CacheManagerMobile;
console.log('DataManager utilizza:', Platform.OS === 'web' ? 'CacheManagerWeb' : 'CacheManagerMobile');
export default DataManager;