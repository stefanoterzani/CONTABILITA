import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTipoApp,
  updateColumnStyles,
  toggleLeftColumn,
  toggleRightColumn,
  showRightColumn,
  hideRightColumn,
  toggleWarningMessage
} from '../redux/slice/SliceColonnaOpzionale';

const useColonneOpzionali = (tipoApp) => {
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
    showColonnaDestra, 
    showWarningMessage
  } = useSelector((state) => state.optionalColumn);

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
    showWarningMessage,
    toggleLeftColumn: () => dispatch(toggleLeftColumn()),
    toggleRightColumn: () => dispatch(toggleRightColumn()),
    showRightColumn: () => dispatch(showRightColumn()),
    hideRightColumn: () => dispatch(hideRightColumn()),
    toggleWarningMessage: () => dispatch(toggleWarningMessage())
  };
};

export default useColonneOpzionali;