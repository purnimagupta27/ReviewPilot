import type { Metadata } from "next"
import { Suspense } from "react"
import {
  GitPullRequestIcon,
  LockKeyIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr"

import {GitHubSignInForm } from "@/components/auth/github-sign-in-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Sign in · ReviewPilot",
  description: "Sign in to ReviewPilot with your GitHub account.",
}

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>
}

function getSafeCallbackUrl(callbackUrl?: string) {
  if (!callbackUrl?.startsWith("/") || callbackUrl.startsWith("//")) {
    return "/"
  }

  return callbackUrl
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <div className="relative flex min-h-svh flex-1 items-center justify-center overflow-hidden bg-background p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <Suspense fallback={<SignInCard callbackUrl="/" />}>
        <SignInCardWithParams searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function SignInCardWithParams({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams

  return <SignInCard callbackUrl={getSafeCallbackUrl(callbackUrl)} />
}

function SignInCard({ callbackUrl }: { callbackUrl: string }) {
  return (
    <Card className="relative w-full max-w-sm gap-0 py-0 shadow-xl shadow-foreground/10 [--card-spacing:--spacing(6)]">
      <CardHeader className="items-center gap-4 pt-(--card-spacing) text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
            <GitPullRequestIcon className="size-5" weight="bold" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight">
            Review<span className="text-primary">Pilot</span>
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <CardTitle className="text-lg">Welcome</CardTitle>
          <CardDescription>
            Sign in with GitHub to open your code review workspace.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <FieldGroup className="gap-5">
          <Field className="gap-3">
            <GitHubSignInForm callbackUrl={callbackUrl} />
          </Field>

          {/* <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
              Secure OAuth
            </span>
            <Separator className="flex-1" />
          </div>

          <ul className="flex flex-col gap-2.5 text-xs/relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <ShieldCheckIcon
                className="mt-0.5 size-3.5 shrink-0 text-primary"
                weight="duotone"
              />
              <span>
                We only read your public profile and email, never your
                repositories.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LockKeyIcon
                className="mt-0.5 size-3.5 shrink-0 text-primary"
                weight="duotone"
              />
              <span>
                Authentication happens on GitHub. Your password never reaches
                our servers.
              </span>
            </li>
          </ul> */}
        </FieldGroup>
      </CardContent>

      <CardFooter className="mt-6 border-t bg-muted/30 py-(--card-spacing) text-center">
        <p className="w-full text-[11px]/relaxed text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="font-medium text-foreground">Terms of Service</span>{" "}
          and{" "}
          <span className="font-medium text-foreground">Privacy Policy</span>.
        </p>
      </CardFooter>
    </Card>
  )
}
