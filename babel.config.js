module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: '58',
            firefox: '54',
            ie: '11',
          },
          useBuiltIns: 'usage',
          corejs: '3.18', // Specify the exact version
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
    ],
  };
  