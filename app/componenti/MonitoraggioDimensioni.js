import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateColumnDimensions } from '../redux/slice/columnDimensionSlice';
import { Dimensions, Platform } from 'react-native';


const WindowResizeHandler = () => {
  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState({ 
    width: Platform.OS === 'web' ? window.innerWidth : Dimensions.get('window').width, 
    height: Platform.OS === 'web' ? window.innerHeight : Dimensions.get('window').height,
 });

  useEffect(() => {
    
    const handleResize = () => {
        if (Platform.OS === 'web') { 
            setDimensions({ 
                width: window.innerWidth, 
                height: window.innerHeight, 
            }); 
        } else { 
            setDimensions({ 
                width: Dimensions.get('window').width, 
                height: Dimensions.get('window').height, 
            });
         } 
         dispatch(updateColumnDimensions()); 
        };  
   
    handleResize(); // Aggiorna le dimensioni inizialmente
    if (Platform.OS === 'web') {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    } else {
        const subscription = Dimensions.addEventListener('change', handleResize);
        return () => { 
            subscription?.remove(); 
        };
    }  

  }, [dispatch]);

  return null;
};

export default WindowResizeHandler;
