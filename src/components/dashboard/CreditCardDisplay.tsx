import Image from 'next/image'

interface CreditCardDisplayProps {
    cardNumber?: string
    cardHolder?: string
    expiryDate?: string
}

export default function CreditCardDisplay({
    cardNumber = "•••• •••• •••• 3947",
    cardHolder = "Hanna Rosser",
    expiryDate = "07/25"
}: CreditCardDisplayProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-6">Cards</h3>

            {/* Card */}
            <div className="relative w-full h-48 rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500 p-6 shadow-xl">
                {/* Card Logos */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-2">
                        <div className="w-10 h-7 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
                            <div className="w-6 h-4 bg-gradient-to-r from-red-500 to-orange-400 rounded-sm"></div>
                        </div>
                        <div className="w-10 h-7 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
                            <div className="w-6 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-sm"></div>
                        </div>
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="flex gap-0.5">
                            <div className="w-5 h-5 rounded-full bg-red-400"></div>
                            <div className="w-5 h-5 rounded-full bg-orange-400 -ml-2"></div>
                        </div>
                    </div>
                </div>

                {/* Card Number */}
                <div className="mb-6">
                    <p className="text-white text-xl font-semibold tracking-wider">{cardNumber}</p>
                </div>

                {/* Card Details */}
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-white/70 text-[10px] mb-1">Name</p>
                        <p className="text-white text-sm font-semibold">{cardHolder}</p>
                    </div>
                    <div>
                        <p className="text-white/70 text-[10px] mb-1">Expiry Date</p>
                        <p className="text-white text-sm font-semibold">{expiryDate}</p>
                    </div>
                </div>

                {/* Card Brand Logos Bottom */}
                <div className="absolute bottom-4 left-6 flex gap-2">
                    <div className="text-white text-xs font-bold">VISA</div>
                    <div className="text-white text-xs font-bold">AMEX</div>
                </div>
            </div>
        </div>
    )
}
