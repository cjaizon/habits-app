import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase-config'

export const createProfile = async ({ user }, { firstName, lastName }) => {
  if (!user) return

  try {
    const userProfileDocRef = doc(db, `users/${user.uid}`)

    console.log(userProfileDocRef)

    await setDoc(userProfileDocRef, {
      firstName,
      lastName,
      email: user.email,
    })
  } catch (error) {
    console.log(error)
  }
}
