
import { Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

export default function Catalog() {

    const {data: products, isLoading, error} = useFetchProductsQuery();
    
    if(isLoading || !products) return <Typography variant='h6'>Loading...</Typography>
    if(error) return <Typography variant='h6'>Error fetching products.</Typography>

    return( 
    <>   
        <ProductList products={products} />
    </>
  );
}