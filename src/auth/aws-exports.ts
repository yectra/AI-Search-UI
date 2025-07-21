// const awsExports = {
//   aws_project_region: 'us-east-1',
//   aws_cognito_region: 'us-east-1',
//   aws_user_pools_id: 'us-east-1_n6hnPPiG0',
//   aws_user_pools_web_client_id: '48ekmosvv5tldr23jtbvfun5s8',
//   oauth: {
//     domain: 'us-east-1n6hnppig0.auth.us-east-1.amazoncognito.com',
//     scope: ['email', 'openid', 'profile'],
//     redirectSignIn: 'http://localhost:3000',
//     redirectSignOut: 'http://localhost:3000',
//     responseType: 'code',
//   },
// };

const awsExports = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_n6hnPPiG0',
  aws_user_pools_web_client_id: '6k3iroc31hm6jue3dmtf8dtqvq',
  oauth: {
    domain: 'us-east-1n6hnppig0.auth.us-east-1.amazoncognito.com',
    scope: ['email', 'openid', 'phone'],
    redirectSignIn: 'http://localhost:3000',
    redirectSignOut: 'http://localhost:3000',
    responseType: 'code',
  },
};

export default awsExports;