import * as admin from 'firebase-admin'
// import { serviceAccount } from './serviceAccount'
// import {serviceAccount} from './serviceAccount'

import * as dotenv from 'dotenv'
dotenv.config()

const serviceAccount = {
  type: process.env.SERVICE_ACCOUNT_TYPE,
  project_id: process.env.ACCOUNT_PROJECT_ID,
  project_key_id: process.env.ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.ACCOUNT_PRIVATE_KEY,
  client_email: process.env.ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.ACCOUNT_CLIENT_ID,
  auth_uri: process.env.ACCOUNT_AUTH_URI,
  token_uri: process.env.ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.ACCOUNT_AUTH_PROVIDER,
  client_x509_cert_url: process.env.ACCOUNT_CLIENT_URL,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export default admin
