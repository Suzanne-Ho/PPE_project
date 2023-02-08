import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import ThemeContext from "./ThemeContext";
import { useContext } from "react";

export default function Layout({
  children

}) {
  {/* For theme */ }
  const mode = useContext(ThemeContext).mode;
  const color = useContext(ThemeContext).color;

  return (
    <div className={[
      'bg-primary',
      `theme-${color}`,
      `theme-${mode}`,
    ].filter(Boolean).join(' ')}>
      <Header />
      <main
        className='fex justify-center max-w-screen-lg mx-auto py-10 min-h-screen px-10 py-2'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
