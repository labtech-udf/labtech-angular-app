export const environment = {
  production: false,
  API_URL: 'http://localhost:8081/api',


  // KEYCLOAK_CONFIGS - OAUTH
  KEYCLOAK_ISSUER: 'http://localhost:8090/realms/labtech-events-realm',
  KEYCLOAK_TOKEN_ENDPOINT: 'http://localhost:8090/realms/labtech-events-realm/protocol/openid-connect/token',
  KEYCLOAK_CLIENT_ID: 'http://localhost:8090/realms/labtech-events-realm',

}
