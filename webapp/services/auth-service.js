import Amplify, {Auth} from "aws-amplify"

Amplify.configure({
  Auth: {
    userPoolId: process.env.COGNITO_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
    region: 'us-east-1'
  }
})

export const register = async user => {
  const attributes = {
    name: user.name,
    address: user.address,
    email: user.email
  }
  if (user.phone) {
    attributes.phone = user.phone
  }

  return Auth.signUp({
    username: user.email,
    password: user.password,
    attributes: attributes
  })
}
