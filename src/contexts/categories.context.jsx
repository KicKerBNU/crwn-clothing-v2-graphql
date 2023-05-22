import { createContext, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

const COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(COLLECTIONS)
  const [categoriesMap, setCategoriesMap] = useState({});

  console.log(data, loading, error);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
