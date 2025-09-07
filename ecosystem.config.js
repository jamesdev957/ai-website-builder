module.exports = {
  apps: [
    {
      name: "mono-repo",
      script: "npx",
      args: "turbo run start --filter=app1",
    },
  ],
};
