import { Blog } from "../../app/models/blog";
import BlogPostCard from "./BlogPostCard";
import { Box } from "@mui/material";


type Props = {
    blogPosts: Blog[];
}

export default function BlogList({blogPosts}: Props) {
  return (
    <Box 
        sx={{display: 'flex', flexWrap: 'wrap',gap: 3, justifyContent: 'center'}}>
        {blogPosts.map((blogPost) => (
            <BlogPostCard key = {blogPost.id} blogPost={blogPost}/>
        ))}
    </Box>
  )
}