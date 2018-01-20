module.exports = env => {
  require("ts-node").register(
      {
          project: "tsconfig.json",
          filename: `config/webpack.${process.env.NODE_ENV}.js`,
      },
  );
  return require(`./config/webpack.${process.env.NODE_ENV}`);
};