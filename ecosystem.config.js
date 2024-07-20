module.exports = {
  apps: [
    {
      name: "booking-management-api",
      script: "./src/server.ts",
      instances: "max",
      exec_mode: "cluster",
      interpreter: "ts-node", 
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        script: "./dist/server.js", 
      },
    },
  ],
};
