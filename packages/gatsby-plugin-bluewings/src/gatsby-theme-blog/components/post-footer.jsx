// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/post-footer.js
import React from 'react';
import { Link } from 'gatsby';
import { css, Styled, Flex } from 'theme-ui';
import Bio from 'gatsby-theme-blog/src/components/bio';

const Footer = ({ previous, next, editUrl, langKey, langKeyDefault, pageContext }) => (
  <footer css={css({ mt: 4, pt: 3 })}>
    {editUrl && (
      <Styled.p>
        <Styled.a href={editUrl} target="_blank" rel="noopener noreferrer">
          Edit on GitHub
        </Styled.a>
      </Styled.p>
    )}
    <Styled.hr css={css({ mt: 3, mb: 3 })} />
    <Bio post={true} langKey={langKey || (pageContext && pageContext.langKey)} langKeyDefault={langKeyDefault} />
    {(previous || next) && (
      <Flex
        as="ul"
        css={css({
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          p: 0,
          mt: 0,
          mb: 3,
        })}
      >
        <li css={css({ mb: 2 })}>
          {previous && (
            <Styled.a as={Link} to={previous.slug} rel="prev">
              ← {previous.title}
            </Styled.a>
          )}
        </li>
        <li css={css({ mb: 2 })}>
          {next && (
            <Styled.a as={Link} to={next.slug} rel="next">
              {next.title} →
            </Styled.a>
          )}
        </li>
      </Flex>
    )}
  </footer>
);

export default Footer;
