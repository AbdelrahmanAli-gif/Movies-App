import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "MoviesNest",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen relative pb-24`}
      >
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
