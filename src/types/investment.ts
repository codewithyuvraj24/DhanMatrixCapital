export type InvestmentStatus = 'active' | 'pending' | 'withdrawn';

export interface Investment {
    id: string;
    userId: string;
    depositAmount: number;
    withdrawalDate: string;
    status: InvestmentStatus;
    createdAt: string;
}
