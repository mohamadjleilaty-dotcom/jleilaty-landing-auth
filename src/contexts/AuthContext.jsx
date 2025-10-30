import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const signup = async (email, password, displayName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) await updateProfile(res.user, { displayName })
    return res
  }
  const reset = (email) => sendPasswordResetEmail(auth, email)
  const logout = () => signOut(auth)

  const value = { user, loading, login, signup, reset, logout }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() { return useContext(AuthCtx) }
