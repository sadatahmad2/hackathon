export type UserRole = "SUPPLIER" | "INVESTOR" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  companyName?: string;
  gstin?: string;
  investmentPreference?: string;
  avatar?: string;
  avatarUrl?: string;
  createdAt: string;
}

export type InvoiceStatus = "Pending" | "Under Review" | "Verified" | "Rejected" | "Active Auction" | "Funded" | "Repaid";
export type RiskTier = "AAA" | "AA" | "A" | "BBB";

export interface InvoiceDocument {
  id: string;
  invoiceId: string;
  name: string;
  type: "INVOICE_PDF" | "DELIVERY_PROOF" | "PURCHASE_ORDER" | "OTHER";
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
}

export interface RiskAssessment {
  id: string;
  invoiceId: string;
  score: number; // 0 - 100
  tier: RiskTier;
  factors: {
    paymentHistory: number; // percentage
    companyStability: number;
    invoiceHistory: number;
    verificationStatus: number;
  };
  recommendedAdvanceRate: number; // e.g. 92%
  suggestedYieldRange: string; // e.g. "8.0% - 9.5%"
  evaluatedAt: string;
  evaluatorNotes: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  invoiceId: string;
  investorId: string;
  investorName: string;
  advanceAmount: number; // e.g. 460000
  annualYield: number; // e.g. 8.0
  expectedReturn: number; // e.g. 40000
  totalRepayment: number; // e.g. 500000
  status: "ACTIVE" | "BEST_OFFER" | "ACCEPTED" | "OUTBID" | "REJECTED";
  placedAt: string;
  timeAgo?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  supplierId: string;
  supplierName: string;
  supplierGst: string;
  buyerName: string;
  buyerGst: string;
  buyerIndustry: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  tenureDays: number;
  description: string;
  status: InvoiceStatus;
  riskTier?: RiskTier;
  riskScore?: number;
  bestBidAmount?: number;
  bestBidYield?: number;
  bestBidId?: string;
  bidsCount: number;
  documents: InvoiceDocument[];
  verificationChecklist?: {
    invoiceNumberValid: boolean;
    buyerDetailsMatched: boolean;
    amountVerified: boolean;
    dueDateValid: boolean;
    documentVerified: boolean;
  };
  createdAt: string;
}

export interface EscrowAccount {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  supplierName: string;
  investorName: string;
  invoiceValue: number;
  investorFunding: number;
  supplierPayout: number;
  expectedRepayment: number;
  investorProfit: number;
  status: "PENDING" | "ESCROW_ACTIVE" | "PAYOUT_RELEASED" | "REPAYMENT_RECEIVED" | "SETTLED";
  fundedAt?: string;
  payoutReleasedAt?: string;
  repaidAt?: string;
}

export type LedgerEntryType = "DEBIT" | "CREDIT";

export interface LedgerEntry {
  id: string;
  transactionId: string;
  date: string;
  description: string;
  account: string;
  type: LedgerEntryType;
  amount: number;
  balanceAfter: number;
  status: "POSTED" | "PENDING" | "RECONCILED";
  referenceId: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  metadata?: Record<string, any>;
  previousHash: string;
  currentHash: string;
}

export interface PlatformMetrics {
  totalInvoiceValue: number;
  totalInvoiceValueGrowth: number;
  fundedAmount: number;
  fundedAmountGrowth: number;
  activeAuctions: number;
  activeAuctionsGrowth: number;
  totalInvestors: number;
  totalInvestorsGrowth: number;
  averageFundingTimeHours: number;
  defaultRatePercent: number;
  repaymentRatePercent: number;
}
