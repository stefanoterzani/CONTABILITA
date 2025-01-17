import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateColumnDimensions as updateStandardColumnDimensions } from '../redux/slice/SliceColonnaStandard'
import { updateColumnDimensions as updateOptionalColumnDimensions } from '../redux/slice/SliceColonnaOpzionale'
import { Dimensions, Platform } from 'react-native';


const WindowResizeHandler = () => {
  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState({ 
    width: Platform.OS === 'web' ? window.innerWidth : Dimensions.get('window').width, 
    height: Platform.OS === 'web' ? window.innerHeight : Dimensions.get('window').height,
 });

  useEffect(() => {
    
    const handleResize = () => {
           let newWidth, newHeight;
        if (Platform.OS === 'web') { 
                newWidth= window.innerWidth;
                newHeight= window.innerHeight;        
        } else { 
                newWidth= Dimensions.get('window').width; 
                newHeight= Dimensions.get('window').height; 
        } 
        setDimensions({ width: newWidth, height: newHeight });
      
        dispatch(updateStandardColumnDimensions({ width: newWidth, height: newHeight }));
        dispatch(updateOptionalColumnDimensions({ width: newWidth, height: newHeight }));
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
