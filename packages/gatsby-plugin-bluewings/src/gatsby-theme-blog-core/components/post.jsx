// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/gatsby-theme-blog-core/components/post.js
import React from 'react';
import Post from 'gatsby-theme-blog/src/components/post';

export default ({ location, data, pageContext }) => {
  const { blogPost, previous, next } = data;
  return (
    <Post
      data={{ ...data, post: blogPost }}
      location={location}
      previous={previous}
      next={next}
      pageContext={pageContext}
    />
  );
};
