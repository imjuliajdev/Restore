import OrderSummary from "../../app/shared/components/OrderSummary";
import CartItem from "./CartItem";
import { useFetchCartQuery } from "./cartApi";
import { Grid2, Typography } from "@mui/material";


export default function CartPage() {
    const {data: cart, isLoading} = useFetchCartQuery();
    if(isLoading) return <Typography variant="h3">Loading cart...</Typography>
        
    if(!cart || cart.items.length === 0) return <Typography variant="h3">Your cart is empty</Typography>

    return (
       <Grid2 container spacing={5}>
        <Grid2 size={8}>
            {cart.items.map((item) => (
                <CartItem item={item} key={item.productId}/>
            ))}
        </Grid2>
        <Grid2 size={4}>
            <OrderSummary />    
        </Grid2>
       </Grid2>
    )
}