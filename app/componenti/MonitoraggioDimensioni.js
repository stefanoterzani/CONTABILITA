import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateColumnDimensions } from '../redux/slice/columnDimensionSlice';

const WindowResizeHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateColumnDimensions());
    };

    handleResize(); // Aggiorna le dimensioni inizialmente

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return null;
};

export default WindowResizeHandler;
