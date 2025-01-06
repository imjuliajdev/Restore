import { Typography, Grid2, Divider, TableCell, TableRow, TableBody, Table, TableContainer, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchProductDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
    const {id} = useParams();
    const {data: product, isLoading, error} = useFetchProductDetailsQuery(id ? +id : 0);

    if(isLoading || !product) return <Typography variant='h6'>Loading...</Typography>
    if(error) return <Typography variant='h3'>Error fetching product details.</Typography>

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
                        >
                            Add to cart
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}