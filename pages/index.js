import Ubuntu from "../components/ubuntu";
import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";
import { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Ubuntu component with no SSR
const UbuntuNoSSR = dynamic(() => import("../components/ubuntu"), {
  ssr: false,
});

function App() {
  useEffect(() => {
    // Initialize GA only on client side
    const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
    if (TRACKING_ID) {
      ReactGA.initialize(TRACKING_ID);
      // Send initial pageview
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  return (
    <Suspense fallback={
      <div className="w-screen h-screen overflow-hidden loading">
        Loading...
      </div>
    }>
      <Meta />
      <UbuntuNoSSR />
    </Suspense>
  );
}

export default App;
