import React, { useMemo } from 'react';
import { useMeasure } from 'react-use';
import cx from 'classnames';
import styles from '../Grid.module.scss';

const identity = (e: any) => e;

function Column(props: any) {
  const { args, layoutFixed, xs, style } = props;

  const className = useMemo(
    () => [styles.grid, ...args.map((e: string) => styles[`grid_${e}`])].filter(identity).join(' '),
    [args],
  );

  const className_xs = useMemo(() => {
    if (xs === true) {
      return [styles['grid_xs'], ...args.map((e: string) => styles[`grid_xs_${e}`])].filter(identity).join(' ');
    } else if (typeof xs === 'string' && xs.match(/^[\d]+$/)) {
      return styles[`grid_xs_${xs}`];
    }
    return null;
  }, [args, xs]);

  if (layoutFixed) {
    return (
      <div className={cx(className, className_xs)} style={style}>
        <LayoutFixed>{props.children}</LayoutFixed>
      </div>
    );
  }

  return (
    <div className={cx(className, className_xs)} style={style}>
      {props.children}
    </div>
  );
}

function LayoutFixed(props: any) {
  const [ref, { height }] = useMeasure();

  return (
    <div className={styles.layout_fixed_outer} style={{ height }}>
      <div className={styles.layout_fixed_inner} ref={ref}>
        {props.children}
      </div>
    </div>
  );
}

export default Column;
