module.exports = {
  apps: [
    {
      name: "sortwebapp",
      script: "./index.js",
      watch: true,
      env: {
        PORT: 80,
        instance_var: "INSTANCE_ID",
        NODE_ENV: "development"
      },
      env_production: {
        PORT: 3000,
        instance_var: "INSTANCE_ID",
        NODE_ENV: "production"
      }
    }
  ]
};
