import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTipoApp,
  updateColumnStyles,
  setHeaderHeight,
  setFooterHeight,
  toggleLeftColumn,
  toggleRightColumn
} from '../redux/slice/SliceColonnaStandard';

const useColonneStandard = (tipoApp) => {
  const dispatch = useDispatch();
  
  const {
    windowHeight, 
    windowWidth, 
    headerHeight, 
    footerHeight, 
    leftColumnStyles, 
    centralColumnStyles, 
    rightColumnStyles, 
    showColonnaSinistra, 
    showColonnaDestra
  } = useSelector((state) => state.standardColumn);

  useEffect(() => {
    dispatch(setTipoApp(tipoApp));
    dispatch(updateColumnStyles());
  }, [dispatch, windowWidth, windowHeight, tipoApp]);

  return {
    windowHeight, 
    windowWidth, 
    headerHeight, 
    footerHeight, 
    leftColumnStyles, 
    centralColumnStyles, 
    rightColumnStyles, 
    showColonnaSinistra, 
    showColonnaDestra,
    setHeaderHeight: (height) => dispatch(setHeaderHeight(height)),
    setFooterHeight: (height) => dispatch(setFooterHeight(height)),
    toggleLeftColumn: () => dispatch(toggleLeftColumn()),
    toggleRightColumn: () => dispatch(toggleRightColumn())
  };
};

export default useColonneStandard;