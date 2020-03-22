import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const ref = useRef<any>();
  const [initialColorModeClassName] = useState(colorModeClassName);
  const lastClassName = useRef<any>(initialColorModeClassName);
  useEffect(() => {
    const pre = ref.current && ref.current.querySelector('pre');
    if (pre) {
      if (typeof lastClassName.current === 'string') {
        pre.classList.remove(lastClassName.current);
      }
      pre.classList.add(colorModeClassName);
      lastClassName.current = colorModeClassName;
    }
  }, [colorModeClassName]);

  return (
    <div className={styles.root}>
      {clipboard && (
        <div className={styles.clipboard}>
          <Clipboard data-clipboard-text={codeString}>
            <Octicon name="clippy" />
          </Clipboard>
        </div>
      )}
      <div ref={ref}>
        <HighlightWrap
          codeString={codeString}
          lang={lang}
          outerClassName={outerClassName}
          colorModeClassName={initialColorModeClassName}
          lineWrap={lineWrap}
          overrideProps={overrideProps}
        />
      </div>
    </div>
  );
};

const HighlightWrap = React.memo(
  ({ codeString, lang, outerClassName, colorModeClassName, lineWrap, overrideProps }: any) => (
    <Highlight {...defaultProps} code={codeString.trim()} language={lang} theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre
          className={cx(outerClassName, colorModeClassName, className, lineWrap && styles.lineWrap)}
          style={style}
        >
          <Tokens
            tokens={tokens}
            overrideProps={overrideProps}
            getLineProps={getLineProps}
            getTokenProps={getTokenProps}
          />
        </Styled.pre>
      )}
    </Highlight>
  ),
);

const Tokens = React.memo(({ tokens, overrideProps, getLineProps, getTokenProps }: any) => (
  <>
    {tokens.map((line: any, i: number) => (
      <Line
        overrideProps={overrideProps}
        getLineProps={getLineProps}
        getTokenProps={getTokenProps}
        line={line}
        i={i}
        key={i}
      />
    ))}
  </>
));

const Line = React.memo(({ overrideProps, getLineProps, getTokenProps, line, i }: any) => (
  <div {...overrideProps(getLineProps({ line, key: i }), 'line')}>
    {line.map((token: any, key: any) => (
      <span {...getTokenProps({ token, key })} sx={{ display: 'inline-block' }} />
    ))}
  </div>
));

export default React.memo(Code);
