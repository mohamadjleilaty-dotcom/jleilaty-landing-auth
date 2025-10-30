import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app = null, auth = null, db = null
if (cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId) {
  app = initializeApp(cfg)
  auth = getAuth(app)
  db = getFirestore(app)
} else {
  console.warn('Firebase env missing – auth/db disabled until .env.local is filled.')
}

export { auth, db }
