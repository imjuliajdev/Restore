import { Box ,Button,Paper} from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";

type Props = {
    filtersData: {brands: string[], types: string[]}
}
const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
]

export default function Filters({filtersData}: Props) {
    const {orderBy,brands,types} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    return (
        <Box display='flex' flexDirection='column' gap={3}>
            <Paper>
               <Search />
            </Paper>
            <Paper sx={{p: 3}}>
                <RadioButtonGroup 
                    selectedValue={orderBy}
                    options={sortOptions} 
                    onChange={(event) => dispatch(setOrderBy(event.target.value))}
                />
            </Paper>
            <Paper sx={{p: 3}}>
               <CheckboxButtons 
                    items={filtersData.brands}
                    checked={brands}
                    onChange={(items: string[]) => dispatch(setBrands(items))}
               />
            </Paper>
            <Paper sx={{p: 3}}>
               <CheckboxButtons 
                    items={filtersData.types}
                    checked={types}
                    onChange={(items: string[]) => dispatch(setTypes(items))}
               />       
        </Paper>
        <Button 
            onClick={() => {
                dispatch(resetParams())
                window.scrollTo({top:0, behavior: 'smooth'});
            } }
            variant="contained" 
            color="secondary" 
            sx={{mt: 3}}>Clear Filters</Button>
        </Box>
    )
}