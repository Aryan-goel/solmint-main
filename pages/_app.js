import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-dotted h-screen max-h-screen w-screen max-w-screen">
      <Component {...pageProps} />
    </div>
  );
}
