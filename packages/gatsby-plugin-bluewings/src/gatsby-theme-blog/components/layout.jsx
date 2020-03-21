// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/layout.js
import React, { useEffect } from 'react';
import { css, Styled, useColorMode } from 'theme-ui';
import Header from './header';

export default ({ children, maxWidth, pageContent, ...props }) => {
  const { langKey, langKeyDefault } = props.pageContext || {};
  const [colorMode] = useColorMode();
  useEffect(() => {
    if (colorMode === 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [colorMode]);
  return (
    <Styled.root
      css={css({
        px: 7,
        py: 8,
      })}
    >
      <Header
        {...props}
        langKey={langKey}
        langKeyDefault={langKeyDefault}
        pageContent={pageContent}
        maxWidth={maxWidth}
      />
      <div
        css={css({
          maxWidth: maxWidth || `container`,
          mx: `auto`,
        })}
      >
        {children}
      </div>
    </Styled.root>
  );
};
