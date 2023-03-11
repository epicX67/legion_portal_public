import Pwa from "./Pwa";
import "./index.scss";
import "./main.scss";
import "remixicon/fonts/remixicon.css";
import Nav from "@/core_components/Nav";

export const metadata = {
  title: "LEGiON Portal",
  description: "LEGiON Portal",
  manifest: "/manifest.json",
  themeColor: "#CCFFAD",
  icons: {
    icon: "/ico_128.png",
    shortcut: "/ico_128.png",
    apple: "/ico_128.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/ico_128.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Pwa />
      </body>
    </html>
  );
}
