const DOMAIN_STAGING = 'acceso360-staging.k8s.letsrebold.com'
const DOMAIN_PRODUCTION = 'app.acceso360.com'

const defaults = {
  BASE_URL: 'http://localhost:3000',
  COOKIE_NAME: 'icepal-access-token'
  // ACCESO360_LEGACY_API_URL: 'https://acceso360-staging.acceso.com',
  // ACCESO360_API_URL: 'https://acceso360-staging.k8s.letsrebold.com',
  // SEARCH_API_URL: 'https://search-staging.acceso.com',
  // KEYCLOAK_URL: 'https://auth-staging.k8s.letsrebold.com',
  // KEYCLOAK_REALM: 'rebold',
  // KEYCLOAK_CLIENT_ID: 'acceso360',
  // PLATFORM_RESOURCE_ID: 'rebold',
  // MOCK_SERVER: false,
  // GRAVATAR_API_URL: 'https://www.gravatar.com/avatar',
  // DESPIECE_BASE_URL: 'https://clipping-staging.k8s.letsrebold.com',
  // AV_PLUS_BASE_URL: 'https://av-plus-staging.letsrebold.com',
}

const variables = {
  development: {
    ...defaults,
    BASE_URL: (import.meta.env.VITE_BACKEND_URL as string) || defaults.BASE_URL
    // ACCESO360_LEGACY_API_URL:
    //   (import.meta.env.VITE_ACCESO360_LEGACY_API_URL as string) ||
    //   defaults.ACCESO360_LEGACY_API_URL,
    // ACCESO360_API_URL:
    //   (import.meta.env.VITE_ACCESO360_API_URL as string) ||
    //   defaults.ACCESO360_API_URL,
    // SEARCH_API_URL:
    //   (import.meta.env.VITE_SEARCH_API_URL as string) ||
    //   defaults.SEARCH_API_URL,
    // KEYCLOAK_URL:
    //   (import.meta.env.VITE_KEYCLOAK_URL as string) || defaults.KEYCLOAK_URL,
    // KEYCLOAK_REALM:
    //   (import.meta.env.VITE_KEYCLOAK_REALM as string) ||
    //   defaults.KEYCLOAK_REALM,
    // KEYCLOAK_CLIENT_ID:
    //   (import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string) ||
    //   defaults.KEYCLOAK_CLIENT_ID,
    // DESPIECE_BASE_URL:
    //   (import.meta.env.VITE_DESPIECE_BASE_URL as string) ||
    //   defaults.DESPIECE_BASE_URL,
    // AV_PLUS_BASE_URL:
    //   (import.meta.env.VITE_AV_PLUS_BASE_URL as string) ||
    //   defaults.AV_PLUS_BASE_URL,
  },
  staging: {
    ...defaults
    // BASE_URL: 'https://acceso360-staging.k8s.letsrebold.com',
    // ACCESO360_LEGACY_API_URL: 'https://acceso360-staging.acceso.com',
    // ACCESO360_API_URL: 'https://acceso360-staging.k8s.letsrebold.com/',
    // SEARCH_API_URL: 'https://search-staging.acceso.com',
    // KEYCLOAK_URL: 'https://auth-staging.k8s.letsrebold.com',
    // DESPIECE_BASE_URL: 'https://clipping-staging.k8s.letsrebold.com',
    // AV_PLUS_BASE_URL: 'https://av-plus-staging.letsrebold.com',
  },
  production: {
    ...defaults
    // BASE_URL: 'https://app.acceso360.com',
    // ACCESO360_LEGACY_API_URL: 'https://iu.acceso360.com',
    // ACCESO360_API_URL: 'https://app.acceso360.com/',
    // SEARCH_API_URL: 'https://iu.acceso360.com',
    // KEYCLOAK_URL: 'https://auth.acceso360.com',
    // DESPIECE_BASE_URL: 'https://clipping.acceso360.com',
    // AV_PLUS_BASE_URL: 'https://av-plus.acceso360.com',
  }
}

const getVariables = () => {
  if (location.hostname === DOMAIN_STAGING) {
    return variables.staging
  }

  if (location.hostname === DOMAIN_PRODUCTION) {
    return variables.production
  }

  return variables.development
}

export const {
  BASE_URL,
  COOKIE_NAME
  // ACCESO360_LEGACY_API_URL,
  // ACCESO360_API_URL,
  // SEARCH_API_URL,
  // KEYCLOAK_URL,
  // KEYCLOAK_REALM,
  // KEYCLOAK_CLIENT_ID,
  // PLATFORM_RESOURCE_ID,
  // MOCK_SERVER,
  // GRAVATAR_API_URL,
  // DESPIECE_BASE_URL,
  // AV_PLUS_BASE_URL,
} = getVariables()
