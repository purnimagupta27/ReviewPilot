import { ModeToggle } from "@/components/ui/mode-toggle"
import { requireUnauth } from "@/features/auth/actions"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUnauth()
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

      <div className="relative z-10 w-full max-w-sm">{children}</div>
    </div>
  )
}
