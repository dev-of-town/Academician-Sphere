import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import './globals.css'
import styles from './styles/center.module.css'

export const metadata = {
  title: 'Academician Sphere',
  description: 'Community Based Social Media Network',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning suppressContentEditableWarning>
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
