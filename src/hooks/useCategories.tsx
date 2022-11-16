import { useState, useEffect } from 'react';
import cafeApi from '../api/cafeApi';
import { CategoriesResponse, Categoria } from '../interfaces/AppInterfaces';

const useCategories = () => {

  const [ isLoading, setIsLoading ] = useState( true );
  const [ categories, setCategories ] = useState<Categoria[]>([]);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async() => {
    const res = await cafeApi.get<CategoriesResponse>('/categorias');
    setCategories( res.data.categorias );
    setIsLoading( false );
  }

  return {
    categories,
    isLoading
  }
}

export default useCategories;
