import React, { useMemo, useRef } from 'react';
import { css, useColorMode } from 'theme-ui';

const SWITCH_SIZE = 60;

function Switch({ border = false }) {
  const [colorMode, setColorMode] = useColorMode();

  const rotate = useRef(0);

  const toggleStyle = useMemo(() => {
    const remain = Math.abs(rotate.current % 360);
    if ((colorMode === 'light' && remain === 180) || (colorMode === 'dark' && remain === 0)) {
      rotate.current -= 180;
    }
    return { transform: `rotate(${rotate.current}deg)` };
  }, [colorMode]);

  const isDark = colorMode === `dark`;
  const toggleColorMode = (e) => {
    setColorMode(isDark ? `light` : `dark`);
  };

  const borderStyles = useMemo(
    () =>
      border
        ? {
            borderWidth: 1,
            borderColor:
              colorMode === 'dark'
                ? 'var(--theme-ui-colors-muted,hsla(0,0%,100%,0.4))'
                : 'var(--theme-ui-colors-muted,hsla(0,0%,0%,0.4))',
            borderRadius: '0.25rem',
            height: 32,
          }
        : { border: 'none' },
    [border, colorMode],
  );

  return (
    <div css={css({ height: 0 })}>
      <button
        type="button"
        css={css({
          width: SWITCH_SIZE,
          height: SWITCH_SIZE / 2,
          padding: 0,
          background: 'transparent',
          overflow: 'hidden',
          cursor: 'pointer',
          ...borderStyles,
        })}
        onClick={toggleColorMode}
      >
        <div
          className="spinner"
          css={css({
            pointerEvents: 'none',
            position: 'relative',
            width: SWITCH_SIZE,
            height: SWITCH_SIZE,
            transition: 'transform 0.67s linear',
            fontSize: 3,
          })}
          style={toggleStyle}
        >
          <span
            className="sun"
            role="img"
            aria-label="sun"
            css={css({
              position: 'absolute',
              pointerEvents: 'none',
              top: 0,
              left: 0,
              width: SWITCH_SIZE,
              height: SWITCH_SIZE / 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            🌞
          </span>
          <span
            className="moon"
            role="img"
            aria-label="moon"
            css={css({
              position: 'absolute',
              pointerEvents: 'none',
              top: SWITCH_SIZE / 2,
              left: 0,
              width: SWITCH_SIZE,
              height: SWITCH_SIZE / 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'rotate(180deg)',
            })}
          >
            🌛
          </span>
        </div>
      </button>
    </div>
  );
}

export default Switch;
