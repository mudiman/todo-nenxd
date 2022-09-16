const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  "Cache-Control": "public, max-age=31536000, immutable",
});
