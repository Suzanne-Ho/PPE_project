import ThemeContext from "./ThemeContext";
import { useContext } from "react";

export default function Footer() {
  const mode = useContext(ThemeContext).mode;
  const color = useContext(ThemeContext).color;

  return (
    <footer
      className={[
        'px-10 py-2 text-center [&_svg]:inline-block bg-primaryBg text-neutralText',
        `theme-${color}`,
        `theme-${mode}`,
      ].filter(Boolean).join(' ')}>
      <a
        href="/about"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Suzanne and Emma
      </a>
    </footer>
  )
}
