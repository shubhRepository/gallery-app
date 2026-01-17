import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAppDispatch } from './useStoreHooks';
import { exitSelectionMode } from '../store/photoActions';

export function useResetSelectionOnBlur() {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(exitSelectionMode());
      };
    }, [dispatch]),
  );
}
