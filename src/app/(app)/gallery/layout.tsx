export const metadata = {
  title: 'Mooi Lanka | Gallery',
  description: 'Mooi Lanka Tarvels',
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
