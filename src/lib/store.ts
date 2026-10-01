import { User, Invoice, Bid, RiskAssessment, EscrowAccount, LedgerEntry, AuditLog, PlatformMetrics } from "@/types";
import { calculateSha256 } from "./crypto";

// Default Seed Users
export const INITIAL_USERS: User[] = [
  {
    id: "user-supplier-1",
    email: "ravi@ravielectricals.com",
    name: "Ravi Sharma",
    role: "SUPPLIER",
    companyName: "Ravi Electricals",
    gstin: "27ABCDE1234F1Z5",
    phone: "+91 98765 43210",
    avatar: "RE",
    createdAt: "2026-08-15T10:00:00Z",
  },
  {
    id: "user-investor-1",
    email: "aman@growthfund.in",
    name: "Aman Sharma",
    role: "INVESTOR",
    companyName: "Growth Fund Capital",
    investmentPreference: "AAA & AA Rated (Short tenure < 90 days)",
    phone: "+91 98111 22334",
    avatar: "AS",
    createdAt: "2026-08-10T09:30:00Z",
  },
  {
    id: "user-admin-1",
    email: "admin@inflow.finance",
    name: "Inflow Operations Admin",
    role: "ADMIN",
    phone: "+91 99000 88776",
    avatar: "IA",
    createdAt: "2026-01-01T00:00:00Z",
  },
];

export const INITIAL_INVOICES: Invoice[] = [];

// Seed Live Bids for INV-2026-001
export const INITIAL_BIDS: Bid[] = [];

// Initial Risk Assessment for INV-2026-001
export const INITIAL_RISK: Record<string, RiskAssessment> = {};

// Initial Double Entry Ledger
export const INITIAL_LEDGER: LedgerEntry[] = [];

// Initial Audit Logs with SHA-256 Chaining
export const INITIAL_AUDIT_LOGS: AuditLog[] = [];

// In-Memory Database Store Class
class InflowStore {
  private users: User[] = [...INITIAL_USERS];
  private invoices: Invoice[] = [...INITIAL_INVOICES];
  private bids: Bid[] = [...INITIAL_BIDS];
  private riskAssessments: Record<string, RiskAssessment> = { ...INITIAL_RISK };
  private ledger: LedgerEntry[] = [...INITIAL_LEDGER];
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private escrows: Record<string, EscrowAccount> = {};

  // Current session simulator
  private currentUser: User = INITIAL_USERS[0]; // Ravi Electricals by default

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUserRole(role: "SUPPLIER" | "INVESTOR" | "ADMIN"): User {
    const found = this.users.find((u) => u.role === role);
    if (found) {
      this.currentUser = found;
      return found;
    }
    return this.currentUser;
  }

  public setCurrentUser(user: User): void {
    this.currentUser = user;
    if (!this.users.some((u) => u.id === user.id)) {
      this.users.push(user);
    }
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getInvoices(): Invoice[] {
    return this.invoices;
  }

  public getInvoiceById(id: string): Invoice | undefined {
    return this.invoices.find((i) => i.id === id || i.invoiceNumber === id);
  }

  public async addInvoice(invoiceData: Omit<Invoice, "id" | "status" | "bidsCount" | "createdAt">): Promise<Invoice> {
    const id = `inv-${Date.now()}`;
    const newInvoice: Invoice = {
      ...invoiceData,
      id,
      status: "Pending",
      bidsCount: 0,
      verificationChecklist: {
        invoiceNumberValid: false,
        buyerDetailsMatched: false,
        amountVerified: false,
        dueDateValid: false,
        documentVerified: false,
      },
      createdAt: new Date().toISOString(),
    };

    this.invoices.unshift(newInvoice);

    await this.addAuditLog({
      user: this.currentUser.name,
      role: this.currentUser.role,
      action: "Invoice Uploaded",
      entity: "Invoice",
      entityId: newInvoice.invoiceNumber,
      metadata: { amount: newInvoice.amount, buyer: newInvoice.buyerName },
    });

    return newInvoice;
  }

  public async verifyInvoice(id: string, approve: boolean): Promise<Invoice | null> {
    const invoice = this.invoices.find((i) => i.id === id || i.invoiceNumber === id);
    if (!invoice) return null;

    if (approve) {
      invoice.status = "Verified";
      invoice.verificationChecklist = {
        invoiceNumberValid: true,
        buyerDetailsMatched: true,
        amountVerified: true,
        dueDateValid: true,
        documentVerified: true,
      };

      // Automatically run AI Risk engine
      const risk = await this.evaluateRisk(invoice.id);
      invoice.riskTier = risk.tier;
      invoice.riskScore = risk.score;

      await this.addAuditLog({
        user: this.currentUser.name,
        role: "ADMIN",
        action: `Invoice Verified & Approved (Assigned ${risk.tier})`,
        entity: "Invoice",
        entityId: invoice.invoiceNumber,
      });
    } else {
      invoice.status = "Rejected";
      await this.addAuditLog({
        user: this.currentUser.name,
        role: "ADMIN",
        action: "Invoice Rejected",
        entity: "Invoice",
        entityId: invoice.invoiceNumber,
      });
    }

    return invoice;
  }

  public async evaluateRisk(invoiceId: string): Promise<RiskAssessment> {
    const existing = this.riskAssessments[invoiceId];
    if (existing) return existing;

    const invoice = this.getInvoiceById(invoiceId);
    const score = invoice ? Math.min(96, Math.max(70, Math.floor(85 + (invoice.amount % 12)))) : 91;
    let tier: "AAA" | "AA" | "A" | "BBB" = "AAA";
    if (score < 75) tier = "BBB";
    else if (score < 80) tier = "A";
    else if (score < 90) tier = "AA";

    const assessment: RiskAssessment = {
      id: `risk-${Date.now()}`,
      invoiceId,
      score,
      tier,
      factors: {
        paymentHistory: Math.min(98, score + 4),
        companyStability: Math.min(95, score + 1),
        invoiceHistory: Math.min(92, score - 1),
        verificationStatus: 100,
      },
      recommendedAdvanceRate: tier === "AAA" ? 92 : tier === "AA" ? 88 : tier === "A" ? 85 : 80,
      suggestedYieldRange: tier === "AAA" ? "7.8% - 8.5%" : tier === "AA" ? "9.0% - 11.0%" : "11.5% - 14.0%",
      evaluatedAt: new Date().toISOString(),
      evaluatorNotes: `Automated Risk Assessment: Model evaluated buyer financial filings, GST compliance, and historical repayment trends. Assigned Tier ${tier}.`,
    };

    this.riskAssessments[invoiceId] = assessment;

    await this.addAuditLog({
      user: "Inflow AI Risk Engine",
      role: "ADMIN",
      action: `Risk Assigned: ${tier} (Score ${score})`,
      entity: "RiskAssessment",
      entityId: assessment.id,
    });

    return assessment;
  }

  public getRiskAssessment(invoiceId: string): RiskAssessment | undefined {
    return this.riskAssessments[invoiceId];
  }

  public getBids(invoiceId?: string): Bid[] {
    if (invoiceId) {
      return this.bids.filter((b) => b.invoiceId === invoiceId);
    }
    return this.bids;
  }

  public async placeBid(data: {
    invoiceId: string;
    advanceAmount: number;
    annualYield: number;
    investorName?: string;
  }): Promise<Bid> {
    const invoice = this.getInvoiceById(data.invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    const expectedReturn = Math.round(invoice.amount - data.advanceAmount);
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      auctionId: `auc-${data.invoiceId}`,
      invoiceId: data.invoiceId,
      investorId: this.currentUser.id,
      investorName: data.investorName || this.currentUser.name || "Aman Sharma",
      advanceAmount: data.advanceAmount,
      annualYield: data.annualYield,
      expectedReturn,
      totalRepayment: invoice.amount,
      status: "ACTIVE",
      placedAt: new Date().toISOString(),
      timeAgo: "Just now",
    };

    // Check if it's best offer (highest advance amount or lowest yield)
    const existingBids = this.bids.filter((b) => b.invoiceId === data.invoiceId);
    const isBest = existingBids.every((b) => b.advanceAmount <= newBid.advanceAmount);

    if (isBest) {
      existingBids.forEach((b) => {
        if (b.status === "BEST_OFFER") b.status = "ACTIVE";
      });
      newBid.status = "BEST_OFFER";
      invoice.bestBidAmount = newBid.advanceAmount;
      invoice.bestBidYield = newBid.annualYield;
      invoice.bestBidId = newBid.id;
    }

    this.bids.unshift(newBid);
    invoice.bidsCount = (invoice.bidsCount || 0) + 1;

    await this.addAuditLog({
      user: newBid.investorName,
      role: "INVESTOR",
      action: `Bid Placed (₹${data.advanceAmount.toLocaleString("en-IN")} @ ${data.annualYield}%)`,
      entity: "Bid",
      entityId: newBid.id,
    });

    return newBid;
  }

  public async acceptBid(bidId: string): Promise<{ invoice: Invoice; escrow: EscrowAccount }> {
    const bid = this.bids.find((b) => b.id === bidId);
    if (!bid) throw new Error("Bid not found");

    const invoice = this.getInvoiceById(bid.invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    bid.status = "ACCEPTED";
    invoice.status = "Funded";

    // Setup Escrow
    const escrow: EscrowAccount = {
      id: `escrow-${Date.now()}`,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      supplierName: invoice.supplierName,
      investorName: bid.investorName,
      invoiceValue: invoice.amount,
      investorFunding: bid.advanceAmount,
      supplierPayout: bid.advanceAmount,
      expectedRepayment: invoice.amount,
      investorProfit: bid.expectedReturn,
      status: "ESCROW_ACTIVE",
      fundedAt: new Date().toISOString(),
      payoutReleasedAt: new Date().toISOString(),
    };
    this.escrows[invoice.id] = escrow;

    // Generate Double Entry Ledger Entries
    const now = new Date().toISOString().replace("T", " ").slice(0, 19);
    const txIdInvestorEscrow = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
    const txIdEscrowSupplier = `TX-${Math.floor(1000 + Math.random() * 9000)}`;

    this.ledger.unshift(
      {
        id: `led-${Date.now()}-1`,
        transactionId: txIdInvestorEscrow,
        date: now,
        description: `Investor Funding (${bid.investorName}) → Escrow Account`,
        account: "Escrow Holding A/C",
        type: "CREDIT",
        amount: bid.advanceAmount,
        balanceAfter: bid.advanceAmount,
        status: "POSTED",
        referenceId: invoice.id,
      },
      {
        id: `led-${Date.now()}-2`,
        transactionId: txIdInvestorEscrow,
        date: now,
        description: `Investor Disbursal Debit (${bid.investorName})`,
        account: `${bid.investorName} Capital Settlement A/C`,
        type: "DEBIT",
        amount: bid.advanceAmount,
        balanceAfter: 15000000,
        status: "POSTED",
        referenceId: invoice.id,
      },
      {
        id: `led-${Date.now()}-3`,
        transactionId: txIdEscrowSupplier,
        date: now,
        description: `Escrow Instant Disbursal → ${invoice.supplierName}`,
        account: "Escrow Holding A/C",
        type: "DEBIT",
        amount: bid.advanceAmount,
        balanceAfter: 0,
        status: "POSTED",
        referenceId: invoice.id,
      },
      {
        id: `led-${Date.now()}-4`,
        transactionId: txIdEscrowSupplier,
        date: now,
        description: `Supplier Working Capital Credit (${invoice.supplierName})`,
        account: `${invoice.supplierName} Operational A/C`,
        type: "CREDIT",
        amount: bid.advanceAmount,
        balanceAfter: 5310000,
        status: "POSTED",
        referenceId: invoice.id,
      }
    );

    // Audit logs
    await this.addAuditLog({
      user: invoice.supplierName,
      role: "SUPPLIER",
      action: `Bid Accepted from ${bid.investorName}`,
      entity: "Invoice",
      entityId: invoice.invoiceNumber,
      metadata: { advance: bid.advanceAmount, yield: bid.annualYield },
    });

    await this.addAuditLog({
      user: "Inflow Escrow Engine",
      role: "ADMIN",
      action: "Escrow Activated & Supplier Payout Simulated",
      entity: "Escrow",
      entityId: escrow.id,
      metadata: { payoutAmount: bid.advanceAmount },
    });

    return { invoice, escrow };
  }

  public async simulateRepayment(invoiceId: string): Promise<{ invoice: Invoice; escrow: EscrowAccount }> {
    const invoice = this.getInvoiceById(invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    const escrow = this.escrows[invoice.id] || {
      id: `escrow-${Date.now()}`,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      supplierName: invoice.supplierName,
      investorName: "Growth Fund",
      invoiceValue: invoice.amount,
      investorFunding: invoice.amount * 0.92,
      supplierPayout: invoice.amount * 0.92,
      expectedRepayment: invoice.amount,
      investorProfit: invoice.amount * 0.08,
      status: "ESCROW_ACTIVE",
    };

    escrow.status = "SETTLED";
    escrow.repaidAt = new Date().toISOString();
    invoice.status = "Repaid";
    this.escrows[invoice.id] = escrow;

    // Double Entry Ledger for corporate buyer repayment & settlement
    const now = new Date().toISOString().replace("T", " ").slice(0, 19);
    const txIdBuyerEscrow = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
    const txIdSettlement = `TX-${Math.floor(1000 + Math.random() * 9000)}`;

    this.ledger.unshift(
      {
        id: `led-${Date.now()}-5`,
        transactionId: txIdBuyerEscrow,
        date: now,
        description: `Corporate Buyer Repayment: ${invoice.buyerName} → Escrow`,
        account: "Escrow Settlement A/C",
        type: "CREDIT",
        amount: invoice.amount,
        balanceAfter: invoice.amount,
        status: "POSTED",
        referenceId: invoice.id,
      },
      {
        id: `led-${Date.now()}-6`,
        transactionId: txIdBuyerEscrow,
        date: now,
        description: `Buyer Obligation Fulfilled: ${invoice.buyerName}`,
        account: "Trade Accounts Receivable A/C",
        type: "DEBIT",
        amount: invoice.amount,
        balanceAfter: 0,
        status: "POSTED",
        referenceId: invoice.id,
      },
      {
        id: `led-${Date.now()}-7`,
        transactionId: txIdSettlement,
        date: now,
        description: `Escrow Payout to Investor (${escrow.investorName}) Principal + Yield`,
        account: "Escrow Settlement A/C",
        type: "DEBIT",
        amount: invoice.amount,
        balanceAfter: 0,
        status: "POSTED",
        referenceId: invoice.id,
      },
      {
        id: `led-${Date.now()}-8`,
        transactionId: txIdSettlement,
        date: now,
        description: `Investor Return Credited: Yield ₹${escrow.investorProfit.toLocaleString("en-IN")}`,
        account: `${escrow.investorName} Return Settlement A/C`,
        type: "CREDIT",
        amount: invoice.amount,
        balanceAfter: 19540000,
        status: "POSTED",
        referenceId: invoice.id,
      }
    );

    await this.addAuditLog({
      user: "Corporate Buyer (" + invoice.buyerName + ")",
      role: "ADMIN",
      action: `Day-90 Full Repayment of ₹${invoice.amount.toLocaleString("en-IN")} Received`,
      entity: "Invoice",
      entityId: invoice.invoiceNumber,
      metadata: { buyer: invoice.buyerName, fullRepayment: invoice.amount },
    });

    await this.addAuditLog({
      user: "Inflow Settlement Engine",
      role: "ADMIN",
      action: `Investor Yield Payout Settled to ${escrow.investorName} (Profit: ₹${escrow.investorProfit.toLocaleString("en-IN")})`,
      entity: "Escrow",
      entityId: escrow.id,
      metadata: { profit: escrow.investorProfit },
    });

    return { invoice, escrow };
  }

  public getEscrow(invoiceId: string): EscrowAccount | undefined {
    return this.escrows[invoiceId];
  }

  public getLedger(): LedgerEntry[] {
    return this.ledger;
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public async addAuditLog(data: {
    user: string;
    role: "SUPPLIER" | "INVESTOR" | "ADMIN";
    action: string;
    entity: string;
    entityId: string;
    metadata?: Record<string, any>;
  }): Promise<AuditLog> {
    const lastLog = this.auditLogs[0];
    const previousHash = lastLog
      ? lastLog.currentHash
      : "0000000000000000000000000000000000000000000000000000000000000000";

    const timestamp = new Date().toISOString();
    const rawString = `${previousHash}|${timestamp}|${data.user}|${data.action}|${data.entity}|${data.entityId}`;
    const currentHash = await calculateSha256(rawString);

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp,
      user: data.user,
      role: data.role,
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      ipAddress: "127.0.0.1",
      metadata: data.metadata,
      previousHash,
      currentHash,
    };

    this.auditLogs.unshift(newLog);
    return newLog;
  }

  public getPlatformMetrics(): PlatformMetrics {
    const totalVal = this.invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const fundedVal = this.invoices
      .filter((inv) => inv.status === "Funded" || inv.status === "Repaid")
      .reduce((sum, inv) => sum + (inv.bestBidAmount || inv.amount * 0.92), 0);

    return {
      totalInvoiceValue: 18000000, // ₹1.8 Cr
      totalInvoiceValueGrowth: 20.5,
      fundedAmount: 12000000, // ₹1.2 Cr
      fundedAmountGrowth: 18.3,
      activeAuctions: 24,
      activeAuctionsGrowth: 12.5,
      totalInvestors: 182,
      totalInvestorsGrowth: 28.1,
      averageFundingTimeHours: 14.5,
      defaultRatePercent: 0.1,
      repaymentRatePercent: 98.2,
    };
  }

  public resetDemo(): void {
    this.users = [...INITIAL_USERS];
    this.invoices = JSON.parse(JSON.stringify(INITIAL_INVOICES));
    this.bids = JSON.parse(JSON.stringify(INITIAL_BIDS));
    this.riskAssessments = JSON.parse(JSON.stringify(INITIAL_RISK));
    this.ledger = JSON.parse(JSON.stringify(INITIAL_LEDGER));
    this.auditLogs = JSON.parse(JSON.stringify(INITIAL_AUDIT_LOGS));
    this.escrows = {};
    this.currentUser = this.users[0];
  }
}

// Global Singleton for Next.js hot-reload persistence
const globalForInflow = globalThis as unknown as { inflowStore: InflowStore };
export const inflowStore = globalForInflow.inflowStore || new InflowStore();
if (process.env.NODE_ENV !== "production") globalForInflow.inflowStore = inflowStore;
