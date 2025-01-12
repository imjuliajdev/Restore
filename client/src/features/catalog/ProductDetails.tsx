import { Typography, Grid2, Divider, TableCell, TableRow, TableBody, Table, TableContainer, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddCartItemMutation, useFetchCartQuery, useRemoveCartItemMutation } from "../cart/cartApi";
import { useEffect,useState } from "react";

export default function ProductDetails() {
    const {id} = useParams();
    const [removeCartItem] = useRemoveCartItemMutation();   
    const [addCartItem] = useAddCartItemMutation();
    const {data: cart} = useFetchCartQuery();

    const item = cart?.items.find(x => x.productId === +id!);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if(item) setQuantity(item.quantity);
    }, [item]);


    const {data: product, isLoading, error} = useFetchProductDetailsQuery(id ? +id : 0);

    if(isLoading || !product) return <Typography variant='h6'>Loading...</Typography>
    if(error) return <Typography variant='h3'>Error fetching product details.</Typography>

    
    const handleUpdateCart = () => {
        const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
       if(!item || quantity > item.quantity) {
        addCartItem({product, quantity: updatedQuantity});
        }
        else{
            removeCartItem({productId: product.id, quantity: updatedQuantity});
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.currentTarget.value;
        if(value  >= 0) setQuantity(value);
    }
    
    const productDetails =[ 
        {label: 'Name', value: product.name},
        {label: 'Description', value: product.description},
        {label: 'Type', value: product.type},
        {label: 'Brand', value: product.brand},        
        {label: 'Quantity in Stock', value: product.quantityInStock},
    ]
    return (
        <Grid2 container spacing={6} maxWidth='lg' sx={{mx:'auto'}}>
            <Grid2 size={6}>
                <img src={product?.pictureUrl} alt={product?.name} style={{width: '100%'}} />
            </Grid2>
            <Grid2 size={6}>
                <Typography variant='h3'>{product?.name}</Typography>
                <Divider sx={{mb:2}} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table sx={{
                        '& td': {fontSize: '1.rem'}
                    }}>
                        <TableBody>
                            {productDetails.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                                    <TableCell>{detail.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid2 container spacing={2} marginTop={3}>
                    <Grid2 size={6}>
                        <TextField
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Button
                            sx={{
                                height: '55px'
                            }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                            onClick={handleUpdateCart}
                            disabled={quantity === item?.quantity || !item && quantity === 0}
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}