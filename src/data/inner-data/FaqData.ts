interface DataType {
   id: number;
   id_name: string;
   title: string;
   md_pt?:boolean;
   faq: {
      id: number;
      question: string;
      answer: string;
   }[];
}

const inner_faq_data:DataType[] = [
   {
      id: 1,
      id_name: "Selling",
      title: "SELLING",
      md_pt:true,
      faq: [
         {
            id: 1,
            question: "How do I list a premium property with VELMORA?",
            answer: "Submit your property details via our 'List Property' portal or connect with our regional advisory desk. Our team will verify title documents, photograph the residence, and list it to verified buyers.",
         },
         {
            id: 2,
            question: "What documents are required to list a resale property?",
            answer: "Essential documents include the registered Title Deed (Sale Deed), latest Encumbrance Certificate (EC), Khata Certificate, approved building plan, and latest property tax receipts.",
         },
         {
            id: 3,
            question: "How is my property's market valuation determined?",
            answer: "We perform a comparative market analysis (CMA) analyzing recent registered transactions in your locality, current supply, architectural specification, and floor-rise premiums.",
         },
         {
            id: 4,
            question: "What are the brokerage terms for listing with VELMORA?",
            answer: "VELMORA operates on transparent, standard advisory terms upon successful transaction closing and registration. There are no hidden upfront listing fees.",
         },
      ]
   },
   {
      id: 2,
      id_name: "Renting",
      title: "RENTING",
      faq: [
         {
            id: 5,
            question: "What is the standard lease duration for luxury residences in India?",
            answer: "Standard residential leases are executed for 11 months, 24 months, or 36 months, with a standard lock-in period and annual escalation clause (typically 5% to 8%).",
         },
         {
            id: 6,
            question: "Is police verification mandatory for tenants?",
            answer: "Yes, tenant verification and e-registration of the Leave and License agreement with local authorities are standard legal requirements across major Indian cities.",
         },
         {
            id: 7,
            question: "Who handles society maintenance and utility bills?",
            answer: "Society maintenance is typically included or specified separately in the agreement, while individual electricity, water, and internet utilities are paid directly by the tenant.",
         },
         {
            id: 8,
            question: "What is the typical security deposit amount in Indian metros?",
            answer: "Security deposits range from 2 to 6 months' rent depending on the city (e.g., 2-3 months in Delhi NCR/Mumbai, up to 6 months in Bengaluru), fully refundable at lease conclusion.",
         },
      ]
   },
   {
      id: 3,
      id_name: "Buying",
      title: "BUYING",
      faq: [
         {
            id: 9,
            question: "How does RERA protect homebuyers in India?",
            answer: "The Real Estate (Regulation and Development) Act mandates developer accountability, transparent carpet area disclosures, timely possession timelines, and escrow account protections for project funds.",
         },
         {
            id: 10,
            question: "Can Non-Resident Indians (NRIs) purchase property in India?",
            answer: "Yes, NRIs and OCIs can purchase residential and commercial real estate in India under RBI/FEMA regulations without requiring special RBI permissions.",
         },
         {
            id: 11,
            question: "What additional costs should I budget when buying a home?",
            answer: "Key additional costs include state Stamp Duty & Registration charges (typically 5% to 7%), GST on under-construction units (5%), legal verification fees, and club/corpus deposits.",
         },
      ]
   },
   {
      id: 4,
      id_name: "Payments",
      title: "PAYMENTS & FINANCING",
      faq: [
         {
            id: 12,
            question: "What home loan options are available through VELMORA partner banks?",
            answer: "We partner with leading Indian financial institutions (HDFC, ICICI, SBI, Axis) to facilitate competitive interest rates, fast-track sanctions, and NRI home loan processing.",
         },
         {
            id: 13,
            question: "What is the standard payment schedule for under-construction projects?",
            answer: "Payment follows a construction-linked plan (CLP) approved under RERA guidelines, with installments disbursed at key construction milestones like foundation, slab casting, and finishing.",
         },
         {
            id: 14,
            question: "How is Tax Deducted at Source (TDS) handled on property purchases?",
            answer: "For properties valued over ₹50 Lakhs, the buyer is legally required to deduct 1% TDS on the transaction value and deposit it with the government via Form 26QB.",
         },
      ]
   },
   {
      id: 5,
      id_name: "Terms",
      title: "TERMS & VERIFICATION",
      faq: [
         {
            id: 15,
            question: "How does VELMORA verify property listings?",
            answer: "Every listing undergoes document validation including title chain inspection, municipal approval checks, RERA number validation, and physical site verification.",
         },
         {
            id: 16,
            question: "What is the difference between carpet area, built-up area, and super built-up area?",
            answer: "Carpet area is the actual usable floor area within walls. Built-up area includes outer walls and balconies. Super built-up area adds proportionate common areas like lobbies and elevators.",
         },
      ]
   },
   {
      id: 6,
      id_name: "Account",
      title: "ACCOUNT & DASHBOARD",
      faq: [
         {
            id: 17,
            question: "How do I save and compare properties on VELMORA?",
            answer: "Create a free VELMORA account to bookmark favourite residences, compare spatial specifications side-by-side, and receive notifications on new curated launches.",
         },
         {
            id: 18,
            question: "How can property owners manage their listings?",
            answer: "Use the dedicated VELMORA Owner Dashboard to track buyer inquiries, update asking prices, manage media galleries, and schedule physical viewings.",
         },
      ]
   },
]

export default inner_faq_data;