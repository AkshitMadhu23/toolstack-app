// Central tool registry — add new tools here without touching any other file.
import {
  Braces,
  ImageDown,
  ArrowLeftRight,
  KeyRound,
  QrCode,
  Type,
  LineChart,
  Sparkles,
  Binary,
  Calculator,
  FileText,
  MailCheck,
  Wrench,
} from "lucide-react";

export const CATEGORIES = {
  developer: { label: "Developer", color: "#2563EB" },
  image: { label: "Image", color: "#9333EA" },
  security: { label: "Security", color: "#10B981" },
  text: { label: "Text", color: "#F59E0B" },
  finance: { label: "Finance", color: "#EC4899" },
  ai: { label: "AI", color: "#8B5CF6" },
  utilities: { label: "Utilities", color: "#06B6D4" },
};

export const TOOLS = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    tagline: "Beautify, validate & minify JSON in your browser.",
    description:
      "A blazing-fast JSON formatter with error highlighting, tree view, minify and download. Runs 100% locally — your data never leaves your browser.",
    icon: Braces,
    category: "developer",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier"],
    popular: true,
    trending: true,
    faqs: [
      {
        q: "Is my JSON data uploaded to a server?",
        a: "No. This tool runs entirely in your browser. Your JSON never leaves your device.",
      },
      {
        q: "What is the maximum JSON size I can format?",
        a: "You can format JSON up to several megabytes. Very large files may be slower depending on your device.",
      },
      {
        q: "Does it support custom indentation?",
        a: "Yes. Easily toggle between 2-space, 4-space, or minified single-line output.",
      },
    ],
    howTo: [
      "Paste or upload your JSON in the left editor.",
      "Click Beautify to pretty-print with your chosen space indent.",
      "Use Minify to remove whitespace for production deployment.",
      "Copy or download the formatted result.",
    ],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Shrink JPG, PNG & WebP without losing visible quality.",
    description:
      "Compress images directly in your browser with an adjustable quality slider. Perfect for websites, email, and social — everything happens locally.",
    icon: ImageDown,
    category: "image",
    keywords: ["compress image", "reduce image size", "image optimizer", "jpg compressor"],
    popular: true,
    trending: true,
    faqs: [
      { q: "Is there a file size limit?", a: "You can compress images up to 20 MB. Everything runs locally in your browser." },
      { q: "Which formats are supported?", a: "JPG, PNG and WebP inputs. Outputs as JPG or WebP for best compression." },
      { q: "Will it change my image dimensions?", a: "By default it keeps original dimensions. You can optionally downscale using the max-width control." },
    ],
    howTo: [
      "Drop or select an image (JPG, PNG, WebP).",
      "Adjust the quality slider — preview updates live.",
      "Optionally set a max width to downscale.",
      "Download the compressed image.",
    ],
  },
  {
    slug: "png-to-jpg",
    name: "PNG ↔ JPG Converter",
    tagline: "Convert PNG to JPG or JPG to PNG with one click.",
    description:
      "Fast, private, in-browser converter between PNG and JPG. Preserve transparency (PNG) or shrink file size (JPG) without any upload.",
    icon: ArrowLeftRight,
    category: "image",
    keywords: ["png to jpg", "jpg to png", "convert image", "image converter"],
    popular: true,
    faqs: [
      { q: "Does converting PNG to JPG remove transparency?", a: "Yes — JPG doesn't support transparency, so transparent pixels are filled with a background color you choose." },
      { q: "Is there quality loss?", a: "PNG → JPG uses your chosen quality. JPG → PNG is lossless." },
    ],
    howTo: [
      "Upload your PNG or JPG file.",
      "Pick the target format.",
      "Choose background color if converting to JPG.",
      "Download the result.",
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    tagline: "Create strong, random passwords instantly.",
    description:
      "Generate cryptographically-secure passwords with configurable length, symbols, numbers and uppercase. Includes strength meter and one-click copy.",
    icon: KeyRound,
    category: "security",
    keywords: ["password generator", "strong password", "random password", "secure password"],
    popular: true,
    trending: true,
    faqs: [
      { q: "How are passwords generated?", a: "Using the browser's crypto.getRandomValues() API — cryptographically secure randomness." },
      { q: "Are passwords stored anywhere?", a: "No. Generation is 100% local; nothing is transmitted or saved." },
    ],
    howTo: [
      "Set the desired length (8–64).",
      "Toggle numbers, symbols and uppercase.",
      "Click Generate to create a fresh password.",
      "Copy to clipboard with one tap.",
    ],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    tagline: "Turn any link or text into a QR code — free forever.",
    description:
      "Generate high-resolution QR codes for URLs, Wi-Fi credentials, contact cards and more. Download as PNG or SVG.",
    icon: QrCode,
    category: "utilities",
    keywords: ["qr code generator", "free qr code", "wifi qr code", "url qr"],
    popular: true,
    faqs: [
      { q: "Do QR codes expire?", a: "No. The QR codes generated here are static — they never expire and don't track scans." },
      { q: "What resolution is the download?", a: "PNG downloads at high resolution by default." },
    ],
    howTo: [
      "Paste any URL, text, or Wi-Fi string.",
      "Adjust colors and size if desired.",
      "Download as PNG image.",
    ],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    tagline: "Count words, characters, sentences & reading time.",
    description:
      "A minimal writing companion that counts words, characters (with/without spaces), sentences, paragraphs, and estimates reading & speaking time.",
    icon: Type,
    category: "text",
    keywords: ["word counter", "character counter", "reading time", "text analyzer"],
    trending: true,
    faqs: [
      { q: "How is reading time calculated?", a: "Assuming an average reading speed of 225 words per minute." },
      { q: "Does it save my text?", a: "No — all counting happens in your browser and nothing is stored." },
    ],
    howTo: [
      "Paste or type your text.",
      "See counts update in real time.",
      "Use for essays, blog posts, tweets or SEO copy.",
    ],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    tagline: "Encode & decode Base64 strings instantly.",
    description:
      "Convert plain text to Base64 format or decode Base64 strings back to human-readable text in real time with zero server latency.",
    icon: Binary,
    category: "developer",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "base64 string"],
    popular: false,
    trending: true,
    faqs: [
      { q: "Is Base64 encryption?", a: "No, Base64 is an encoding scheme, not encryption. It represents binary data in ASCII string format." },
      { q: "Does it handle UTF-8 characters?", a: "Yes, our encoder fully supports UTF-8 characters including emojis and non-English scripts." },
    ],
    howTo: [
      "Select Encode or Decode mode.",
      "Paste your text into the input area.",
      "View live converted Base64 output instantly.",
      "Copy the result to clipboard.",
    ],
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    tagline: "Project mutual fund SIP returns with interactive charts.",
    description:
      "Estimate the future value of a systematic investment plan with adjustable monthly contribution, rate of return, and tenure. Includes a breakup chart of invested vs. returns.",
    icon: LineChart,
    category: "finance",
    keywords: ["sip calculator", "mutual fund calculator", "investment calculator"],
    popular: true,
    faqs: [
      { q: "What's the formula used?", a: "FV = P × ({(1 + r)^n − 1} / r) × (1 + r), where r is monthly rate and n is number of months." },
      { q: "Does it account for inflation?", a: "It provides exact mathematical projections based on expected annual rate of return." },
    ],
    howTo: [
      "Set your monthly investment amount.",
      "Choose expected annual return.",
      "Choose tenure in years.",
      "Read invested amount, returns and future value from the interactive breakdown.",
    ],
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    tagline: "Calculate loan EMIs, interest & total repayment.",
    description:
      "Plan your home, car, or personal loan with exact monthly EMI calculations, total interest payable, and annual amortization schedule.",
    icon: Calculator,
    category: "finance",
    keywords: ["emi calculator", "loan calculator", "home loan emi", "car loan emi"],
    popular: true,
    trending: true,
    faqs: [
      { q: "What is EMI?", a: "Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month." },
      { q: "How is EMI calculated?", a: "EMI = [P x R x (1+R)^N]/[(1+R)^N-1] where P is principal, R is monthly interest rate, and N is tenure in months." },
    ],
    howTo: [
      "Enter loan principal amount.",
      "Set annual interest rate.",
      "Select loan tenure in years or months.",
      "View instant monthly payment and total interest breakdown.",
    ],
  },
  {
    slug: "ai-email-writer",
    name: "AI Email Writer",
    tagline: "Draft professional emails in seconds with AI.",
    description:
      "Generate business, sales, follow-up, cold, and thank-you emails with controllable tone, length and audience — powered by Claude Sonnet.",
    icon: Sparkles,
    category: "ai",
    keywords: ["ai email writer", "email generator", "professional email ai", "cold email ai"],
    popular: true,
    trending: true,
    faqs: [
      { q: "Which AI model is used?", a: "Anthropic Claude Sonnet — one of the best writing models available." },
      { q: "Is my prompt saved?", a: "Prompts are processed for generation but are not saved." },
    ],
    howTo: [
      "Describe what the email should say.",
      "Pick a tone, length, audience and email type.",
      "Click Generate — the email streams in live.",
      "Copy or tweak and regenerate.",
    ],
  },
  {
    slug: "ai-resume-summary",
    name: "Resume Summary Generator",
    tagline: "Generate impactful, ATS-friendly resume summaries.",
    description:
      "Transform your experience, skills, and target job title into a compelling 3-sentence professional summary engineered for HR resume screeners.",
    icon: FileText,
    category: "ai",
    keywords: ["resume summary generator", "ai resume writer", "professional bio ai"],
    popular: false,
    trending: true,
    faqs: [
      { q: "Why is a resume summary important?", a: "It's the first thing recruiters read and establishes your core value proposition in under 6 seconds." },
      { q: "Is it ATS-friendly?", a: "Yes, it uses industry-standard action verbs and clean phrasing." },
    ],
    howTo: [
      "Select your job role and experience level.",
      "List key skills or past achievements.",
      "Generate a crisp, high-impact resume summary.",
    ],
  },
  {
    slug: "ai-cover-letter",
    name: "Cover Letter Generator",
    tagline: "Tailor personalized cover letters for any job.",
    description:
      "Craft tailored, high-converting cover letters matching your background to specific company job postings in seconds.",
    icon: MailCheck,
    category: "ai",
    keywords: ["cover letter generator", "ai cover letter", "job application letter"],
    popular: false,
    trending: true,
    faqs: [
      { q: "How long should a cover letter be?", a: "Optimal length is 250–350 words, structured into opening, body achievement, and call to action." },
      { q: "Can I customize the output?", a: "Yes, copy to clipboard and adjust key achievements for your application." },
    ],
    howTo: [
      "Paste job title and target company name.",
      "Add 2-3 bullet points of your background.",
      "Click Generate for a complete, customized cover letter.",
    ],
  },
];

export const getTool = (slug) => TOOLS.find((t) => t.slug === slug);
export const getRelated = (slug, n = 4) => {
  const t = getTool(slug);
  if (!t) return TOOLS.slice(0, n);
  return TOOLS.filter((x) => x.slug !== slug)
    .sort((a, b) => (a.category === t.category ? -1 : 1))
    .slice(0, n);
};
