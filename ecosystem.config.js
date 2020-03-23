module.exports = {
  apps: [
    {
      name: "sortwebapp",
      script: "./index.js",
      watch: true,
      increment_var: "PORT",
      env: {
        PORT: 80,
        instance_var: "INSTANCE_ID",
        NODE_ENV: "development"
      }
    }
  ]
};
