import Script from 'next/script'

interface OrganizationSchemaProps {
    name?: string
    url?: string
    logo?: string
    description?: string
}

export function OrganizationSchema({
    name = "DhanMatrixCapital",
    url = "https://dhanmatrixcapital.vercel.app",
    logo = "https://dhanmatrixcapital.vercel.app/icon-512.png",
    description = "SEBI Regulated Wealth Management Platform - Smart Investing & Structured Growth"
}: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": name,
        "alternateName": "DMC",
        "url": url,
        "logo": logo,
        "image": "https://dhanmatrixcapital.vercel.app/og-image.png",
        "description": description,
        "telephone": "+91-8446285154",
        "email": "dhanmatrixcap@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        },
        "priceRange": "₹25,000+",
        "areaServed": "IN",
        "serviceType": ["Investment Management", "Wealth Management", "Financial Planning"],
        "knowsAbout": ["Stock Market", "Mutual Funds", "Portfolio Management", "Financial Planning"],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "14"
        },
        "sameAs": [
            "https://www.facebook.com/share/1BmKYbks6S/",
            "https://www.instagram.com/dhanmatrixcapital"
        ]
    }

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface FAQSchemaProps {
    faqs: Array<{ question: string; answer: string }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface InvestmentProductSchemaProps {
    name: string
    description: string
    minInvestment: string
    expectedReturn: string
}

export function InvestmentProductSchema({
    name,
    description,
    minInvestment,
    expectedReturn
}: InvestmentProductSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "InvestmentOrSavingsProduct",
        "name": name,
        "description": description,
        "provider": {
            "@type": "FinancialService",
            "name": "DhanMatrixCapital"
        },
        "feesAndCommissionsSpecification": minInvestment,
        "annualPercentageRate": expectedReturn
    }

    return (
        <Script
            id={`investment-product-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
