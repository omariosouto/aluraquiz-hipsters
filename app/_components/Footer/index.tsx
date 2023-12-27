import { AluraLogo } from "../AluraLogo";
import footerStyles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <AluraLogo />
      <p>
        Orgulhosamente criado com o <br />DevSoutinho e a Alura
      </p>
    </footer>
  )
}