export default ({ env }) => ({
  // Supabase Storage for production
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'local'),
      providerOptions: env('UPLOAD_PROVIDER') === 'supabase' ? {
        apiUrl: env('SUPABASE_URL'),
        apiKey: env('SUPABASE_SERVICE_KEY'),
        bucket: env('SUPABASE_BUCKET', 'strapi-uploads'),
        directory: env('SUPABASE_DIRECTORY', ''),
      } : {},
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
