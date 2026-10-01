import React from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />
      
      <main className="flex-1 py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-12 text-center">Terms and Conditions</h1>
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none">
          {/* Supplier Terms */}
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mb-6">SUPPLIER TERMS AND CONDITIONS</h2>
          <p className="text-sm text-slate-500 mb-6">Last Updated: October 2026</p>
          <p>These Supplier Terms and Conditions ("Supplier Terms") govern the relationship between Inflow ("Platform", "Company", "we", "us" or "our") and the supplier/business entity ("Supplier", "you" or "your") using the Platform for invoice-based financing or related financial services.</p>
          <p>By registering on, accessing, or using the Platform, you agree to these Supplier Terms.</p>
          
          <h3 className="text-lg font-bold mt-6 mb-2">1. ELIGIBILITY</h3>
          <p>1.1 The Supplier must be a legally existing business or individual eligible to use the services provided through the Platform.</p>
          <p>1.2 The Supplier must provide accurate and complete information, including PAN, GSTIN, business registration details, bank account details, contact information and other documents requested by the Platform.</p>
          <p>1.3 The Platform may independently verify the information provided by the Supplier through government databases, authorised service providers, financial institutions, credit bureaus, Account Aggregators, GST systems, PAN verification services, MCA records and other legally permitted sources.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">2. KYC AND BUSINESS VERIFICATION</h3>
          <p>2.1 The Supplier agrees to complete all applicable KYC, KYB, AML and verification procedures required by the Platform or its financing partners.</p>
          <p>2.2 The Supplier authorises the Platform and/or its authorised partners, subject to applicable law and required consent, to verify the Supplier's PAN, GSTIN, bank account, business registration, financial information and other relevant information.</p>
          <p>2.3 The Platform may reject, suspend or terminate an application where information is incomplete, inaccurate, inconsistent, fraudulent or cannot be independently verified.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">3. INVOICE SUBMISSION</h3>
          <p>3.1 The Supplier may submit invoices for financing through the Platform.</p>
          <p>3.2 The Supplier represents and warrants that every invoice submitted:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) is genuine and legally issued;</li>
            <li>(b) relates to an actual supply of goods or services;</li>
            <li>(c) contains accurate information;</li>
            <li>(d) has not been fabricated, altered or manipulated;</li>
            <li>(e) has not already been paid, unless partial financing is expressly permitted;</li>
            <li>(f) has not previously been assigned, pledged, discounted or financed with another financier, except where expressly disclosed and permitted;</li>
            <li>(g) is not subject to any undisclosed dispute, claim, set-off or counterclaim; and</li>
            <li>(h) is legally enforceable against the relevant buyer/debtor, subject to applicable law.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">4. BUYER AND RECEIVABLE VERIFICATION</h3>
          <p>4.1 The Supplier authorises the Platform and/or its financing partners to verify the buyer/debtor and the relevant receivable.</p>
          <p>4.2 Such verification may include GST verification, e-invoice/IRN verification where applicable, buyer confirmation, payment history, bank transaction information, ERP/accounting information and other legally permitted sources.</p>
          <p>4.3 The Supplier agrees that the Platform may contact the buyer/debtor for the purpose of verifying the invoice, outstanding amount, payment status, due date, delivery of goods/services and other relevant information.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">5. REPRESENTATIONS AND WARRANTIES</h3>
          <p>The Supplier represents and warrants that:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) all information provided to the Platform is true, accurate and complete;</li>
            <li>(b) the Supplier has authority to enter into financing arrangements through the Platform;</li>
            <li>(c) the underlying transaction is genuine;</li>
            <li>(d) the goods/services relating to the invoice have been supplied or performed;</li>
            <li>(e) the invoice amount is accurate;</li>
            <li>(f) no material information relating to the receivable has been withheld;</li>
            <li>(g) the Supplier is not knowingly submitting duplicate invoices;</li>
            <li>(h) the Supplier will immediately notify the Platform of any payment, credit note, cancellation, dispute, return, adjustment or change relating to a financed invoice.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">6. FINANCING</h3>
          <p>6.1 Submission of an invoice does not guarantee financing.</p>
          <p>6.2 Financing shall be subject to eligibility, verification, underwriting, risk assessment, availability of funds and applicable law.</p>
          <p>6.3 The amount financed, applicable fees, interest/financing charges, tenure and repayment/settlement terms shall be communicated separately through the Platform or applicable financing agreement.</p>
          <p>6.4 The Supplier shall be responsible for all charges expressly agreed under the applicable financing agreement.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">7. PAYMENT AND COLLECTION</h3>
          <p>7.1 Depending on the applicable financing structure, the buyer/debtor may be instructed to make payment directly to the financier, a designated collection account, or through another legally permitted mechanism.</p>
          <p>7.2 The Supplier shall not intentionally divert, conceal or interfere with payments relating to a financed receivable.</p>
          <p>7.3 If the Supplier receives payment relating to a financed invoice directly, the Supplier shall promptly notify the Platform/financier and follow the applicable settlement instructions.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">8. DEFAULT AND BREACH</h3>
          <p>A breach may include:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) submission of a false or fraudulent invoice;</li>
            <li>(b) duplicate financing;</li>
            <li>(c) misrepresentation of a buyer or transaction;</li>
            <li>(d) concealment of payment;</li>
            <li>(e) intentional diversion of receivable proceeds;</li>
            <li>(f) material breach of the applicable financing agreement; or</li>
            <li>(g) providing materially false or misleading information.</li>
          </ul>
          <p>In case of breach, the Platform and/or financier may suspend the account, cancel pending transactions, initiate recovery or other lawful action, and exercise rights available under the applicable agreement and law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">9. FRAUD PREVENTION</h3>
          <p>The Platform may use automated and manual fraud detection systems to identify duplicate invoices, suspicious transactions, unusual transaction patterns, identity mismatches, abnormal payment behaviour and other potential fraud indicators. The Supplier agrees to cooperate with reasonable verification requests.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">10. DATA AND CONSENT</h3>
          <p>10.1 The Supplier consents to the collection, processing, storage and sharing of information necessary to provide, verify, administer and monitor the services, subject to applicable law and the Platform's Privacy Policy.</p>
          <p>10.2 Where specific consent is legally required, the Platform shall obtain such consent through an appropriate mechanism.</p>
          <p>10.3 The Supplier understands that relevant information may be shared with financing partners, verification providers, payment providers, credit information companies, Account Aggregators, regulators and other authorised parties where legally permitted or required.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">11. SUSPENSION AND TERMINATION</h3>
          <p>The Platform may suspend or terminate access where:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) required KYC information is not provided;</li>
            <li>(b) fraudulent or suspicious activity is detected;</li>
            <li>(c) the Supplier breaches these Terms;</li>
            <li>(d) the Supplier provides materially inaccurate information;</li>
            <li>(e) required by law or regulatory authorities; or</li>
            <li>(f) continued access creates unacceptable legal, compliance or financial risk.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">12. INDEMNITY</h3>
          <p>The Supplier agrees to indemnify and hold harmless the Platform and its authorised partners, to the extent permitted by law, from losses, claims, damages, costs or expenses arising from the Supplier's fraud, wilful misconduct, material misrepresentation, breach of these Terms or submission of fraudulent or invalid receivables.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">13. LIMITATION OF LIABILITY</h3>
          <p>To the maximum extent permitted by applicable law, the Platform shall not be liable for losses arising from events beyond its reasonable control, third-party system failures, government-system downtime, inaccurate information supplied by the Supplier or buyer, or decisions made by independent financing partners.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">14. CHANGES TO THESE TERMS</h3>
          <p>The Platform may modify these Terms from time to time. Updated Terms will be made available through the Platform or website. Continued use after the effective date of updated Terms constitutes acceptance, subject to applicable law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">15. GOVERNING LAW AND JURISDICTION</h3>
          <p>These Terms shall be governed by the laws of India. Subject to any mandatory dispute-resolution mechanism applicable to the transaction, courts at Mumbai, Maharashtra shall have jurisdiction.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">16. CONTACT</h3>
          <p>For questions or complaints relating to these Terms:</p>
          <p>Inflow<br/>Email: support@inflow.com<br/>Website: www.inflow.com</p>

          <hr className="my-12 border-slate-200" />

          {/* Investor Terms */}
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mb-6">INVESTOR / FUNDER TERMS AND CONDITIONS</h2>
          <p className="text-sm text-slate-500 mb-6">Last Updated: October 2026</p>
          <p>These Investor/Funder Terms and Conditions ("Investor Terms") govern access to and participation in financing opportunities made available through Inflow ("Platform", "Company", "we", "us" or "our").</p>

          <h3 className="text-lg font-bold mt-6 mb-2">1. ELIGIBILITY</h3>
          <p>1.1 Participation is subject to applicable law and eligibility requirements.</p>
          <p>1.2 The Platform may require completion of KYC, identity verification, bank-account verification, tax verification and other compliance procedures.</p>
          <p>1.3 The Platform may restrict access to certain products or opportunities based on the user's eligibility, jurisdiction, regulatory status or applicable law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">2. NATURE OF THE PLATFORM</h3>
          <p>2.1 The Platform may provide technology, information, transaction facilitation and related services.</p>
          <p>2.2 Unless expressly stated in a separate agreement, the Platform does not guarantee repayment, returns or the performance of any borrower/supplier.</p>
          <p>2.3 The legal nature of each financing transaction shall be governed by the applicable financing agreement and applicable law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">3. INVESTMENT / FUNDING OPPORTUNITIES</h3>
          <p>3.1 Information displayed regarding a supplier, invoice, buyer, transaction amount, expected payment date or financing opportunity is provided for the purpose of evaluating the relevant transaction.</p>
          <p>3.2 Availability of any financing opportunity is subject to verification, eligibility, legal requirements and availability.</p>
          <p>3.3 The Investor/Funder shall independently consider the risks associated with each transaction.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">4. RISK DISCLOSURE</h3>
          <p>The Investor/Funder acknowledges that financing receivables involves risk, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) borrower/supplier default;</li>
            <li>(b) buyer/debtor payment delay or default;</li>
            <li>(c) invoice dispute;</li>
            <li>(d) fraud;</li>
            <li>(e) partial or non-payment;</li>
            <li>(f) insolvency or financial distress;</li>
            <li>(g) operational and technology risks;</li>
            <li>(h) regulatory changes;</li>
            <li>(i) delays in collection; and</li>
            <li>(j) possible loss of principal, where applicable.</li>
          </ul>
          <p>No statement on the Platform shall be interpreted as a guarantee of profit or repayment unless expressly provided under a legally valid agreement.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">5. NO GUARANTEED RETURNS</h3>
          <p>Unless expressly stated in a legally enforceable agreement and permitted by applicable law, the Platform does not guarantee any fixed return, profit, interest, repayment or capital protection.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">6. KYC AND COMPLIANCE</h3>
          <p>6.1 The Investor/Funder agrees to provide accurate information required for KYC, AML, tax and regulatory compliance.</p>
          <p>6.2 The Platform may verify information through authorised third-party service providers and legally permitted databases.</p>
          <p>6.3 The Platform may suspend or reject participation if required information cannot be verified.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">7. PAYMENTS</h3>
          <p>All payments shall be made through the payment mechanisms specified by the Platform or applicable financing agreement. The Investor/Funder shall not make or receive unauthorised payments outside the approved transaction mechanism where such restriction is required by the applicable financing structure.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">8. COLLECTION AND DEFAULT</h3>
          <p>8.1 Where a financed receivable is delayed or defaulted, collection and recovery shall be conducted in accordance with the applicable financing agreement and applicable law.</p>
          <p>8.2 The Platform may facilitate communication, documentation and collection processes where legally permitted.</p>
          <p>8.3 Recovery is not guaranteed.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">9. FEES AND CHARGES</h3>
          <p>Applicable platform fees, transaction fees, servicing fees or other charges shall be disclosed before the relevant transaction is completed.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">10. TAXES</h3>
          <p>The Investor/Funder shall be responsible for understanding and complying with applicable tax obligations arising from transactions conducted through the Platform.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">11. DATA AND PRIVACY</h3>
          <p>The Platform may collect and process personal, financial, transactional and KYC information for onboarding, compliance, transaction processing, fraud prevention, servicing and other lawful purposes in accordance with applicable law and the Privacy Policy.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">12. CONFIDENTIALITY</h3>
          <p>The Investor/Funder shall not misuse or disclose confidential information relating to borrowers, suppliers, buyers, transactions or the Platform except as permitted by law or authorised by the Platform.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">13. PROHIBITED ACTIVITIES</h3>
          <p>The Investor/Funder shall not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) use the Platform for unlawful activities;</li>
            <li>(b) provide false information;</li>
            <li>(c) attempt to manipulate transactions;</li>
            <li>(d) engage in fraudulent activities;</li>
            <li>(e) use another person's identity or account; or</li>
            <li>(f) circumvent applicable KYC, AML or regulatory requirements.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">14. SUSPENSION AND TERMINATION</h3>
          <p>The Platform may suspend or terminate an account where required for legal, regulatory, compliance, security or risk-management reasons.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">15. LIMITATION OF LIABILITY</h3>
          <p>To the extent permitted by law, the Platform shall not be responsible for losses resulting from borrower/buyer default, third-party failures, government-system downtime, market conditions, regulatory changes or circumstances outside the Platform's reasonable control.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">16. CHANGES</h3>
          <p>The Platform may update these Terms from time to time. Updated Terms shall become effective as specified in the revised Terms, subject to applicable law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">17. GOVERNING LAW</h3>
          <p>These Terms shall be governed by the laws of India. Subject to mandatory legal requirements, courts at Mumbai, Maharashtra shall have jurisdiction.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">18. CONTACT</h3>
          <p>Inflow<br/>Email: support@inflow.com<br/>Website: www.inflow.com</p>

          <hr className="my-12 border-slate-200" />

          {/* Website Terms */}
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mb-6">WEBSITE TERMS AND CONDITIONS</h2>
          <p className="text-sm text-slate-500 mb-6">Last Updated: October 2026</p>
          <p>Welcome to www.inflow.com, operated by Inflow ("Company", "we", "us" or "our"). These Website Terms and Conditions ("Terms") govern your access to and use of our website, mobile application, platform and related services. By accessing or using the Platform, you agree to these Terms.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">1. ABOUT THE PLATFORM</h3>
          <p>The Platform provides technology and related services for business verification, invoice management, financing facilitation, transaction processing and related financial services, subject to the applicable product terms and regulatory framework. The exact services available to a user may depend on eligibility, verification, applicable law and agreements with financial or other regulated partners.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">2. USER REGISTRATION</h3>
          <p>Users may be required to create an account and provide accurate information. Users are responsible for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) maintaining the confidentiality of login credentials;</li>
            <li>(b) providing accurate information;</li>
            <li>(c) updating information when required; and</li>
            <li>(d) all activities conducted through their account, subject to applicable law.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">3. VERIFICATION</h3>
          <p>The Company may conduct identity, business, tax, financial, fraud and compliance checks using authorised third-party service providers and legally permitted databases. Verification may include PAN, GSTIN, company/business records, bank-account information, financial information, invoice information and other relevant information.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">4. INVOICE AND BUSINESS INFORMATION</h3>
          <p>Users must not upload, submit or provide fraudulent, forged, altered or misleading information. The Company may verify submitted invoices and business information through available government, financial, commercial and third-party systems.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">5. THIRD-PARTY SERVICES</h3>
          <p>The Platform may use third-party service providers for KYC, PAN verification, GST verification, banking, payments, Account Aggregator services, credit information, fraud prevention, communications and other functions. Availability and accuracy of third-party services may depend on the relevant provider.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">6. FINANCING</h3>
          <p>Access to financing is not guaranteed. Any financing shall be subject to applicable eligibility criteria, verification, underwriting, availability, applicable agreements and applicable law. The Company does not represent that every user or invoice will qualify for financing.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">7. FINANCIAL INFORMATION</h3>
          <p>Information displayed on the Platform is provided for informational and transaction-processing purposes and should not be interpreted as a guarantee of financial performance, repayment, profit or investment return unless expressly stated in a legally binding agreement.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">8. USER RESPONSIBILITIES</h3>
          <p>Users agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) provide false or misleading information;</li>
            <li>(b) upload fraudulent documents;</li>
            <li>(c) submit duplicate invoices for financing;</li>
            <li>(d) impersonate another person or entity;</li>
            <li>(e) interfere with Platform security;</li>
            <li>(f) attempt unauthorised access;</li>
            <li>(g) use the Platform for unlawful activities; or</li>
            <li>(h) violate applicable laws or regulations.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">9. INTELLECTUAL PROPERTY</h3>
          <p>All content, software, trademarks, logos, designs, graphics and other intellectual property appearing on the Platform belong to the Company or its licensors unless otherwise stated. Users may not copy, reproduce, modify, distribute, reverse engineer or commercially exploit Platform content without prior written permission, except where permitted by law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">10. PRIVACY</h3>
          <p>The Company's collection and processing of personal and financial information is governed by its Privacy Policy. Users should review the Privacy Policy before using the Platform.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">11. DATA CONSENT</h3>
          <p>Where legally required, users may be asked to provide consent before their information is accessed or shared with third-party service providers. Users acknowledge that certain services may not be available if legally required consent is not provided.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">12. SECURITY</h3>
          <p>The Company will implement reasonable security measures appropriate to the nature of the services. However, no internet-based system can be guaranteed to be completely secure. Users must immediately notify the Company if they suspect unauthorised access to their account.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">13. AVAILABILITY</h3>
          <p>The Company may temporarily suspend or restrict access due to maintenance, security issues, technical problems, third-party service outages, regulatory requirements or other circumstances.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">14. DISCLAIMER</h3>
          <p>To the maximum extent permitted by applicable law, the Platform is provided on an "as available" basis. The Company does not guarantee that:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>(a) the Platform will always be available;</li>
            <li>(b) third-party information will always be accurate or available;</li>
            <li>(c) every financing application will be approved; or</li>
            <li>(d) every transaction will be completed without delay.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">15. LIMITATION OF LIABILITY</h3>
          <p>To the extent permitted by applicable law, the Company shall not be liable for indirect, incidental, special or consequential losses arising from use of the Platform or third-party services. Nothing in these Terms shall exclude liability that cannot legally be excluded under applicable law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">16. INDEMNITY</h3>
          <p>Users agree to indemnify the Company, its officers, employees and authorised service providers against claims, losses, damages and expenses arising from the user's fraud, unlawful activity, material misrepresentation, breach of these Terms or misuse of the Platform, to the extent permitted by applicable law.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">17. SUSPENSION AND TERMINATION</h3>
          <p>The Company may suspend or terminate access where reasonably necessary for security, fraud prevention, legal, regulatory, compliance or contractual reasons.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">18. CHANGES TO TERMS</h3>
          <p>The Company may update these Terms from time to time. The updated version will be published on the Platform with the applicable effective date.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">19. GOVERNING LAW</h3>
          <p>These Terms shall be governed by the laws of India. Subject to mandatory applicable law, courts at Mumbai, Maharashtra shall have jurisdiction.</p>

          <h3 className="text-lg font-bold mt-6 mb-2">20. GRIEVANCE AND CONTACT</h3>
          <p>For questions, complaints or grievances, please contact:</p>
          <p>Inflow<br/>Email: support@inflow.com<br/>Grievance Email: grievances@inflow.com<br/>Website: www.inflow.com</p>

          <h3 className="text-lg font-bold mt-6 mb-2">21. ACCEPTANCE</h3>
          <p>By accessing or using the Platform, you acknowledge that you have read, understood and agreed to these Terms and any applicable product-specific agreements. If you do not agree with these Terms, you should not use the Platform.</p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
