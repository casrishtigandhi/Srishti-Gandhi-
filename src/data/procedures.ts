import { AuditProcedure, AuditTabMeta, FinancialYear } from '../types/audit';

export const FINANCIAL_YEARS: FinancialYear[] = [
  'FY 2024-25',
  'FY 2025-26',
  'FY 2026-27',
];

export const AUDIT_TABS: AuditTabMeta[] = [
  {
    id: 'balance-sheet',
    label: 'Balance Sheet',
    description: 'Verification of non-current and current assets, equity, borrowings, payables, and provisions.',
  },
  {
    id: 'profit-and-loss',
    label: 'Profit and Loss',
    description: 'Substantive and analytical testing of revenue, other income, purchases, payroll, finance, and expenses.',
  },
  {
    id: 'accounting-standard-compliance',
    label: 'Accounting Standard Compliance',
    description: 'AS / Ind AS recognition, measurement, leases, actuarial, ECL, deferred taxes, RPT, contingencies, and going concern.',
  },
  {
    id: 'gst-compliance',
    label: 'GST Compliance',
    description: 'GSTR-1, GSTR-2B/2A, GSTR-3B reconciliations, outward liability mapping, and export tax receivables.',
  },
  {
    id: 'other-compliances',
    label: 'Other Compliances',
    description: 'Income tax, TDS, labour dues, MSME / 43B(h), ROC filings, CARO 2020 clauses, and Schedule III disclosures.',
  },
];

export const AUDIT_PROCEDURES: AuditProcedure[] = [
  // =========================================================================
  // 1. BALANCE SHEET
  // =========================================================================

  // Property, Plant & Equipment (PPE)
  {
    id: 'bs-ppe-1',
    tabId: 'balance-sheet',
    subSection: 'Property, Plant & Equipment (PPE)',
    text: 'Obtain PPE Register; verify useful life, residual value and depreciation rate as per Schedule II / AS 10 / Ind AS 16',
  },
  {
    id: 'bs-ppe-2',
    tabId: 'balance-sheet',
    subSection: 'Property, Plant & Equipment (PPE)',
    text: 'Reperform depreciation computation to check accuracy',
  },
  {
    id: 'bs-ppe-3',
    tabId: 'balance-sheet',
    subSection: 'Property, Plant & Equipment (PPE)',
    text: 'Substantive testing of additions and disposals during the year',
  },
  {
    id: 'bs-ppe-4',
    tabId: 'balance-sheet',
    subSection: 'Property, Plant & Equipment (PPE)',
    text: 'Verify title deeds of immovable property; check joint-name disclosures',
  },
  {
    id: 'bs-ppe-5',
    tabId: 'balance-sheet',
    subSection: 'Property, Plant & Equipment (PPE)',
    text: 'Check revaluation of PPE during year; obtain registered valuer report',
  },
  {
    id: 'bs-ppe-6',
    tabId: 'balance-sheet',
    subSection: 'Property, Plant & Equipment (PPE)',
    text: 'Verify assets destroyed / decapitalised — check WDV written off',
  },

  // Capital Work-In-Progress (CWIP)
  {
    id: 'bs-cwip-1',
    tabId: 'balance-sheet',
    subSection: 'Capital Work-In-Progress (CWIP)',
    text: 'Obtain CWIP movement sheet; verify ageing schedule',
  },
  {
    id: 'bs-cwip-2',
    tabId: 'balance-sheet',
    subSection: 'Capital Work-In-Progress (CWIP)',
    text: 'Obtain installation / completion certificates for CWIP capitalised during year',
  },
  {
    id: 'bs-cwip-4',
    tabId: 'balance-sheet',
    subSection: 'Capital Work-In-Progress (CWIP)',
    text: 'Verify CWIP completion plan for overdue / cost-overrun projects',
  },
  {
    id: 'bs-cwip-5',
    tabId: 'balance-sheet',
    subSection: 'Capital Work-In-Progress (CWIP)',
    text: 'Obtain status report of major projects as at year end',
  },

  // Intangible Assets / Intangible Assets under Development
  {
    id: 'bs-intang-1',
    tabId: 'balance-sheet',
    subSection: 'Intangible Assets / Intangible Assets under Development',
    text: 'Verify ownership of patents/trademarks from register / certificate',
  },
  {
    id: 'bs-intang-2',
    tabId: 'balance-sheet',
    subSection: 'Intangible Assets / Intangible Assets under Development',
    text: 'Ensure trademark renewal not lapsed; verify renewal fee payment',
  },
  {
    id: 'bs-intang-3',
    tabId: 'balance-sheet',
    subSection: 'Intangible Assets / Intangible Assets under Development',
    text: 'Review R&D expense account — check if any amount requires capitalisation',
  },
  {
    id: 'bs-intang-4',
    tabId: 'balance-sheet',
    subSection: 'Intangible Assets / Intangible Assets under Development',
    text: 'Ensure internally generated intangibles are NOT recognised',
  },
  {
    id: 'bs-intang-5',
    tabId: 'balance-sheet',
    subSection: 'Intangible Assets / Intangible Assets under Development',
    text: 'Verify Intangible Assets under Development — check approval and capitalisation criteria',
  },

  // Non-Current Investments
  {
    id: 'bs-ncinv-1',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Investments',
    text: 'Obtain lead schedule; verify board approval for investments',
  },
  {
    id: 'bs-ncinv-2',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Investments',
    text: 'Carry out physical inspection of share certificates / demat statement',
  },
  {
    id: 'bs-ncinv-3',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Investments',
    text: 'Verify DP / custodial statement confirming holdings',
  },
  {
    id: 'bs-ncinv-5',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Investments',
    text: 'Verify any permanent diminution / impairment in value',
  },

  // Non-Current Loans & Advances (Security Deposits)
  {
    id: 'bs-ncla-1',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Loans & Advances (Security Deposits)',
    text: 'Obtain schedule of security deposits; verify additions and deletions',
  },
  {
    id: 'bs-ncla-2',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Loans & Advances (Security Deposits)',
    text: 'Check classification Current vs Non-Current on basis of agreements',
  },
  {
    id: 'bs-ncla-4',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Loans & Advances (Security Deposits)',
    text: 'Check allowance for doubtful deposits on inactive / long-standing deposits',
  },

  // Other Financial Assets (NC) — Fixed Deposits > 12 months / Others
  {
    id: 'bs-ofanc-1',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Assets (NC) — Fixed Deposits > 12 months / Others',
    text: 'Obtain FD movement chart with interest working',
  },
  {
    id: 'bs-ofanc-2',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Assets (NC) — Fixed Deposits > 12 months / Others',
    text: 'Verify FD certificates and bank confirmations',
  },
  {
    id: 'bs-ofanc-3',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Assets (NC) — Fixed Deposits > 12 months / Others',
    text: 'Obtain schedule for insurance claims receivable; check allowance if any',
  },

  // Government Grants (NC)
  {
    id: 'bs-ggnc-1',
    tabId: 'balance-sheet',
    subSection: 'Government Grants (NC)',
    text: 'Obtain list of Government Grants; verify acknowledgement letters',
  },
  {
    id: 'bs-ggnc-2',
    tabId: 'balance-sheet',
    subSection: 'Government Grants (NC)',
    text: 'Obtain EPCG licences and supporting documents',
  },

  // Other Non-Current Assets (Prepaid / Capital Advances)
  {
    id: 'bs-onca-1',
    tabId: 'balance-sheet',
    subSection: 'Other Non-Current Assets (Prepaid / Capital Advances)',
    text: 'Obtain and verify Prepaid Expenses schedule; check Current vs NC bifurcation',
  },
  {
    id: 'bs-onca-2',
    tabId: 'balance-sheet',
    subSection: 'Other Non-Current Assets (Prepaid / Capital Advances)',
    text: 'Obtain list of Capital Advances; verify agreements and ageing',
  },
  {
    id: 'bs-onca-3',
    tabId: 'balance-sheet',
    subSection: 'Other Non-Current Assets (Prepaid / Capital Advances)',
    text: 'Check movement and status of capital advances — any impairment needed?',
  },

  // Inventories
  {
    id: 'bs-inv-2',
    tabId: 'balance-sheet',
    subSection: 'Inventories',
    text: 'Perform Cost vs NRV testing',
  },
  {
    id: 'bs-inv-3',
    tabId: 'balance-sheet',
    subSection: 'Inventories',
    text: 'Obtain and verify physical verification report; check differences',
  },
  {
    id: 'bs-inv-4',
    tabId: 'balance-sheet',
    subSection: 'Inventories',
    text: 'Obtain confirmations from inventory held at third-party locations',
  },
  {
    id: 'bs-inv-5',
    tabId: 'balance-sheet',
    subSection: 'Inventories',
    text: 'Obtain inventory ageing; check provision for slow-moving / obsolete items',
  },
  {
    id: 'bs-inv-6',
    tabId: 'balance-sheet',
    subSection: 'Inventories',
    text: 'Obtain schedule for stores, spares and consumables',
  },
  {
    id: 'bs-inv-7',
    tabId: 'balance-sheet',
    subSection: 'Inventories',
    text: 'Verify roll-backward / roll-forward procedures if physical verification not at year end',
  },

  // Trade Receivables
  {
    id: 'bs-tr-1',
    tabId: 'balance-sheet',
    subSection: 'Trade Receivables',
    text: 'Obtain party-wise ageing schedule (disputed / undisputed)',
  },
  {
    id: 'bs-tr-2',
    tabId: 'balance-sheet',
    subSection: 'Trade Receivables',
    text: 'Float balance confirmations to sample customers (document SA 505 compliance)',
  },
  {
    id: 'bs-tr-3',
    tabId: 'balance-sheet',
    subSection: 'Trade Receivables',
    text: 'Obtain subsequent bank statements; check subsequent clearances',
  },
  {
    id: 'bs-tr-4',
    tabId: 'balance-sheet',
    subSection: 'Trade Receivables',
    text: 'Obtain reconciliation for parties confirming balance differences',
  },

  // Cash & Cash Equivalents
  {
    id: 'bs-cash-1',
    tabId: 'balance-sheet',
    subSection: 'Cash & Cash Equivalents',
    text: 'Obtain list of all bank accounts; obtain bank statements for the year',
  },
  {
    id: 'bs-cash-2',
    tabId: 'balance-sheet',
    subSection: 'Cash & Cash Equivalents',
    text: 'Obtain Bank Reconciliation Statement for year end; check long-pending items',
  },
  {
    id: 'bs-cash-3',
    tabId: 'balance-sheet',
    subSection: 'Cash & Cash Equivalents',
    text: 'Float direct bank balance confirmations; receive confirmations',
  },
  {
    id: 'bs-cash-4',
    tabId: 'balance-sheet',
    subSection: 'Cash & Cash Equivalents',
    text: 'Physically verify cash on hand; obtain cash certificate from management',
  },
  {
    id: 'bs-cash-5',
    tabId: 'balance-sheet',
    subSection: 'Cash & Cash Equivalents',
    text: 'Verify FD certificates (upto 12 months maturity) and interest working',
  },

  // Current Loans & Advances (Security Deposit — Current)
  {
    id: 'bs-cla-1',
    tabId: 'balance-sheet',
    subSection: 'Current Loans & Advances (Security Deposit — Current)',
    text: 'Obtain schedule; verify additions and deletions on sample basis',
  },
  {
    id: 'bs-cla-2',
    tabId: 'balance-sheet',
    subSection: 'Current Loans & Advances (Security Deposit — Current)',
    text: 'Verify Current vs Non-Current classification per agreements',
  },
  {
    id: 'bs-cla-3',
    tabId: 'balance-sheet',
    subSection: 'Current Loans & Advances (Security Deposit — Current)',
    text: 'Obtain balance confirmations from sample parties',
  },

  // Other Current Assets
  {
    id: 'bs-oca-1',
    tabId: 'balance-sheet',
    subSection: 'Other Current Assets',
    text: 'Obtain and verify Prepaid Expenses schedule; verify sample agreements',
  },
  {
    id: 'bs-oca-3',
    tabId: 'balance-sheet',
    subSection: 'Other Current Assets',
    text: 'Obtain challans for Advance Custom Duty; map with purchase register',
  },
  {
    id: 'bs-oca-4',
    tabId: 'balance-sheet',
    subSection: 'Other Current Assets',
    text: 'Verify EDD Recoverable from customs portal; map with purchases',
  },
  {
    id: 'bs-oca-5',
    tabId: 'balance-sheet',
    subSection: 'Other Current Assets',
    text: 'Obtain list of Imprest Advances; check ageing and confirm from employees',
  },
  {
    id: 'bs-oca-6',
    tabId: 'balance-sheet',
    subSection: 'Other Current Assets',
    text: 'Obtain list of Advance to Suppliers; check ageing and allowance for doubtful advances',
  },

  // Equity Share Capital / Partners' Capital
  {
    id: 'bs-eq-2',
    tabId: 'balance-sheet',
    subSection: "Equity Share Capital / Partners' Capital",
    text: 'Obtain list of shareholders / partners as at year end',
  },
  {
    id: 'bs-eq-3',
    tabId: 'balance-sheet',
    subSection: "Equity Share Capital / Partners' Capital",
    text: 'Obtain and verify direct confirmation from shareholders / partners',
  },
  {
    id: 'bs-eq-4',
    tabId: 'balance-sheet',
    subSection: "Equity Share Capital / Partners' Capital",
    text: 'Trace movements in capital during the year; verify supporting documents',
  },

  // Other Equity / Reserves & Surplus
  {
    id: 'bs-oeq-1',
    tabId: 'balance-sheet',
    subSection: 'Other Equity / Reserves & Surplus',
    text: 'Verify retained earnings / P&L balance with prior year financial statements',
  },
  {
    id: 'bs-oeq-2',
    tabId: 'balance-sheet',
    subSection: 'Other Equity / Reserves & Surplus',
    text: 'Check correct transfer of current year profit / loss',
  },
  {
    id: 'bs-oeq-3',
    tabId: 'balance-sheet',
    subSection: 'Other Equity / Reserves & Surplus',
    text: 'Verify impact of buyback, reissue of shares, revaluation reserve if any',
  },
  {
    id: 'bs-oeq-5',
    tabId: 'balance-sheet',
    subSection: 'Other Equity / Reserves & Surplus',
    text: 'Verify other reserves movement — Capital Redemption Reserve, Securities Premium etc.',
  },

  // Long-Term Borrowings
  {
    id: 'bs-ltb-1',
    tabId: 'balance-sheet',
    subSection: 'Long-Term Borrowings',
    text: 'Obtain sanction letters and loan agreements for all outstanding borrowings',
  },
  {
    id: 'bs-ltb-2',
    tabId: 'balance-sheet',
    subSection: 'Long-Term Borrowings',
    text: 'Obtain balance confirmation from banks / lenders as at year end',
  },
  {
    id: 'bs-ltb-3',
    tabId: 'balance-sheet',
    subSection: 'Long-Term Borrowings',
    text: 'Obtain loan repayment schedule; verify principal repaid from bank statements',
  },
  {
    id: 'bs-ltb-4',
    tabId: 'balance-sheet',
    subSection: 'Long-Term Borrowings',
    text: 'Verify interest accrued working; map with loan agreements',
  },
  {
    id: 'bs-ltb-5',
    tabId: 'balance-sheet',
    subSection: 'Long-Term Borrowings',
    text: 'Check borrowing utilisation — verify purpose as per sanction letter',
  },
  {
    id: 'bs-ltb-6',
    tabId: 'balance-sheet',
    subSection: 'Long-Term Borrowings',
    text: 'Check stock statements / other returns submitted to banks are in agreement with books',
  },
  {
    id: 'bs-ltb-8',
    tabId: 'balance-sheet',
    subSection: 'Long-Term Borrowings',
    text: 'Check Current vs Non-Current classification of borrowings',
  },

  // Lease Liability (Non-Current)
  {
    id: 'bs-llnc-2',
    tabId: 'balance-sheet',
    subSection: 'Lease Liability (Non-Current)',
    text: 'Obtain lease agreements; verify lease terms, rent escalation and options',
  },
  {
    id: 'bs-llnc-4',
    tabId: 'balance-sheet',
    subSection: 'Lease Liability (Non-Current)',
    text: 'Check correct bifurcation between Current and Non-Current lease liability',
  },

  // Deferred Grant (Non-Current)
  {
    id: 'bs-dgnc-1',
    tabId: 'balance-sheet',
    subSection: 'Deferred Grant (Non-Current)',
    text: 'Obtain schedule for Government Grants; verify active EPCG licences',
  },
  {
    id: 'bs-dgnc-2',
    tabId: 'balance-sheet',
    subSection: 'Deferred Grant (Non-Current)',
    text: 'Obtain closure letters for licences closed during year',
  },
  {
    id: 'bs-dgnc-3',
    tabId: 'balance-sheet',
    subSection: 'Deferred Grant (Non-Current)',
    text: 'Verify deferred grant derecognised against assets destroyed / disposed',
  },
  {
    id: 'bs-dgnc-4',
    tabId: 'balance-sheet',
    subSection: 'Deferred Grant (Non-Current)',
    text: 'Verify interest and duty computation from customs department for lapsed licences',
  },

  // Non-Current Provisions
  {
    id: 'bs-ncprov-3',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Provisions',
    text: 'Obtain decommissioning / site restoration working; verify unwinding of provision',
  },
  {
    id: 'bs-ncprov-4',
    tabId: 'balance-sheet',
    subSection: 'Non-Current Provisions',
    text: 'Verify Current vs Non-Current split of provisions',
  },

  // Short-Term Borrowings / Current Maturities of Long-Term Debt
  {
    id: 'bs-stb-1',
    tabId: 'balance-sheet',
    subSection: 'Short-Term Borrowings / Current Maturities of Long-Term Debt',
    text: 'Obtain sanction letters; verify outstanding balance from bank statement / confirmation',
  },
  {
    id: 'bs-stb-2',
    tabId: 'balance-sheet',
    subSection: 'Short-Term Borrowings / Current Maturities of Long-Term Debt',
    text: 'Check stock statement submitted to bank is in agreement with books',
  },
  {
    id: 'bs-stb-3',
    tabId: 'balance-sheet',
    subSection: 'Short-Term Borrowings / Current Maturities of Long-Term Debt',
    text: 'Verify interest accrued but not due on borrowings',
  },

  // Trade Payables
  {
    id: 'bs-tp-1',
    tabId: 'balance-sheet',
    subSection: 'Trade Payables',
    text: 'Obtain party-wise list of creditors with ageing (disputed / undisputed)',
  },
  {
    id: 'bs-tp-2',
    tabId: 'balance-sheet',
    subSection: 'Trade Payables',
    text: 'Obtain vendor-wise list of open invoices',
  },
  {
    id: 'bs-tp-3',
    tabId: 'balance-sheet',
    subSection: 'Trade Payables',
    text: 'Float balance confirmations to sample vendors (SA 505 compliance)',
  },
  {
    id: 'bs-tp-4',
    tabId: 'balance-sheet',
    subSection: 'Trade Payables',
    text: 'Verify subsequent payments from April bank statement',
  },

  // Other Financial Liabilities (Current)
  {
    id: 'bs-oflc-1',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Liabilities (Current)',
    text: 'Verify employee benefits payable — obtain employee-wise schedule for salary payable',
  },
  {
    id: 'bs-oflc-2',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Liabilities (Current)',
    text: 'Check pending Full & Final settlements if any',
  },
  {
    id: 'bs-oflc-3',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Liabilities (Current)',
    text: 'Obtain PO / agreements for capital creditors to verify capital nature',
  },
  {
    id: 'bs-oflc-4',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Liabilities (Current)',
    text: 'Obtain balance confirmation for capital creditors (related parties separately)',
  },
  {
    id: 'bs-oflc-5',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Liabilities (Current)',
    text: 'Obtain active forward contracts; verify MTM liability working from bank',
  },
  {
    id: 'bs-oflc-6',
    tabId: 'balance-sheet',
    subSection: 'Other Financial Liabilities (Current)',
    text: 'Reperform MTM computation as per industry standard rates',
  },

  // Provisions (Current)
  {
    id: 'bs-cprov-2',
    tabId: 'balance-sheet',
    subSection: 'Provisions (Current)',
    text: 'Obtain details of expense provisions — verify authorisation and estimates',
  },
  {
    id: 'bs-cprov-3',
    tabId: 'balance-sheet',
    subSection: 'Provisions (Current)',
    text: 'Verify provision for Income Tax (current year) computation',
  },

  // Other Current Liabilities
  {
    id: 'bs-ocl-4',
    tabId: 'balance-sheet',
    subSection: 'Other Current Liabilities',
    text: 'Obtain list of customers from whom advances received; verify ageing',
  },
  {
    id: 'bs-ocl-5',
    tabId: 'balance-sheet',
    subSection: 'Other Current Liabilities',
    text: 'Verify distributor scheme provision with approvals and calculations',
  },

  // =========================================================================
  // 2. PROFIT AND LOSS
  // =========================================================================

  // Revenue from Operations
  {
    id: 'pl-rev-1',
    tabId: 'profit-and-loss',
    subSection: 'Revenue from Operations',
    text: 'Perform sales walkthrough; test operating effectiveness of controls',
  },
  {
    id: 'pl-rev-2',
    tabId: 'profit-and-loss',
    subSection: 'Revenue from Operations',
    text: 'Substantive testing on sample invoices — verify with delivery challans, e-way bills',
  },
  {
    id: 'pl-rev-3',
    tabId: 'profit-and-loss',
    subSection: 'Revenue from Operations',
    text: 'Perform sales analytical (month-wise, product-wise, segment-wise YoY)',
  },
  {
    id: 'pl-rev-4',
    tabId: 'profit-and-loss',
    subSection: 'Revenue from Operations',
    text: 'Perform cut-off testing — verify invoices raised just before and after year end',
  },
  {
    id: 'pl-rev-6',
    tabId: 'profit-and-loss',
    subSection: 'Revenue from Operations',
    text: 'Perform test of details for Other Operating Revenue (scrap, export incentives etc.)',
  },
  {
    id: 'pl-rev-8',
    tabId: 'profit-and-loss',
    subSection: 'Revenue from Operations',
    text: 'Check sequence of invoice series; identify cancelled invoices',
  },

  // Other Income
  {
    id: 'pl-oi-2',
    tabId: 'profit-and-loss',
    subSection: 'Other Income',
    text: 'Verify interest on Income Tax Refund from refund order and bank statement',
  },
  {
    id: 'pl-oi-3',
    tabId: 'profit-and-loss',
    subSection: 'Other Income',
    text: 'Obtain forex fluctuation working; verify gain computation',
  },
  {
    id: 'pl-oi-5',
    tabId: 'profit-and-loss',
    subSection: 'Other Income',
    text: 'Obtain and verify ECL written-back working',
  },
  {
    id: 'pl-oi-6',
    tabId: 'profit-and-loss',
    subSection: 'Other Income',
    text: 'Verify dividend income — accrual on establishment of right to receive',
  },
  {
    id: 'pl-oi-7',
    tabId: 'profit-and-loss',
    subSection: 'Other Income',
    text: 'Substantive testing for miscellaneous income items',
  },

  // Cost of Materials Consumed / Purchase of Stock-in-Trade
  {
    id: 'pl-cogs-1',
    tabId: 'profit-and-loss',
    subSection: 'Cost of Materials Consumed / Purchase of Stock-in-Trade',
    text: 'Substantive testing of purchase invoices',
  },
  {
    id: 'pl-cogs-2',
    tabId: 'profit-and-loss',
    subSection: 'Cost of Materials Consumed / Purchase of Stock-in-Trade',
    text: 'Test of Controls on purchase process',
  },
  {
    id: 'pl-cogs-3',
    tabId: 'profit-and-loss',
    subSection: 'Cost of Materials Consumed / Purchase of Stock-in-Trade',
    text: 'Perform purchase cut-off testing',
  },
  {
    id: 'pl-cogs-4',
    tabId: 'profit-and-loss',
    subSection: 'Cost of Materials Consumed / Purchase of Stock-in-Trade',
    text: 'Reconcile purchase register with books of account',
  },
  {
    id: 'pl-cogs-5',
    tabId: 'profit-and-loss',
    subSection: 'Cost of Materials Consumed / Purchase of Stock-in-Trade',
    text: 'Reconcile Import purchases with BOE summary from ICEGATE',
  },
  {
    id: 'pl-cogs-7',
    tabId: 'profit-and-loss',
    subSection: 'Cost of Materials Consumed / Purchase of Stock-in-Trade',
    text: 'Verify inventory destroyed / written off — check insurance claim filed',
  },

  // Changes in Inventories
  {
    id: 'pl-chg-1',
    tabId: 'profit-and-loss',
    subSection: 'Changes in Inventories',
    text: 'Reconcile opening and closing stock with Balance Sheet inventory figures',
  },
  {
    id: 'pl-chg-2',
    tabId: 'profit-and-loss',
    subSection: 'Changes in Inventories',
    text: 'Cross-refer to Inventory caption work in Balance Sheet section',
  },
  {
    id: 'pl-chg-3',
    tabId: 'profit-and-loss',
    subSection: 'Changes in Inventories',
    text: 'Verify WIP, Finished Goods and SIT movement schedule',
  },

  // Employee Benefit Expenses
  {
    id: 'pl-emp-1',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Obtain summary of monthly salary sheets; verify CTC structure',
  },
  {
    id: 'pl-emp-2',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Verify salary of sample employees from appointment letters',
  },
  {
    id: 'pl-emp-3',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Perform file testing for new joiners and leavers during the year',
  },
  {
    id: 'pl-emp-4',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Send confirmation mails to sample employees (ghost employee check)',
  },
  {
    id: 'pl-emp-5',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Verify bonus / ex-gratia — check management approval',
  },
  {
    id: 'pl-emp-6',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Obtain expat computation and verify from debit notes of parent company',
  },
  {
    id: 'pl-emp-7',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Verify contract manpower invoices and contractor agreements on sample basis',
  },
  {
    id: 'pl-emp-9',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Verify actuarial report for Gratuity and Leave Encashment (refer Provisions)',
  },
  {
    id: 'pl-emp-10',
    tabId: 'profit-and-loss',
    subSection: 'Employee Benefit Expenses',
    text: 'Substantive testing for Staff Welfare Expenses',
  },

  // Depreciation & Amortisation
  {
    id: 'pl-dep-1',
    tabId: 'profit-and-loss',
    subSection: 'Depreciation & Amortisation',
    text: 'Obtain PPE Register; verify useful life and residual value',
  },
  {
    id: 'pl-dep-2',
    tabId: 'profit-and-loss',
    subSection: 'Depreciation & Amortisation',
    text: 'Reperform depreciation computation for accuracy',
  },
  {
    id: 'pl-dep-3',
    tabId: 'profit-and-loss',
    subSection: 'Depreciation & Amortisation',
    text: 'Verify amortisation of leasehold land / intangibles',
  },

  // Finance Costs
  {
    id: 'pl-fin-1',
    tabId: 'profit-and-loss',
    subSection: 'Finance Costs',
    text: 'Obtain and verify interest schedule; reperform calculations',
  },
  {
    id: 'pl-fin-2',
    tabId: 'profit-and-loss',
    subSection: 'Finance Costs',
    text: 'Verify interest rates from sanction letters / bank advice',
  },
  {
    id: 'pl-fin-4',
    tabId: 'profit-and-loss',
    subSection: 'Finance Costs',
    text: 'Verify unwinding of discount on decommissioning provision',
  },
  {
    id: 'pl-fin-6',
    tabId: 'profit-and-loss',
    subSection: 'Finance Costs',
    text: 'Obtain forex fluctuation working; verify exchange differences on borrowings',
  },

  // Other Expenses
  {
    id: 'pl-oe-1',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Select sample vouchers; verify invoices, authorisation, TDS compliance',
  },
  {
    id: 'pl-oe-2',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Analytical review on major heads — Power & Fuel, Repairs, Rent, Travelling',
  },
  {
    id: 'pl-oe-4',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Verify Royalty — obtain original agreement; check computation against sales',
  },
  {
    id: 'pl-oe-5',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Obtain Legal & Professional schedule; verify statutory audit / internal audit fees with proposals',
  },
  {
    id: 'pl-oe-6',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Check Legal case confirmation from legal vendors',
  },
  {
    id: 'pl-oe-7',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Verify Insurance — check from insurance policies; ensure pre-paid portion separated',
  },
  {
    id: 'pl-oe-8',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Obtain Selling & Distribution analytical — verify monthly provision vs actuals',
  },
  {
    id: 'pl-oe-9',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Verify Freight — obtain allocation sheets; test sample with invoices',
  },
  {
    id: 'pl-oe-11',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Verify EPCG Custom Duty computation from customs department',
  },
  {
    id: 'pl-oe-12',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Verify Loss on Sale of PPE — obtain disposal documents and sale invoices',
  },
  {
    id: 'pl-oe-13',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Verify MTM Loss on Derivatives — obtain forward contract notes and bank MTM calculations',
  },
  {
    id: 'pl-oe-14',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Verify Miscellaneous Expenses — substantive testing on sample',
  },
  {
    id: 'pl-oe-15',
    tabId: 'profit-and-loss',
    subSection: 'Other Expenses',
    text: 'Ensure capital expenditure not incorrectly charged to revenue',
  },

  // Exceptional Items
  {
    id: 'pl-exc-1',
    tabId: 'profit-and-loss',
    subSection: 'Exceptional Items / Prior Period Items',
    text: 'Obtain detailed breakup of exceptional items; verify materiality and non-recurring nature',
  },
  {
    id: 'pl-exc-2',
    tabId: 'profit-and-loss',
    subSection: 'Exceptional Items / Prior Period Items',
    text: 'Substantive testing for exceptional items booked',
  },
  {
    id: 'pl-exc-3',
    tabId: 'profit-and-loss',
    subSection: 'Exceptional Items / Prior Period Items',
    text: 'Verify appropriate disclosure in financial statements',
  },

  // Taxes (Current & Deferred)
  {
    id: 'pl-tax-1',
    tabId: 'profit-and-loss',
    subSection: 'Taxes (Current & Deferred)',
    text: 'Verify current tax computation with tax returns / advance tax challan',
  },
  {
    id: 'pl-tax-2',
    tabId: 'profit-and-loss',
    subSection: 'Taxes (Current & Deferred)',
    text: 'Reconcile book profit vs taxable income (key differences)',
  },
  {
    id: 'pl-tax-3',
    tabId: 'profit-and-loss',
    subSection: 'Taxes (Current & Deferred)',
    text: 'Verify deferred tax working (refer DTA/DTL in Balance Sheet section)',
  },
  {
    id: 'pl-tax-4',
    tabId: 'profit-and-loss',
    subSection: 'Taxes (Current & Deferred)',
    text: 'Check correct recognition of prior year excess / short provision',
  },

  // =========================================================================
  // 3. ACCOUNTING STANDARD COMPLIANCE
  // =========================================================================

  // Leases (Ind AS 116 / AS 19)
  {
    id: 'as-lease-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Obtain ROU Asset working as per Ind AS 116; verify accuracy',
  },
  {
    id: 'as-lease-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Obtain and recompute Ind AS 116 / AS 19 lease liability working',
  },
  {
    id: 'as-lease-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Verify discount rate used for PV computation',
  },
  {
    id: 'as-lease-4',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Verify ROU Asset computation and depreciation',
  },
  {
    id: 'as-lease-5',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Obtain and recompute Current Lease Liability as per Ind AS 116',
  },
  {
    id: 'as-lease-6',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Verify ROU Asset depreciation per Ind AS 116 working',
  },
  {
    id: 'as-lease-7',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Obtain and verify Ind AS 116 interest on Lease Liability',
  },
  {
    id: 'as-lease-8',
    tabId: 'accounting-standard-compliance',
    subSection: 'Leases (Ind AS 116 / AS 19)',
    text: 'Verify Rent expenses — check agreements; test Ind AS 116 short-term / low-value exclusions',
  },

  // Recognition, Measurement & Valuation Standards
  {
    id: 'as-val-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Check valuation as per AS 13 / Ind AS 109 / Ind AS 28',
  },
  {
    id: 'as-val-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Verify Ind AS 109 / AS 30 discounting working for security deposits',
  },
  {
    id: 'as-val-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Verify treatment as per AS 12 / Ind AS 20',
  },
  {
    id: 'as-val-4',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Check valuation — Weighted Average / FIFO as per accounting policy (AS 2 / Ind AS 2)',
  },
  {
    id: 'as-val-5',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Verify ECL / provision for doubtful debts working (Ind AS 109 / AS 36)',
  },
  {
    id: 'as-val-6',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Check ESOP accounting as per Ind AS 102 / Guidance Note if applicable',
  },
  {
    id: 'as-val-7',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Verify revenue recognition criteria as per Ind AS 115 / AS 9 — performance obligations, transaction price etc.',
  },
  {
    id: 'as-val-8',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Verify Ind AS 109 / EIR working for interest income on financial assets',
  },
  {
    id: 'as-val-9',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Verify Government Grant income as per Ind AS 20 / AS 12 — match with deferred grant schedule',
  },
  {
    id: 'as-val-10',
    tabId: 'accounting-standard-compliance',
    subSection: 'Recognition, Measurement & Valuation (AS / Ind AS)',
    text: 'Obtain ECL provision working; verify as per Ind AS 109',
  },

  // Employee Benefits & Actuarial Valuation (AS 15 / Ind AS 19)
  {
    id: 'as-emp-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Employee Benefits & Actuarial Valuation (AS 15 / Ind AS 19)',
    text: 'Obtain actuarial valuation report for Gratuity and Leave Encashment',
  },
  {
    id: 'as-emp-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Employee Benefits & Actuarial Valuation (AS 15 / Ind AS 19)',
    text: 'Verify data sent to actuary; check assumptions (discount rate, salary escalation, mortality)',
  },
  {
    id: 'as-emp-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Employee Benefits & Actuarial Valuation (AS 15 / Ind AS 19)',
    text: 'Obtain actuarial report for current portion of Gratuity and Leave Encashment',
  },

  // Deferred Taxes (AS 22 / Ind AS 12)
  {
    id: 'as-dtl-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Deferred Tax Liability / Asset (AS 22 / Ind AS 12)',
    text: 'Obtain DTL/DTA computation; verify book value vs tax base of major items',
  },
  {
    id: 'as-dtl-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Deferred Tax Liability / Asset (AS 22 / Ind AS 12)',
    text: 'Check timing / temporary differences — depreciation, provisions, lease etc.',
  },
  {
    id: 'as-dtl-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Deferred Tax Liability / Asset (AS 22 / Ind AS 12)',
    text: 'Verify recognition of DTA — check probability of future taxable profits',
  },
  {
    id: 'as-dtl-4',
    tabId: 'accounting-standard-compliance',
    subSection: 'Deferred Tax Liability / Asset (AS 22 / Ind AS 12)',
    text: 'Verify correct recognition in P&L vs OCI',
  },

  // Prior Period Errors & Other Comprehensive Income (AS 5 / Ind AS 8 / Ind AS 1)
  {
    id: 'as-oci-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Prior Period Items & Other Comprehensive Income (OCI)',
    text: 'Check prior period errors — verify correct treatment as per AS 5 / Ind AS 8',
  },
  {
    id: 'as-oci-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Prior Period Items & Other Comprehensive Income (OCI)',
    text: 'Verify actuarial gains/losses on defined benefit plans from actuarial report',
  },
  {
    id: 'as-oci-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Prior Period Items & Other Comprehensive Income (OCI)',
    text: 'Verify fair value changes on equity instruments through OCI',
  },
  {
    id: 'as-oci-4',
    tabId: 'accounting-standard-compliance',
    subSection: 'Prior Period Items & Other Comprehensive Income (OCI)',
    text: 'Check tax impact on OCI items',
  },

  // Related Party Transactions (AS 18 / Ind AS 24)
  {
    id: 'as-rpt-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Related Party Transactions (AS 18 / Ind AS 24)',
    text: 'Obtain complete list of related parties from management',
  },
  {
    id: 'as-rpt-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Related Party Transactions (AS 18 / Ind AS 24)',
    text: 'Verify completeness of related party list with MCA data, shareholding etc.',
  },
  {
    id: 'as-rpt-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Related Party Transactions (AS 18 / Ind AS 24)',
    text: 'Obtain transaction-wise listing of all related party transactions during year',
  },
  {
    id: 'as-rpt-4',
    tabId: 'accounting-standard-compliance',
    subSection: 'Related Party Transactions (AS 18 / Ind AS 24)',
    text: 'Check approval from Board / Audit Committee for RPTs',
  },
  {
    id: 'as-rpt-5',
    tabId: 'accounting-standard-compliance',
    subSection: 'Related Party Transactions (AS 18 / Ind AS 24)',
    text: "Verify pricing of RPTs — check arm's length / transfer pricing documentation",
  },
  {
    id: 'as-rpt-6',
    tabId: 'accounting-standard-compliance',
    subSection: 'Related Party Transactions (AS 18 / Ind AS 24)',
    text: 'Verify disclosures in Notes to Accounts as per Schedule III',
  },

  // Contingent Liabilities & Commitments (AS 29 / Ind AS 37)
  {
    id: 'as-cl-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Contingent Liabilities & Commitments (AS 29 / Ind AS 37)',
    text: 'Obtain list of pending litigations (Income Tax, GST, Civil, Labour)',
  },
  {
    id: 'as-cl-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Contingent Liabilities & Commitments (AS 29 / Ind AS 37)',
    text: 'Obtain management representation on contingent liabilities',
  },
  {
    id: 'as-cl-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Contingent Liabilities & Commitments (AS 29 / Ind AS 37)',
    text: 'Obtain legal opinion / external counsel confirmation for significant matters',
  },
  {
    id: 'as-cl-4',
    tabId: 'accounting-standard-compliance',
    subSection: 'Contingent Liabilities & Commitments (AS 29 / Ind AS 37)',
    text: 'Verify capital commitments — check contracts signed but work not started',
  },
  {
    id: 'as-cl-5',
    tabId: 'accounting-standard-compliance',
    subSection: 'Contingent Liabilities & Commitments (AS 29 / Ind AS 37)',
    text: 'Check disclosure adequacy in Notes to Accounts',
  },

  // Going Concern Assessment
  {
    id: 'as-gc-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Going Concern Assessment (AS 1 / Ind AS 1 / SA 570)',
    text: 'Review latest financial data — net worth, cash flows, profitability trend',
  },
  {
    id: 'as-gc-2',
    tabId: 'accounting-standard-compliance',
    subSection: 'Going Concern Assessment (AS 1 / Ind AS 1 / SA 570)',
    text: 'Identify indicators of going concern doubt (negative net worth, default in loans etc.)',
  },
  {
    id: 'as-gc-3',
    tabId: 'accounting-standard-compliance',
    subSection: 'Going Concern Assessment (AS 1 / Ind AS 1 / SA 570)',
    text: "Obtain management's assessment and future business plan if applicable",
  },
  {
    id: 'as-gc-4',
    tabId: 'accounting-standard-compliance',
    subSection: 'Going Concern Assessment (AS 1 / Ind AS 1 / SA 570)',
    text: 'Verify adequacy of disclosures in financial statements',
  },

  // Accounting Policies & Analytical Notes
  {
    id: 'as-pol-1',
    tabId: 'accounting-standard-compliance',
    subSection: 'Accounting Policies & Segment Reporting',
    text: 'Check analytical notes — revenue recognition policy, segment reporting etc.',
  },

  // =========================================================================
  // 4. GST COMPLIANCE
  // =========================================================================
  {
    id: 'gst-1',
    tabId: 'gst-compliance',
    subSection: 'Input Tax Credit (GSTR-2B / 2A)',
    text: 'Reconcile GST Input with GSTR-2B / 2A; obtain reasons for differences',
  },
  {
    id: 'gst-2',
    tabId: 'gst-compliance',
    subSection: 'Input Tax Credit (GSTR-2B / 2A)',
    text: 'Reconcile purchase register with GST portal (GSTR-2B / ITC ledger)',
  },
  {
    id: 'gst-3',
    tabId: 'gst-compliance',
    subSection: 'Outward Liability & Returns (GSTR-1 / GSTR-3B)',
    text: 'Reconcile GST Output Liability with sales register (GSTR-1 vs books)',
  },
  {
    id: 'gst-4',
    tabId: 'gst-compliance',
    subSection: 'Outward Liability & Returns (GSTR-1 / GSTR-3B)',
    text: 'Map sales with GST outward liability; reconcile GSTR-3B vs books',
  },
  {
    id: 'gst-5',
    tabId: 'gst-compliance',
    subSection: 'Indirect Tax & Export Receivables',
    text: 'Verify statutory receivables — VAT / Tax Receivable from Exports etc.',
  },

  // =========================================================================
  // 5. OTHER COMPLIANCES
  // =========================================================================

  // Income Tax & TDS Compliance
  {
    id: 'oth-it-1',
    tabId: 'other-compliances',
    subSection: 'Income Tax & TDS Compliances',
    text: 'Obtain Form 26AS; reconcile with books of account',
  },
  {
    id: 'oth-it-2',
    tabId: 'other-compliances',
    subSection: 'Income Tax & TDS Compliances',
    text: 'Map refunds from refund orders / tax portal; reconcile with books',
  },
  {
    id: 'oth-it-3',
    tabId: 'other-compliances',
    subSection: 'Income Tax & TDS Compliances',
    text: 'Verify demand / refund status on Income Tax portal',
  },
  {
    id: 'oth-it-4',
    tabId: 'other-compliances',
    subSection: 'Income Tax & TDS Compliances',
    text: 'Check and verify TDS returns and challans; reconcile with books',
  },

  // Statutory & Labour Dues Compliance
  {
    id: 'oth-lab-1',
    tabId: 'other-compliances',
    subSection: 'Statutory & Labour Dues (PF, ESIC, PT, LWF)',
    text: 'Check PF, ESIC, PT, LWF returns and challans; reconcile dues with books',
  },
  {
    id: 'oth-lab-2',
    tabId: 'other-compliances',
    subSection: 'Statutory & Labour Dues (PF, ESIC, PT, LWF)',
    text: 'Reconcile statutory dues (PF, ESIC, PT) as per salary sheets with books',
  },
  {
    id: 'oth-lab-3',
    tabId: 'other-compliances',
    subSection: 'Statutory & Labour Dues (PF, ESIC, PT, LWF)',
    text: 'Check all statutory dues deposited within statutory timelines',
  },

  // MSME & Section 43B(h) Compliance
  {
    id: 'oth-msme-1',
    tabId: 'other-compliances',
    subSection: 'MSME Act & Section 43B(h) Compliances',
    text: 'Check MSME-related receivables classification if applicable',
  },
  {
    id: 'oth-msme-2',
    tabId: 'other-compliances',
    subSection: 'MSME Act & Section 43B(h) Compliances',
    text: 'Identify MSME parties; verify 43B(h) disallowance for delayed payment',
  },
  {
    id: 'oth-msme-3',
    tabId: 'other-compliances',
    subSection: 'MSME Act & Section 43B(h) Compliances',
    text: 'Obtain MSME interest computation working',
  },
  {
    id: 'oth-msme-4',
    tabId: 'other-compliances',
    subSection: 'MSME Act & Section 43B(h) Compliances',
    text: 'Obtain MSME interest computation; verify 43B(h) compliance',
  },
  {
    id: 'oth-msme-5',
    tabId: 'other-compliances',
    subSection: 'MSME Act & Section 43B(h) Compliances',
    text: 'Check compliance with MSME disclosure requirements in Trade Payables note',
  },

  // MCA / ROC & Companies Act Filings
  {
    id: 'oth-roc-1',
    tabId: 'other-compliances',
    subSection: 'MCA / ROC Filings & Charge Registration',
    text: 'Verify authorised and issued capital from MCA master data / Registration Certificate',
  },
  {
    id: 'oth-roc-2',
    tabId: 'other-compliances',
    subSection: 'MCA / ROC Filings & Charge Registration',
    text: 'Check statutory forms (PAS-3 / SH-7) for capital changes',
  },
  {
    id: 'oth-roc-3',
    tabId: 'other-compliances',
    subSection: 'MCA / ROC Filings & Charge Registration',
    text: 'Verify charge registration with ROC within statutory timelines',
  },
  {
    id: 'oth-roc-4',
    tabId: 'other-compliances',
    subSection: 'MCA / ROC Filings & Charge Registration',
    text: 'Check charge registration with ROC',
  },

  // CARO 2020 Reporting (Companies only)
  {
    id: 'oth-caro-0',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Check CARO disclosures for PPE (if applicable)',
  },
  {
    id: 'oth-caro-1',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(i) — PPE: physical verification, title deeds, revaluation',
  },
  {
    id: 'oth-caro-2',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(ii) — Inventories: physical verification frequency',
  },
  {
    id: 'oth-caro-3',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(iii) — Loans granted; verify interest/principal receipt',
  },
  {
    id: 'oth-caro-4',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(vi) — Cost records maintenance',
  },
  {
    id: 'oth-caro-5',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(vii) — Statutory dues — disputed amounts',
  },
  {
    id: 'oth-caro-6',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(viii) — Unrecorded income surrendered under any scheme',
  },
  {
    id: 'oth-caro-7',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(xiv) — Internal audit — check appointment and reports',
  },
  {
    id: 'oth-caro-8',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(xv) — Non-cash transactions with directors',
  },
  {
    id: 'oth-caro-9',
    tabId: 'other-compliances',
    subSection: 'CARO 2020 Reporting (Companies only)',
    text: 'Verify CARO clause 3(xx) — CSR compliance (if applicable)',
  },

  // Disclosure Checklist — Schedule III / Reporting Framework
  {
    id: 'oth-sch3-1',
    tabId: 'other-compliances',
    subSection: 'Schedule III & Statutory Disclosures',
    text: 'Check disclosure of CWIP ageing as per Schedule III amendment',
  },
  {
    id: 'oth-sch3-2',
    tabId: 'other-compliances',
    subSection: 'Schedule III & Statutory Disclosures',
    text: 'Verify disclosures — promoter holding, shares held by HUF etc.',
  },
  {
    id: 'oth-sch3-3',
    tabId: 'other-compliances',
    subSection: 'Schedule III & Statutory Disclosures',
    text: 'Verify all required notes to accounts as per applicable Schedule III',
  },
  {
    id: 'oth-sch3-4',
    tabId: 'other-compliances',
    subSection: 'Schedule III & Statutory Disclosures',
    text: 'Check disclosures for Crypto currency / Virtual Digital Assets if applicable',
  },
  {
    id: 'oth-sch3-5',
    tabId: 'other-compliances',
    subSection: 'Schedule III & Statutory Disclosures',
    text: 'Verify disclosure for borrowings — purpose and utilisation (Sch III amendment)',
  },
  {
    id: 'oth-sch3-6',
    tabId: 'other-compliances',
    subSection: 'Schedule III & Statutory Disclosures',
    text: "Verify 'Ratios' disclosure as per Schedule III amendment (8 ratios) if applicable",
  },
];
