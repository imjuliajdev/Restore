
import { Grid2, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchProductsQuery, useFetchFiltersQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppSelector } from "../../app/store/store";
import { setPageNumber } from "./catalogSlice";
import AppPagination from "../../app/shared/AppPagination";
import { useAppDispatch } from "../../app/store/store";

export default function Catalog() {
    const productParams = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const {data:filtersData, isLoading:filtersLoading} = useFetchFiltersQuery();
    const {data, isLoading, error} = useFetchProductsQuery(productParams);
    
    if(isLoading || !data || filtersLoading || !filtersData)  return <Typography variant='h6'>Loading...</Typography>
    if(error) return <Typography variant='h6'>Error fetching products.</Typography>

    return( 
    <Grid2 container spacing={4}>   
        <Grid2 size={3}>    
          <Filters filtersData={filtersData} />
        </Grid2>
        <Grid2 size={9}>  
          
            {data.items && data.items.length > 0 ? (
              <>
                <ProductList products={data.items} />
                <AppPagination 
                  metaData={data.pagination} 
                  onPageChange={(page: number) => {
                    dispatch(setPageNumber(page))
                    window.scrollTo({top:0, behavior: 'smooth'});
                  }} />
              </>
            ) : (
              <Typography variant='h6'>There are no results for this filter</Typography>
            )}
            
        </Grid2>
        
    </Grid2>  
  );
}