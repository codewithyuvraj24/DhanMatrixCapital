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
    logo = "https://dhanmatrixcapital.vercel.app/icon-192.png",
    description = "SEBI-regulated wealth management platform offering professional portfolio management and guaranteed returns starting from just ₹500/month."
}: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": name,
        "url": url,
        "logo": logo,
        "description": description,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "dhanmatrixcap@gmail.com",
            "contactType": "Customer Service"
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
            id="investment-product-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
