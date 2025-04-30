export const metadata = {
  title: 'Mooi Lanka | Blog Admin',
  description: 'Mooi Lanka Travels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
