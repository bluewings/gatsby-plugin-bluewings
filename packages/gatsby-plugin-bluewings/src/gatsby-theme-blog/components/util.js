const getLocalText = (text, { langKey, langKeyDefault }) => {
  if (typeof text === 'string') {
    return text;
  } else if (Array.isArray(text)) {
    const titles = text
      .filter((e) => e.length === 2)
      .reduce(
        (prev, [_langKey, _title]) => {
          if (langKey === _langKey) {
            return { ...prev, local: _title };
          } else if (langKeyDefault === _langKey) {
            return { ...prev, default: _title };
          }
          return prev;
        },
        { local: null, default: null },
      );
    return titles.local || titles.default || text;
  }
  return text;
};

export { getLocalText };
