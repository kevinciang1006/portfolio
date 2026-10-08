import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} {profile.name} · kevinciang.com
    </footer>
  );
}
