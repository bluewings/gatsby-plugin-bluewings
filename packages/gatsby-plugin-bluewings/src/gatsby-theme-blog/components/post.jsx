// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/post.js
import React, { useMemo } from 'react';
import { Styled, css } from 'theme-ui';
import { DiscussionEmbed } from 'disqus-react';
import PostFooter from 'gatsby-theme-blog/src/components/post-footer';
import Layout from 'gatsby-theme-blog/src/components/layout';
import SEO from 'gatsby-theme-blog/src/components/seo';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Translations from './translations';
import Footer from 'gatsby-theme-blog/src/components/home-footer';
import components from '../../gatsby-plugin-theme-ui/components';

const Post = ({ data, location, previous, next, pageContext }) => {
  const {
    post,
    site: {
      siteMetadata: { title, social: socialLinks },
    },
  } = data;
  const { langKey, filePath } = post.fields || {};
  const { translations, editOnGithub, disqusShortname, langKeyDefault } = pageContext || {};
  const { max_width } = (post.parent && post.parent.frontmatter) || {};
  const editUrl = editOnGithub && filePath && `${editOnGithub}${filePath}`;
  const slugId = useMemo(() => post.slug.replace(new RegExp('^/' + langKey + '/'), '/'), [post.slug, langKey]);
  return (
    <Layout location={location} title={title} langKey={langKey} pageContext={pageContext} maxWidth={max_width}>
      <SEO title={post.title} description={post.excerpt} pageContext={pageContext} />
      <main>
        <Styled.h1 css={css({ mt: 4 })}>{post.title}</Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            mt: -2,
            mb: 4,
            fontFamily: `Montserrat_SemiBold, 'Apple SD Gothic NEO', helvetica, sans-serif`,
          })}
        >
          {post.date}
        </Styled.p>
        <Translations
          langKey={langKey}
          translations={translations}
          slug={post.slug}
          editUrl={editUrl}
          langKeyDefault={langKeyDefault}
        />
        <MDXProvider components={components}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
      </main>
      <PostFooter {...{ previous, next }} editUrl={editUrl} pageContext={pageContext} />
      {disqusShortname && <DiscussionEmbed shortname={disqusShortname} config={{ identifier: slugId, title: title }} />}
      <Footer socialLinks={socialLinks} marginTop={0} langKey={langKey} />
    </Layout>
  );
};

export default Post;
