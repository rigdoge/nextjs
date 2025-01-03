export default {
  build: {
    command: "npm run pages:build",
    directory: ".next",
    environment: {
      NODE_VERSION: "18"
    }
  },
  routes: [
    {
      pattern: "/studio/**/*",
      forward: {
        domain: "{SANITY_STUDIO_URL}"
      }
    }
  ]
} 