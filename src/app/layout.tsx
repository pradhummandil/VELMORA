'use client'
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <title>VELMORA | Premium Real Estate in India</title>
        <meta name="keywords" content="VELMORA, Luxury Real Estate India, Premium Properties Mumbai, Luxury Penthouses Gurugram, Bengaluru Residences, Goa Luxury Villas" />
        <meta name="description" content="Discover premium homes, luxury residences, investment properties and exceptional addresses across India's leading cities with VELMORA." />
        <link rel="canonical" href="https://velmora.in" />
        
        {/* Open Graph */}
        <meta property="og:site_name" content="VELMORA" />
        <meta property="og:url" content="https://velmora.in" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VELMORA | Premium Real Estate in India" />
        <meta property="og:description" content="Discover premium homes, luxury residences, investment properties and exceptional addresses across India's leading cities with VELMORA." />
        <meta property="og:image" content="https://velmora.in/assets/images/logo/logo_01.svg" />
        
        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VELMORA | Premium Real Estate in India" />
        <meta name="twitter:description" content="Discover premium homes, luxury residences, investment properties and exceptional addresses across India's leading cities with VELMORA." />
        
        {/* Robots & Viewport */}
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0D1A1C" />
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" />

        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "RealEstateAgent",
                  "@id": "https://velmora.in/#organization",
                  "name": "VELMORA",
                  "url": "https://velmora.in",
                  "logo": "https://velmora.in/assets/images/logo/logo_01.svg",
                  "description": "Curated Spaces. Timeless Living. Premium Real Estate advisory across India.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Dr Annie Besant Road, Worli",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "postalCode": "400018",
                    "addressCountry": "IN"
                  },
                  "telephone": "+91-22-4987-6543",
                  "priceRange": "₹₹₹₹"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://velmora.in/#website",
                  "url": "https://velmora.in",
                  "name": "VELMORA Real Estate",
                  "publisher": {
                    "@id": "https://velmora.in/#organization"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="main-page-wrapper">
          <Provider store={store}>
            {children}
          </Provider>
        </div>
      </body>
    </html>
  )
}
