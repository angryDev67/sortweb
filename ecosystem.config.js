module.exports = {
  apps: [
    {
      name: "sortwebapp",
      script: "./index.js",
      watch: true,
      env: {
        PORT: 80,
        NODE_ENV: "development"
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production"
      }
    }
  ]
};
