import Pwa from "./Pwa";

export const metadata = {
  title: "LEGiON",
  description: "LEGiON Platforms",
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
        {children}
        <Pwa />
      </body>
    </html>
  );
}
