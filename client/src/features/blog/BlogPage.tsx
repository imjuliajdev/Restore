import { useEffect, useState } from "react";
import { Blog } from "../../app/models/blog";
import BlogPostList from "./BlogPostList";

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

    
    
  useEffect(() => {
    fetch('https://localhost:5001/api/blogs')
    .then(response => response.json())
    .then(data => setBlogPosts(data))
    .catch(error => console.error('Error fetching blogs:', error));
  }, []);

    
    return( 
    <>   
        <BlogPostList blogPosts={blogPosts} />
    </>
  );
}