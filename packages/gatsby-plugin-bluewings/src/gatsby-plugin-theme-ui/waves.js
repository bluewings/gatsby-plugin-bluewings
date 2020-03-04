import presetPrism from '@theme-ui/prism/presets/prism.json';
import presetOceanicNext from '@theme-ui/prism/presets/oceanic-next.json';

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

export default (waves) => ({
  default: {
    ...waves.default,
    Sticker: {
      ...waves.default.Sticker,
      ...getCodeTheme(presetOceanicNext),
    },
  },
  dark: {
    ...waves.default,
    Sticker: {
      ...waves.default.Sticker,
      ...getCodeTheme(presetPrism),
    },
  },
});
