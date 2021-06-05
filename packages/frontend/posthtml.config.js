module.exports = {
  plugins: {
    'posthtml-expressions': {
      locals: {
        ...Object.entries(process.env).reduce(
          (acc, [key, value]) => ({ ...acc, [key]: value }),
          {}
        ),
      },
    },
  },
};
