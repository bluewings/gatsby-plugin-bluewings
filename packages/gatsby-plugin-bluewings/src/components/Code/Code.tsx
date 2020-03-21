import React, { useCallback } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import cx from 'classnames';
import { Styled, useColorMode } from 'theme-ui';
// @ts-ignore
import Octicon from 'react-octicon';
import Clipboard from 'react-clipboard.js';
import styles from './Code.module.scss';

const identity = (e: any) => e;

const aliases: any = {
  js: 'javascript',
  sh: 'bash',
};

const Code = ({
  codeString,
  language,
  className: outerClassName,
  highlightLines,
  lineWrap,
  clipboard,
  ...props
}: any) => {
  const [colorMode] = useColorMode();
  const colorModeClassName = colorMode === 'dark' ? colorMode : 'light';
  const lang = aliases[language] || language;
  const overrideProps = useCallback(
    (prev: any, type?: any) => {
      const next = { ...prev };
      delete next.style;
      if (type === 'line' && highlightLines && highlightLines.indexOf(next.key) !== -1) {
        return {
          ...next,
          className: [next.className, 'token-line-highlight'].filter(identity).join(' '),
        };
      }
      return next;
    },
    [highlightLines],
  );
  return (
    <div className={styles.root}>
      {clipboard && (
        <div className={styles.clipboard}>
          <Clipboard data-clipboard-text={codeString}>
            <Octicon name="clippy" />
          </Clipboard>
        </div>
      )}
      {/* <Highlight {...defaultProps} {...props} code={codeString.trim()} language={lang} theme={undefined}> */}
      <Highlight {...defaultProps} code={codeString.trim()} language={lang} theme={undefined}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Styled.pre
            className={cx(outerClassName, className, colorModeClassName, lineWrap && styles.lineWrap)}
            style={style}
          >
            {tokens.map((line, i) => (
              <Line
                overrideProps={overrideProps}
                getLineProps={getLineProps}
                getTokenProps={getTokenProps}
                line={line}
                i={i}
              />
            ))}
          </Styled.pre>
        )}
      </Highlight>
    </div>
  );
};

const Line = React.memo(({ overrideProps, getLineProps, getTokenProps, line, i }: any) => (
  <div {...overrideProps(getLineProps({ line, key: i }), 'line')}>
    {line.map((token: any, key: any) => (
      <span {...getTokenProps({ token, key })} sx={{ display: 'inline-block' }} />
    ))}
  </div>
));

export default Code;
