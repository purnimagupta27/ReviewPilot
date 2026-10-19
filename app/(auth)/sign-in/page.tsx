import Image from "next/image"
import type { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import{
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet
} from "@/components/ui/field"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to ReviewPilot with your GitHub account.",
}

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>
}

const SigninPage = async({searchParams}:SignInPageProps) => {
  return (
    <div>
        <h2 className='text-white'>SigninPage</h2>
    </div>
  )
}

export default SigninPage
