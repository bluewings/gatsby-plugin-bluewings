// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/gatsby-theme-blog-core/components/posts.js
import React from 'react';
import Posts from 'gatsby-theme-blog/src/components/posts';

export default ({ location, data, pageContext }) => {
  const { site, allBlogPost } = data;
  return (
    <Posts
      location={location}
      posts={allBlogPost.edges}
      siteTitle={site.siteMetadata.title}
      socialLinks={site.siteMetadata.social}
      pageContext={pageContext}
    />
  );
};
