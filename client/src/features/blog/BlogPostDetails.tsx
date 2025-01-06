import { Box, Grid2, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../app/models/blog";


export default function BlogPostDetails() {
  const {slug} = useParams();
  const [blogPost, setBlogPost] = useState<Blog | null>(null);
  

  useEffect(() => {
     fetch(`https://localhost:5001/api/blogs/${slug}`)
     .then(response => response.json())
     .then(data => setBlogPost(data))
     .catch(error => console.error(error));
  }, [slug]);

  if(!blogPost) return <Typography variant='h3'>Loading...</Typography>
  return (
      <Grid2 container spacing={6} maxWidth='lg' sx={{mx:'auto'}}>
        <Grid2 size={8}>
          <Typography variant='h2'>{blogPost.title}</Typography>
          <img src={blogPost.image} alt={blogPost.title} style={{width: '100%'}} />
          <Typography variant='body1'>{blogPost.content}</Typography>

        </Grid2>
        <Grid2 size={4}>
            <Typography variant='h2'>Categories</Typography>
            <Box>
              <ul>
              <li>Category 1</li>
              <li>Category 2</li>
              <li>Category 3</li>
              </ul>
            </Box>
        </Grid2>
      </Grid2>
  )
}