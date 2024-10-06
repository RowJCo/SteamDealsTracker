import "./global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Steam Deals Tracker",
  description: "Get the games you want at the price you want!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
