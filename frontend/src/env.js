/* eslint-disable */

const env = process.env.VUE_APP_ENV;

let envApiDomain = '';

if (env === 'production') {
  envApiDomain = `https://${process.env.VUE_APP_API_DOMAIN_PROD}`;
} else if (env === 'staging') {
  envApiDomain = `https://${process.env.VUE_APP_API_DOMAIN_STAG}`;
} else {
  envApiDomain = `http://${process.env.VUE_APP_API_DOMAIN_DEV}`;
}

export const apiDomain = envApiDomain;
