module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // url: 'https://apps.freesat.lk/oms',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '503090fe4a27b68d7f04ba838849e4fc'),
    },
  },
});
