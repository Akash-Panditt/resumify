const express = require('express');
const { protect } = require('../middleware/auth');
const supabase = require('../supabase');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

let aiClient;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

const ACTION_VERBS = {
  'worked': 'spearheaded',
  'helped': 'collaborated',
  'made': 'engineered',
  'built': 'architected',
  'fixed': 'optimized',
  'did': 'executed',
  'used': 'leveraged',
  'good': 'expert',
  'fast': 'efficient'
};

const ENHANCEMENT_PREFIXES = [
  "Successfully",
  "Proven track record of",
  "Expertly",
  "Leveraging industry-standard tools to",
  "Strategically"
];

const mockEnhance = (text, type) => {
  if (!text) return "";
  
  let enhanced = text.trim();
  
  // Replace weak words
  Object.keys(ACTION_VERBS).forEach(weak => {
    const regex = new RegExp(`\\b${weak}\\b`, 'gi');
    enhanced = enhanced.replace(regex, (match) => {
      const strong = ACTION_VERBS[weak.toLowerCase()];
      return match[0] === match[0].toUpperCase() ? strong.charAt(0).toUpperCase() + strong.slice(1) : strong;
    });
  });

  // Capitalize first letter if not already
  enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);

  // Add more professional fluff if it's too short
  if (enhanced.length < 30) {
    const prefix = ENHANCEMENT_PREFIXES[Math.floor(Math.random() * ENHANCEMENT_PREFIXES.length)];
    enhanced = `${prefix} ${enhanced.charAt(0).toLowerCase() + enhanced.slice(1)}`;
  }

  // Ensure it ends with a period
  if (!enhanced.endsWith('.')) enhanced += '.';

  return enhanced;
};

const mockGenerateATSGuide = (jobTitle) => {
  const t = jobTitle.toLowerCase();

  // --- Software / IT ---
  if (t.includes('developer') || t.includes('programmer') || t.includes('software') || t.includes('frontend') || t.includes('backend') || t.includes('fullstack') || t.includes('full stack') || t.includes('web developer')) {
    return { why: `For software roles like "${jobTitle}", ATS systems prioritize specific programming languages, frameworks, and development methodologies.`, keywords: ['JavaScript/TypeScript', 'React/Angular/Vue', 'RESTful APIs', 'Git & CI/CD', 'Agile/Scrum'], actionVerbs: ['Engineered', 'Deployed', 'Refactored'], formattingTip: "List technical skills in a dedicated section using comma-separated plain text — never use icons or progress bars." };
  }
  if (t.includes('data scientist') || t.includes('data analyst') || t.includes('machine learning') || t.includes('ai engineer') || t.includes('data engineer')) {
    return { why: `For data & AI roles like "${jobTitle}", recruiters scan for statistical tools, ML frameworks, and quantifiable business impact.`, keywords: ['Python/R', 'TensorFlow/PyTorch', 'SQL & Data Pipelines', 'Statistical Modeling', 'Data Visualization (Tableau/Power BI)'], actionVerbs: ['Modeled', 'Analyzed', 'Predicted'], formattingTip: "Quantify your impact — e.g., 'Improved prediction accuracy by 15%' — ATS systems rank numerical results highly." };
  }
  if (t.includes('devops') || t.includes('cloud') || t.includes('sre') || t.includes('infrastructure') || t.includes('system admin') || t.includes('sysadmin')) {
    return { why: `For infrastructure roles like "${jobTitle}", ATS algorithms search for cloud certifications, automation tools, and uptime metrics.`, keywords: ['AWS/Azure/GCP', 'Docker & Kubernetes', 'Terraform/Ansible', 'CI/CD Pipelines', 'Monitoring (Prometheus/Grafana)'], actionVerbs: ['Automated', 'Provisioned', 'Scaled'], formattingTip: "Include cloud certifications (AWS SAA, CKA, etc.) prominently — many ATS systems treat certifications as hard keyword matches." };
  }
  if (t.includes('cyber') || t.includes('security') || t.includes('penetration') || t.includes('infosec')) {
    return { why: `For cybersecurity roles like "${jobTitle}", ATS filters prioritize compliance frameworks, threat analysis skills, and industry certifications.`, keywords: ['SIEM Tools', 'Penetration Testing', 'ISO 27001/NIST', 'Incident Response', 'Vulnerability Assessment'], actionVerbs: ['Mitigated', 'Investigated', 'Secured'], formattingTip: "List certifications like CISSP, CEH, or CompTIA Security+ in a separate section — they are high-priority ATS keywords." };
  }

  // --- Engineering (Non-Software) ---
  if (t.includes('civil') || t.includes('structural') || t.includes('construction') || t.includes('site engineer')) {
    return { why: `For civil/construction roles like "${jobTitle}", ATS systems scan for project management tools, building codes knowledge, and site supervision experience.`, keywords: ['AutoCAD/Revit', 'Structural Analysis', 'Project Scheduling (Primavera/MS Project)', 'Building Codes & Compliance', 'Quantity Surveying'], actionVerbs: ['Supervised', 'Designed', 'Inspected'], formattingTip: "Mention specific project values and scales (e.g., '$2M highway bridge project') — quantified scope ranks higher in ATS." };
  }
  if (t.includes('mechanical') || t.includes('manufacturing') || t.includes('production engineer')) {
    return { why: `For mechanical/manufacturing roles like "${jobTitle}", recruiters filter for CAD proficiency, lean methodologies, and quality certifications.`, keywords: ['SolidWorks/CATIA', 'Lean Manufacturing', 'Six Sigma', 'GD&T', 'CNC Machining'], actionVerbs: ['Fabricated', 'Optimized', 'Troubleshot'], formattingTip: "Include Six Sigma belt level (Green/Black) and any ISO certifications — these are hard-match ATS keywords." };
  }
  if (t.includes('electrical') || t.includes('electronics') || t.includes('embedded')) {
    return { why: `For electrical/electronics roles like "${jobTitle}", ATS systems prioritize circuit design tools, standards compliance, and embedded system experience.`, keywords: ['PLC Programming', 'PCB Design (Altium/Eagle)', 'MATLAB/Simulink', 'Embedded C/C++', 'Power Systems Analysis'], actionVerbs: ['Designed', 'Commissioned', 'Calibrated'], formattingTip: "Clearly list relevant standards (IEEE, IEC, NEC) and any PE or licensure credentials in a dedicated section." };
  }

  // --- Medical / Healthcare ---
  if (t.includes('doctor') || t.includes('physician') || t.includes('surgeon') || t.includes('medical officer') || t.includes('mbbs')) {
    return { why: `For medical roles like "${jobTitle}", ATS systems in hospitals and clinics scan for board certifications, clinical specialties, and EMR proficiency.`, keywords: ['Board Certification', 'Electronic Medical Records (EMR)', 'Patient Diagnosis & Treatment', 'Clinical Research', 'HIPAA Compliance'], actionVerbs: ['Diagnosed', 'Treated', 'Collaborated'], formattingTip: "Place your medical license number, board certifications, and residency details at the very top — these are primary ATS screening fields." };
  }
  if (t.includes('nurse') || t.includes('nursing') || t.includes('rn') || t.includes('lpn') || t.includes('bsn')) {
    return { why: `For nursing roles like "${jobTitle}", hospital ATS platforms prioritize licensure, patient care specialties, and clinical competencies.`, keywords: ['RN/BSN Licensure', 'Patient Assessment', 'IV Therapy & Medication Administration', 'Electronic Health Records (EHR)', 'BLS/ACLS Certification'], actionVerbs: ['Administered', 'Monitored', 'Coordinated'], formattingTip: "List your nursing license and certifications (BLS, ACLS, PALS) first — these are mandatory keyword matches in healthcare ATS." };
  }
  if (t.includes('pharma') || t.includes('pharmacist') || t.includes('pharmacy')) {
    return { why: `For pharmacy roles like "${jobTitle}", ATS algorithms search for drug knowledge, regulatory compliance, and dispensing systems experience.`, keywords: ['Drug Interactions & Pharmacology', 'FDA/GMP Compliance', 'Pharmacy Management Systems', 'Clinical Trials', 'Patient Counseling'], actionVerbs: ['Dispensed', 'Counseled', 'Verified'], formattingTip: "Include your pharmacy license number and any Board of Pharmacy certifications as standalone keywords." };
  }

  // --- Education ---
  if (t.includes('teacher') || t.includes('professor') || t.includes('instructor') || t.includes('lecturer') || t.includes('educator') || t.includes('tutor')) {
    return { why: `For education roles like "${jobTitle}", ATS systems in schools and universities scan for pedagogical methods, subject expertise, and classroom technology skills.`, keywords: ['Curriculum Development', 'Classroom Management', 'Differentiated Instruction', 'Student Assessment & Evaluation', 'EdTech (Google Classroom/LMS)'], actionVerbs: ['Instructed', 'Mentored', 'Developed'], formattingTip: "Include teaching certifications, grade levels taught, and subject specializations clearly — school ATS systems often require exact grade-band matches." };
  }

  // --- Business / Finance ---
  if (t.includes('accountant') || t.includes('auditor') || t.includes('finance') || t.includes('cpa') || t.includes('bookkeeper') || t.includes('financial analyst')) {
    return { why: `For finance roles like "${jobTitle}", ATS filters prioritize accounting software proficiency, regulatory knowledge, and quantifiable cost savings.`, keywords: ['GAAP/IFRS Compliance', 'Financial Reporting & Analysis', 'SAP/QuickBooks/Tally', 'Budgeting & Forecasting', 'Tax Compliance & Audit'], actionVerbs: ['Reconciled', 'Forecasted', 'Audited'], formattingTip: "Highlight CPA/CFA/CA certifications prominently and quantify your financial impact (e.g., 'Reduced costs by $500K annually')." };
  }
  if (t.includes('marketing') || t.includes('seo') || t.includes('content') || t.includes('social media') || t.includes('digital marketing') || t.includes('brand')) {
    return { why: `For marketing roles like "${jobTitle}", ATS systems scan for platform-specific skills, campaign metrics, and analytics tool proficiency.`, keywords: ['SEO/SEM Strategy', 'Google Analytics/Ads', 'Content Marketing & Copywriting', 'Social Media Management', 'Conversion Rate Optimization (CRO)'], actionVerbs: ['Launched', 'Amplified', 'Optimized'], formattingTip: "Quantify campaign results (e.g., 'Grew organic traffic by 150% in 6 months') — metrics-driven bullet points rank highest in marketing ATS." };
  }
  if (t.includes('sales') || t.includes('business develop') || t.includes('account executive') || t.includes('bdr') || t.includes('sdr')) {
    return { why: `For sales roles like "${jobTitle}", ATS algorithms prioritize CRM proficiency, revenue metrics, and pipeline management experience.`, keywords: ['Salesforce/HubSpot CRM', 'Pipeline Management', 'Revenue Generation', 'B2B/B2C Sales', 'Negotiation & Closing'], actionVerbs: ['Generated', 'Negotiated', 'Exceeded'], formattingTip: "Lead every bullet with revenue numbers or quota attainment (e.g., 'Exceeded quarterly quota by 130%') — sales ATS systems weight numbers heavily." };
  }
  if (t.includes('hr') || t.includes('human resource') || t.includes('recruiter') || t.includes('talent acquisition') || t.includes('people operations')) {
    return { why: `For HR roles like "${jobTitle}", ATS systems scan for HRIS platform experience, compliance knowledge, and talent management metrics.`, keywords: ['HRIS (Workday/SAP SuccessFactors)', 'Talent Acquisition & Onboarding', 'Employee Engagement', 'Labor Law Compliance', 'Performance Management'], actionVerbs: ['Recruited', 'Onboarded', 'Facilitated'], formattingTip: "Include specific HRIS platforms by name and any SHRM/PHR certifications — these are exact-match ATS keywords." };
  }

  // --- Legal ---
  if (t.includes('lawyer') || t.includes('attorney') || t.includes('legal') || t.includes('advocate') || t.includes('paralegal') || t.includes('counsel')) {
    return { why: `For legal roles like "${jobTitle}", ATS systems in law firms scan for bar admissions, practice area specialties, and legal research tools.`, keywords: ['Legal Research (Westlaw/LexisNexis)', 'Contract Drafting & Review', 'Litigation & Case Management', 'Regulatory Compliance', 'Bar Admission'], actionVerbs: ['Litigated', 'Negotiated', 'Drafted'], formattingTip: "List your bar admission(s) and practice areas at the top — legal ATS systems often use these as primary screening criteria." };
  }

  // --- Hospitality / Culinary ---
  if (t.includes('chef') || t.includes('cook') || t.includes('culinary') || t.includes('restaurant') || t.includes('hotel') || t.includes('hospitality') || t.includes('front desk')) {
    return { why: `For hospitality roles like "${jobTitle}", ATS systems in hotels and restaurants scan for food safety certifications, guest satisfaction metrics, and operational management.`, keywords: ['Food Safety (ServSafe/HACCP)', 'Menu Planning & Cost Control', 'Guest Satisfaction & Reviews', 'POS Systems', 'Inventory Management'], actionVerbs: ['Managed', 'Curated', 'Elevated'], formattingTip: "Include food safety certifications and any hospitality management degrees — these are hard-match keywords in the industry." };
  }

  // --- Logistics / Supply Chain ---
  if (t.includes('logistics') || t.includes('supply chain') || t.includes('warehouse') || t.includes('procurement') || t.includes('inventory') || t.includes('operations')) {
    return { why: `For operations roles like "${jobTitle}", ATS filters prioritize ERP experience, supply chain optimization, and process improvement certifications.`, keywords: ['ERP Systems (SAP/Oracle)', 'Supply Chain Optimization', 'Vendor Management', 'Lean/Six Sigma', 'Demand Forecasting'], actionVerbs: ['Streamlined', 'Coordinated', 'Reduced'], formattingTip: "Quantify logistics metrics (e.g., 'Reduced delivery lead time by 25%') and include any APICS/CSCP certifications." };
  }

  // --- Graphic Design / Media ---
  if (t.includes('graphic') || t.includes('illustrator') || t.includes('animator') || t.includes('video') || t.includes('motion') || t.includes('photographer')) {
    return { why: `For creative/media roles like "${jobTitle}", ATS systems scan for Adobe Creative Suite proficiency, portfolio links, and project-based experience.`, keywords: ['Adobe Photoshop/Illustrator/InDesign', 'After Effects/Premiere Pro', 'Brand Identity Design', 'Typography & Color Theory', 'UI/UX Principles'], actionVerbs: ['Designed', 'Illustrated', 'Produced'], formattingTip: "Always include a portfolio URL — but keep the resume itself text-based and ATS-friendly. Save your visual flair for the portfolio itself." };
  }

  // --- Catch-all: generate a role-specific response using the job title itself ---
  return {
    why: `For "${jobTitle}" roles, ATS systems match your resume against job-specific terminology. Using the right industry keywords dramatically increases your interview callback rate.`,
    keywords: [`${jobTitle} Best Practices`, 'Industry Compliance & Standards', 'Performance Metrics & KPIs', 'Stakeholder Communication', 'Continuous Improvement'],
    actionVerbs: ['Spearheaded', 'Delivered', 'Implemented'],
    formattingTip: `Use a clean, single-column format. Mirror exact phrases from the "${jobTitle}" job description — ATS systems match keywords literally, so use the employer's own terminology where possible.`
  };
};

// Smart mock enhance that actually transforms text meaningfully
const smartMockEnhance = (text, type) => {
  if (!text) return "";
  let enhanced = text.trim();

  // --- Word-level upgrades (expanded) ---
  const wordMap = {
    'worked': 'spearheaded', 'helped': 'collaborated', 'made': 'engineered',
    'built': 'architected', 'fixed': 'resolved', 'did': 'executed',
    'used': 'leveraged', 'good': 'proficient', 'fast': 'high-performance',
    'managed': 'orchestrated', 'created': 'developed', 'improved': 'enhanced',
    'responsible for': 'drove', 'tasked with': 'championed',
    'worked on': 'contributed to', 'in charge of': 'led',
    'knowledge of': 'expertise in', 'familiar with': 'skilled in',
    'strong': 'demonstrated', 'various': 'diverse', 'many': 'numerous',
    'a lot of': 'extensive', 'big': 'large-scale', 'learning': 'advancing skills in',
    'passionate about': 'committed to', 'enthusiastic': 'results-driven',
    'looking for': 'seeking', 'want to': 'eager to'
  };

  Object.keys(wordMap).forEach(weak => {
    const regex = new RegExp(`\\b${weak}\\b`, 'gi');
    enhanced = enhanced.replace(regex, (match) => {
      const strong = wordMap[weak.toLowerCase()];
      return match[0] === match[0].toUpperCase() ? strong.charAt(0).toUpperCase() + strong.slice(1) : strong;
    });
  });

  // --- Sentence-level improvements ---
  // Split into sentences and enhance each
  let sentences = enhanced.split(/(?<=[.!?])\s+/).filter(s => s.trim());
  
  sentences = sentences.map((sentence, idx) => {
    let s = sentence.trim();
    // Capitalize first letter
    s = s.charAt(0).toUpperCase() + s.slice(1);
    // Ensure ends with period
    if (!s.endsWith('.') && !s.endsWith('!') && !s.endsWith('?')) s += '.';
    return s;
  });

  // Add a professional closing if summary type and short
  if (type === 'summary' && sentences.length <= 3) {
    sentences.push('Adept at delivering measurable results in fast-paced, deadline-driven environments.');
  }

  enhanced = sentences.join(' ');
  return enhanced;
};

// POST /api/ai/enhance — Enhance resume text
router.post('/enhance', protect, async (req, res) => {
  try {
    const { text, type } = req.body; // type: 'summary' or 'experience'
    
    if (!text) return res.status(400).json({ message: 'No text provided' });

    // Check user plan
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('plan')
      .eq('id', req.user.id)
      .single();

    if (userErr || !user) throw userErr || new Error('User not found');
    
    // Relaxing restriction temporarily for testing/demo
    /*
    if (user.plan === 'free') {
      return res.status(403).json({ message: 'AI Smart Enhance is a Premium feature. Upgrade to unlock!' });
    }
    */

    let enhancedText;
    let explanation;

    try {
      if (!aiClient) throw new Error('AI Client not initialized');

      const prompt = type === 'summary' 
        ? `You are a professional resume writer. Rewrite the following professional summary to be more impactful, concise, and ATS-friendly. Use strong action verbs, quantify achievements where possible, and maintain a professional tone. Keep it to 3-4 sentences maximum.\n\nOriginal:\n${text}\n\nReturn ONLY the rewritten summary text, nothing else.`
        : `You are a professional resume writer. Rewrite the following resume experience bullet point to be more impactful and ATS-optimized. Use strong action verbs, quantify results where possible, and be concise.\n\nOriginal:\n${text}\n\nReturn ONLY the rewritten text, nothing else.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      enhancedText = response.text.trim();
      explanation = "Professionally rewritten by AI for maximum ATS impact.";
    } catch (aiErr) {
      console.error('AI Enhance Error, using smart fallback:', aiErr.message);
      enhancedText = smartMockEnhance(text, type);
      explanation = "Enhanced with professional vocabulary and tone improvements.";
    }

    res.json({ 
      original: text,
      enhanced: enhancedText,
      explanation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/ai/ats-guide — Generate ATS Keyword Guide based on job title
router.post('/ats-guide', protect, async (req, res) => {
  try {
    const { jobTitle } = req.body;
    
    if (!jobTitle || jobTitle.trim().length < 3) {
      return res.status(400).json({ message: 'Valid job title is required' });
    }

    // Check user plan — Premium feature
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('plan')
      .eq('id', req.user.id)
      .single();

    if (userErr || !user) throw userErr || new Error('User not found');
    
    // Relaxing restriction temporarily for testing/demo
    /*
    if (user.plan === 'free') {
      return res.status(403).json({ message: 'ATS Keyword Guide is a Premium feature. Upgrade to unlock!' });
    }
    */

    const prompt = `Act as an expert ATS (Applicant Tracking System) Specialist and Career Consultant. 
The user is targeting the role of "${jobTitle}".
Generate a concise, professional "Optimization Brief" in JSON format with these exact keys:
- "why": A one-sentence explanation of why specific keywords matter for this exact role.
- "keywords": An array of exactly 5 must-have technical skills or industry terms for this title.
- "actionVerbs": An array of exactly 3 high-impact action words to start their bullet points.
- "formattingTip": A brief reminder on how to keep the layout ATS-friendly.
Return ONLY valid JSON, no markdown.`;

    let guide;
    try {
      if (!aiClient) {
        throw new Error('AI Client not initialized');
      }

      // Correct API for @google/genai v1.48+: uses aiClient.models.generateContent()
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const rawText = response.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      guide = JSON.parse(rawText);
    } catch (aiErr) {
      console.error('LLM ATS Guide Error, falling back to mock:', aiErr.message);
      // Seamless fallback to role-specific mock data if AI fails
      guide = mockGenerateATSGuide(jobTitle);
    }

    res.json({
      jobTitle,
      guide
    });
  } catch (error) {
    console.error('Fatal ATS Guide Route Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
