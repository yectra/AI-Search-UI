// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  ADMIN: '/admin',
  AISEARCH: '',
};

// ----------------------------------------------------------------------

export const paths = {
  components: '/',

  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },

  // ADMIN
  admin: {
    root: ROOTS.ADMIN,
    product: {
      root: `${ROOTS.ADMIN}/service`,
      new: `${ROOTS.ADMIN}/service/new`,
      details: (id: string) => `${ROOTS.ADMIN}/service/${id}`,
      edit: (id: string) => `${ROOTS.ADMIN}/service/${id}/edit`,
    },
    contactsFrom: {
      root: `${ROOTS.ADMIN}/form-responses`,
    },
    vendorForm: {
      root: `${ROOTS.ADMIN}/vendor-signups`,
      new: `${ROOTS.ADMIN}/vendor-signups/new`,
      edit: (id: string) => `${ROOTS.ADMIN}/vendor-signups/${id}/edit`,
    },
    customer: {
      root: `${ROOTS.ADMIN}/customer`,
      new: `${ROOTS.ADMIN}/customer/new`,
      edit: (id: string) => `${ROOTS.ADMIN}/customer/${id}/edit`,
    },
    projects: {
      root: `${ROOTS.ADMIN}/projects`,
      details: (id: string) => `${ROOTS.ADMIN}/projects/${id}`,
    },
    quote: {
      root: `${ROOTS.ADMIN}/quotes`,
      new: `${ROOTS.ADMIN}/quotes/new`,
      edit: (id: string) => `${ROOTS.ADMIN}/quotes/${id}/edit`,
    },
  },

  // ROOS ADMIN
  aisearch: {
    root: ROOTS.AISEARCH,
    overview: {
      root: `${ROOTS.AISEARCH}/overview`,
    },
    getstarted: {
      root: `${ROOTS.AISEARCH}/getstarted`,
    }
  },
};
