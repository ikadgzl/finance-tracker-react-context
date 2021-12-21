import { useEffect, useReducer, useState } from 'react';
import { projectFireStore, timeStamp } from '../firebase/config';

const INITIAL_STATE = {
  document: null,
  isPending: false,
  error: null,
  success: false
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return {
        error: null,
        isPending: false,
        document: null,
        success: true
      };
    case 'DELETED_DOCUMENT':
      return {
        error: null,
        isPending: false,
        document: action.payload,
        success: true
      };
    case 'ERROR':
      return {
        error: action.payload,
        isPending: false,
        document: null,
        success: false
      };
    default:
      break;
  }
};

export const useFireStore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, INITIAL_STATE);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFireStore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timeStamp.fromDate(new Date());
      const addedDoc = await ref.add({ ...doc, createdAt });

      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDoc });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).delete();

      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT'
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
