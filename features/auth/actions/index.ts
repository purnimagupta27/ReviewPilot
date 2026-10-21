"use server"

import { auth } from "@/lib/auth"
import { DEFAULT_AUTH_CALLBACK, getSafeCallbackPath, SIGN_IN_PATH } from "@/features/auth/utils"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signInWithGitHub(formdata: FormData) {
  const callbackUrlValue = formdata.get("callbackUrl")
  const callbackURL = getSafeCallbackPath(
    typeof callbackUrlValue === "string" ? callbackUrlValue : null
  )

  // Ask the auth library to start OAuth sign-in with GitHub, using the
  // request headers and redirecting back to the validated callback path.
  
  const redirectTo = getSafeCallbackPath(callbackURL)
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL,
    },
    headers: await headers(),
  })

  if (result.url) {
    redirect(result.url)
  }
}

export async function getServerSession(){
  return auth.api.getSession({
    headers: await headers()
  })
}

export async function requireAuth(redirectTo = SIGN_IN_PATH){
  const session = await getServerSession()

  if(!session){
    redirect(redirectTo)
  }

  return session
}

export async function requireUnauth(redirectTo = DEFAULT_AUTH_CALLBACK){
  const session = await getServerSession()

  if(session){
    redirect(redirectTo)
  }
}
