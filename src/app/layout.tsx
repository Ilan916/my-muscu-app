import "./globals.css";
import StickyNav from "./components/StickyNav";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {children}
        <StickyNav />
      </body>
    </html>
  );
}
