import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
    blogPost: {
        id: number;
        title: string;
        content: string;
        slug: string;
        image: string;
        excerpt: string;
        createdAt: Date;
        userId: string;
        categoryId: number;
        category: {
            name: string;
        };
    };
};

export default function BlogPostCard(
    {blogPost}: Props
) {
    return(
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
        image={blogPost.image}
        title={blogPost.title}
         />
         <CardContent>
            <Typography 
                gutterBottom 
                sx={{textTransform: 'uppercase'}}
                variant='subtitle2'>
                    {blogPost.title}
                </Typography>
                
         </CardContent>
         <CardActions
            sx={{justifyContent: 'space-between'}}
         >
            <Typography variant="caption">{blogPost.category.name}</Typography>
            <Button component={Link} to={`/blog/${blogPost.title}`}  sx={{fontSize: 12}}>Read More</Button>
         </CardActions>
   </Card>
    )
}