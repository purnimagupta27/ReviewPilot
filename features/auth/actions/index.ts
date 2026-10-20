"use server"

import { auth } from "@/lib/auth"
import { getSafeCallbackPath } from "@/utils"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signInWithGitHub(formdata: FormData) {
  const callbackUrlValue = formdata.get("callbackUrl")
  const callbackURL = getSafeCallbackPath(
    typeof callbackUrlValue === "string" ? callbackUrlValue : null
  )

  // Ask the auth library to start OAuth sign-in with GitHub, using the
  // request headers and redirecting back to the validated callback path.
  
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
