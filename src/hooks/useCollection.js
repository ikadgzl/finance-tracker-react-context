import { useEffect, useRef, useState } from 'react';
import { projectFireStore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocument] = useState();
  const [error, setError] = useState();

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFireStore.collection(collection);

    // array n -> [1,2,3] -> func a(x,y,z) -> a(...n) -> a(1,2,3)
    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocument(results);
        setError(null);
      },
      (err) => {
        console.log(err);

        setError('could not fetch data');
      }
    );

    return () => {
      unsubscribe();
    };
  }, [collection, query, orderBy]);

  return { documents, error };
};
