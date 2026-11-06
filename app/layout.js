import "./globals.css";

export const metadata = {
  title: "TabNews",
  description: "Hello TabNews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
