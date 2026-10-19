export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <h2>{children}</h2>
        </>
    )
}

