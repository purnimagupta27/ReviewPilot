import type { Metadata } from "next"
import { Suspense } from "react"
import { GitPullRequestIcon } from "@phosphor-icons/react/ssr"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field"
import { GithubSignInForm } from "@/features/auth/components/github-sign-in-form"
import { getSafeCallbackPath } from "@/utils"

export const metadata: Metadata = {
  title: "Sign in · ReviewPilot",
  description: "Sign in to ReviewPilot with your GitHub account.",
}

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>
}

function SignInCard({ callbackUrl }: { callbackUrl: string }) {
  return (
    <Card className="w-full border-border/80 shadow-xl shadow-foreground/10 [--card-spacing:--spacing(6)]">
      <CardHeader className="items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
            <GitPullRequestIcon className="size-6" weight="bold" />
          </span>
          <span className="font-heading text-base font-semibold tracking-tight">
            Review<span className="text-primary">Pilot</span>
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <CardTitle className="text-2xl mt-4">Welcome</CardTitle>
          <CardDescription className="text-s">
            Continue with GitHub to review and manage your code.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <GithubSignInForm callbackUrl={callbackUrl} />
              <FieldDescription className="text-center py-4">
                Ready to level up your code? Sign in and let’s find ways to make it better.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  )
}

async function SignInCardWithParams({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams

  return <SignInCard callbackUrl={getSafeCallbackPath(callbackUrl)} />
}

const SignInPage = ({ searchParams }: SignInPageProps) => {
  return (
    <Suspense fallback={<SignInCard callbackUrl={getSafeCallbackPath(null)} />}>
      <SignInCardWithParams searchParams={searchParams} />
    </Suspense>
  )
}

export default SignInPage
