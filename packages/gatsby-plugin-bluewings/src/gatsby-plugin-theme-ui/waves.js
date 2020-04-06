import presetPrism from '@theme-ui/prism/presets/prism.json';
import presetOceanicNext from '@theme-ui/prism/presets/oceanic-next.json';

// https://github.com/pomber/gatsby-waves/blob/master/theme/src/gatsby-plugin-theme-ui/waves.js
const getCodeTheme = (preset) => {
  const styles = Object.entries(preset).reduce(
    (accum, [k, v]) => ({
      ...accum,
      [k.replace(/\./g, '.token-')]: v,
    }),
    {},
  );
  return {
    pre: {
      backgroundColor: styles.backgroundColor,
      code: { ...styles },
    },
  };
};

export default ({ default: base }) => {
  const waves = {
    default: {
      ...base,
      Wave: {
        // width: ["100%", "960px"],
        // marginTop: "40px",
        // marginLeft: [0, "calc(50% - 480px)"],
        // marginBottom: "40px",
        // position: "relative",
        // display: ["block", "flex"],
        ...base.Wave,
        width: 'auto',
        marginLeft: '-21px',
        marginRight: '-21px',
        marginTop: '4',
        marginBottom: '4',
      },
      ScrollerContainer: {
        // flex: 1,
        // paddingLeft: [0, "50px"],
        // paddingTop: ["50px", 0],
        ...base.ScrollerContainer,
        flex: [1, '0 0 50%'],
        paddingLeft: 0,
        paddingTop: 0,
        padding: 0,
      },
      ScrollerStep: {
        // position: "relative",
        // padding: [0, "0 10px"],
        // minHeight: "250px",
        // display: "flex",
        // alignItems: "center",
        // borderLeft: ["none", "3px solid transparent"],
        ...base.ScrollerStep,
        minHeight: '200px',
        padding: '0.875rem 21px',
        '> div > *': {
          '&:first-child': {
            marginTop: 0,
          },
          '&:last-child': {
            marginBottom: 0,
          },
        },
        ul: {
          marginLeft: '1.75rem',
        },
        ol: {
          marginLeft: '1.75rem',
        },
        pre: {
          marginLeft: ['-7px', '-14px'],
          paddingLeft: ['7px', '14px'],
        },
      },
      ScrollerProgress: {
        // position: "absolute",
        // left: ["-12px", "-3px"],
        // backgroundColor: "primary",
        ...base.ScrollerProgress,
        backgroundColor: 'text',
        left: [0, '-7px'],
        width: '7px !important',
      },
      StickerContainer: {
        // width: ["100vw", "50%"],
        // marginLeft: ["calc(50% - 50vw)", 0],
        // position: ["sticky", "static"],
        // top: [0, "auto"],
        // zIndex: [1, "auto"],
        // height: ["50vh", "auto"],
        ...base.StickerContainer,
        flex: '0 0 50%',
        marginLeft: 0,
        paddingRight: [0, '21px'],
      },
      Sticker: {
        // position: ["static", "sticky"],
        // width: "100%",
        // height: ["100%", "60vh"],
        // top: ["auto", "20vh"],
        // border: ["none", "1px solid"],
        // borderColor: "secondary",
        ...base.Sticker,
        ...getCodeTheme(presetOceanicNext),
        height: ['100%', '70vh'],
        top: ['auto', '15vh'],
        border: 'none',
        borderRadius: [0, '0.3rem'],
        overflow: 'hidden',
      },
      // this is used to select the active scroller step
      // 0.5 selects the step that is at half the screen height
      // 0.7 the step that is at 70% the screen height
      focus: [0.7, 0.5],
    },
  };

  waves.dark = {
    ...waves.default,
    Sticker: {
      ...waves.default.Sticker,
      ...getCodeTheme(presetPrism),
    },
  };

  return waves;
};
