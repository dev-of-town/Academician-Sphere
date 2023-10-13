import { Inter } from 'next/font/google'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import './globals.css'
import styles from './styles/center.module.css'
import { createContext } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Academician Sphere',
  description: 'Community Based Social Media Network',
}

createContext

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning suppressContentEditableWarning>
        <Navbar/>
        <div className={styles.center}>
          <Sidebar/>
          <main className={styles.main}>
            {children}
          </main>
        </div>  
      </body>
    </html>
  )
}
