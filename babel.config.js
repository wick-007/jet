const ReactCompilerConfig = {
  target: "19", // You can set this to '17', '18', or '19'
};

module.exports = function () {
  return {
    plugins: [
      ["babel-plugin-react-compiler", ReactCompilerConfig],
    ],
  };
};
