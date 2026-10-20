import { headers } from "next/headers"
import {DEFAULT_AUTH_CALLBACK, SIGN_IN_PATH} from "../utils/index"  
import { redirect } from "next/dist/server/api-utils"

export async function signinwithGithub (formData: FormData){

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

    if(!session){
        redirect(redirectTo)
    }

    return session
}