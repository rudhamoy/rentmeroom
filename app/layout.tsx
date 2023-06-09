
import Footer from './components/navigation/Footer'
import Header from './components/navigation/Header'
import './globals.css'
import { Inter } from 'next/font/google'
// import { SessionProvider } from 'next-auth/react'
import SessionProvider from './components/Session_provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rentmeroom',
  description: 'Search Rent House in Agartala',
}

export default function RootLayout({
  children,
  auth
}: {
  children: React.ReactNode,
  auth: React.ReactNode
}) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
        {auth}
      </body>
    </html>
  )
}
