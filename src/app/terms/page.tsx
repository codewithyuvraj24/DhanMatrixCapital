import { FadeIn } from '@/components/ui/Animations'

export const metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for Dhanmatrixcapital Platform.',
}

export default function TermsPage() {
    return (
        <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
            <FadeIn>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8">Terms of Service</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="lead">By accessing Dhanmatrixcapital, you agree to these Terms of Service.</p>
                    <h3>1. Investment Risks</h3>
                    <p>Investments in securities market are subject to market risks. Read all scheme related documents carefully. Past performance is not indicative of future returns.</p>
                    <h3>2. Account Security</h3>
                    <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>
                    <h3>3. Acceptable Use</h3>
                    <p>You must not misuse our services. For example, do not interfere with our services or try to access them using a method other than the interface and the instructions that we provide.</p>
                    <p className="text-sm text-slate-500 mt-8">Last Updated: January 2025</p>
                </div>
            </FadeIn>
        </div>
    )
}
