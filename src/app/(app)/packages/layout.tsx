export const metadata = {
  title: 'Mooi Lanka | Tour Packages',
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
