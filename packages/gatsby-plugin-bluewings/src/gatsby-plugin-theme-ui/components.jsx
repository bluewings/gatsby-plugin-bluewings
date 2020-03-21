import React from 'react';
import { Styled } from 'theme-ui';
import rangeParser from 'parse-numeric-range';
import { Code } from 'gatsby-plugin-bluewings';

const Pre = (preProps) => {
  const childProps = { ...(preProps.children && preProps.children.props) };
  let className = childProps.className || '';
  if (childProps.mdxType === 'code') {
    let highlightLines;
    if (typeof className === 'string') {
      const matched = className.trim().match(/^language-([^{}]+)(\{(.+)\}){0,1}$/);
      if (matched) {
        const [, language, , option] = matched;
        if (typeof option === 'string' && option.match(/^[0-9,-.]+$/)) {
          try {
            highlightLines = rangeParser.parse(option);
            className = 'language-' + language;
          } catch (err) {
            // ignore
          }
        }
      }
    }
    const [language] = className.replace(/language-/, '').split(' ');
    return (
      <Code
        codeString={childProps.children}
        language={language}
        className={className}
        highlightLines={highlightLines}
        {...childProps}
      />
    );
  }
  return <Styled.pre {...preProps} />;
};

const mdxComponents = {
  pre: Pre,
};

export default mdxComponents;
