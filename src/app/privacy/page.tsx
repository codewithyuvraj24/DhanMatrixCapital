import { FadeIn } from '@/components/ui/Animations'

export const metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Dhanmatrixcapital - How we handle your data.',
}

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
            <FadeIn>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="lead">Your privacy is critically important to us. At Dhanmatrixcapital, we have a few fundamental principles:</p>
                    <ul>
                        <li>We don't ask you for personal information unless we truly need it.</li>
                        <li>We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
                        <li>We don't store personal information on our servers unless required for the on-going operation of one of our services.</li>
                    </ul>
                    <h3>1. Data Collection</h3>
                    <p>We collect basic analytics data and account information provided by you during registration (email, phone number). All sensitive data is encrypted.</p>
                    <h3>2. Security</h3>
                    <p>We use bank-grade 256-bit encryption (AES) to store your financial data. We are ISO 27001 certified.</p>
                    <p className="text-sm text-slate-500 mt-8">Last Updated: January 2025</p>
                </div>
            </FadeIn>
        </div>
    )
}
