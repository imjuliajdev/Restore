import { Box, Pagination, Typography } from "@mui/material";
import { Pagination as PaginationType } from "../models/pagination";

type Props = {
    metaData: PaginationType;
    onPageChange: (page: number) => void;
}

export default function AppPagination({metaData, onPageChange}: Props) {
   const {currentPage, totalPages, pageSize, totalCount} = metaData;
   const startItem = (currentPage - 1) * pageSize + 1;
   const endItem = Math.min(currentPage * pageSize, totalCount);
   
   return (
        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{mt:3}}>
          <Typography>Displaying {startItem}-{endItem} of {totalCount} items</Typography>
           <Pagination
                sx={{mt:2}}
                color="secondary"
                size="large"
                count={totalPages}
                page={currentPage}
                onChange={(_,page) => onPageChange(page)}
            />
        </Box>  
    )
    
}