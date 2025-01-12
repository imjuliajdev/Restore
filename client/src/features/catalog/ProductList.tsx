import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { Grid2 } from "@mui/material";

type Props = {
    products: Product[];
}

export default function ProductList({products}: Props) {
  return (
    <Grid2
        sx={{display: 'flex', flexWrap: 'wrap',gap: 3, justifyContent: 'center'}}>
        {products.map((product) => (
            <Grid2 size={3} display='flex' key = {product.id}>
                <ProductCard product={product}/>
            </Grid2>
        ))}
    </Grid2>
  )
}