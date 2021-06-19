import Header from './Header.js'
import Footer from './footers/Footer.js'

export default function AppPage ({ children, ...props }) {
  return (
    <div className="flex flex-col min-h-screen">

      <Header {...props} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

    </div>
  )
}
