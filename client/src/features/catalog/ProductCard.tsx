import { 
    Button,
    Card, 
    CardMedia, 
    CardContent, 
    Typography,
    CardActions,    
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useAddCartItemMutation } from "../cart/cartApi";
import { currencyFormat } from "../../lib/util";

type Props = {
    product: Product;
}

export default function ProductCard(
    {product}: Props
) {
    const [addCartItem, {isLoading}] = useAddCartItemMutation();
  return (
   <Card 
        elevation={2}
        sx={{
            width: 280, 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}
   >
        <CardMedia
        sx={{height: 240, backgroundSize: 'cover', bgcolor: 'white'}}
        image={product.pictureUrl}
        title={product.name}
         />
         <CardContent>
            <Typography 
                gutterBottom 
                sx={{textTransform: 'uppercase'}}
                variant='subtitle2'>
                    {product.name}
                </Typography>
                <Typography 
                variant='h6' 
                sx={{color: 'secondary.main'}}>
                    {currencyFormat(product.price)}
                </Typography>
         </CardContent>
         <CardActions
            sx={{justifyContent: 'space-between'}}
         >
            <Button 
            onClick={() => addCartItem({product, quantity: 1})}
            disabled={isLoading}
            >
                Add to cart
            </Button>
            <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
         </CardActions>
   </Card>
  )
}