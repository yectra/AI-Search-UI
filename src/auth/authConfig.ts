export const b2cPolicies = {
  names: {
    admin: import.meta.env.VITE_AZURE_AUTH_ROOSADMIN_USER_FLOW,
    forgotPassword: import.meta.env.VITE_AZURE_AUTH_ROOSADMIN_FORGOTPASSWORD_USER_FLOW,
  },
  authorities: {
    admin: {
      authority: `https://roos1.b2clogin.com/roos1.onmicrosoft.com/${import.meta.env.VITE_AZURE_AUTH_ROOSADMIN_USER_FLOW}`,
    },
    forgotPassword: {
      authority: `https://roos1.b2clogin.com/roos1.onmicrosoft.com/${import.meta.env.VITE_AZURE_AUTH_ROOSADMIN_FORGOTPASSWORD_USER_FLOW}`,
    },
  },

  authorityDomain: 'roos1.b2clogin.com',
};

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AUTH_ROOSCLIENT_ID,
    authority: b2cPolicies.authorities.admin.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const protectedResources = {
  apiTodoList: {
    scopes: [import.meta.env.VITE_AZURE_AUTH_ROOSWRITE_SCOPE],
  },
};

export const loginRequest = {
  scopes: [...protectedResources.apiTodoList.scopes],
   prompt: "login",
};
