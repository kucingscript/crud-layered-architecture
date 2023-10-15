import Providers from "./providers";

export const metadata = {
  title: "CRUD Layered Architecture",
  description: "CRUD Layered Architecture Next JS - Kucingscript",
  keywords: "CRUD Layered Architecture, kucingscript",
  authors: { name: "kucingscript", url: "https://github.com/kucingscript" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
