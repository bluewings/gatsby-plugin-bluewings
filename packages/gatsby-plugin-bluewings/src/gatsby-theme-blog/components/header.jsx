// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/header.js
import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import { css, Styled } from 'theme-ui';
import Switch from 'gatsby-theme-blog/src/components/switch';
import Bio from 'gatsby-theme-blog/src/components/bio';
import { getLocalText } from './util';

const Title = ({ children, indexPage, rootPath }) => {
  if (indexPage) {
    return (
      <Styled.h1
        css={css({
          mt: 0,
          mb: 3,
          pb: 2,
          fontSize: 6,
          wordBreak: 'keep-all',
        })}
      >
        {children}
      </Styled.h1>
    );
  } else {
    return (
      <Styled.h3
        as="p"
        css={css({
          my: 0,
          wordBreak: 'keep-all',
        })}
      >
        <Styled.a
          as={Link}
          css={css({
            boxShadow: `none`,
            textDecoration: `none`,
            color: 'text',
          })}
          to={rootPath}
        >
          {children}
        </Styled.a>
      </Styled.h3>
    );
  }
};

export default ({ children, title, maxWidth, indexPage, langKey, langKeyDefault, ...props }) => {
  const rootPath = useMemo(() => {
    const { langKey, langKeyDefault } = props.pageContext || {};
    return langKey === langKeyDefault ? '/' : `/${langKey}/`;
  }, [props.pageContext]);

  return (
    <header>
      <div
        css={css({
          maxWidth: maxWidth || `container`,
          mx: `auto`,
        })}
      >
        <div
          css={css({
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `flex-start`,
            my: 0,
          })}
        >
          <Title {...props} indexPage={indexPage} rootPath={rootPath}>
            {getLocalText(title, props.pageContext)}
          </Title>
          {children}
          <Switch />
        </div>
        {indexPage && <Bio langKey={langKey} pageContext={props.pageContext} />}
      </div>
    </header>
  );
};
