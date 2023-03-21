import Pwa from "./Pwa";
import "./index.scss";
import "./main.scss";
import "remixicon/fonts/remixicon.css";
import RootClientWrapper from "./RootClientWrapper";
import Footer from "@/core_components/Footer";

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

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export default async function RootLayout({ children }) {
  const games = await getGames();
  return (
    <html lang="en">
      <body>
        <RootClientWrapper games={games} />
        {children}
        <Footer />
        <Pwa />
      </body>
    </html>
  );
}
