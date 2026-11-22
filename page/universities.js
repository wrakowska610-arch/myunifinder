const fields = [
    "business",
    "computer-science",
    "engineering",
    "social-sciences",
    "arts",
    "law",
    "medicine",
    "natural-sciences"
];

const universities = [
    {
        name: "University of Warsaw",
        country: "poland",
        city: "Warsaw",
        fields: [...fields]
    },
    {
        name: "Ludwig Maximilian University of Munich",
        country: "germany",
        city: "Munich",
        fields: [...fields]
    },
    {
        name: "University of Amsterdam",
        country: "netherlands",
        city: "Amsterdam",
        fields: [...fields]
    },
    {
        name: "Lund University",
        country: "sweden",
        city: "Lund",
        fields: [...fields]
    },
    {
        name: "University of Copenhagen",
        country: "denmark",
        city: "Copenhagen",
        fields: [...fields]
    },
    {
        name: "Sorbonne University",
        country: "france",
        city: "Paris",
        fields: [...fields]
    },
    {
        name: "University of Bologna",
        country: "italy",
        city: "Bologna",
        fields: [...fields]
    },
    {
        name: "University of Barcelona",
        country: "spain",
        city: "Barcelona",
        fields: [...fields]
    },
    {
        name: "University of Vienna",
        country: "austria",
        city: "Vienna",
        fields: [...fields]
    },
    {
        name: "University of Helsinki",
        country: "finland",
        city: "Helsinki",
        fields: [...fields]
    },
    {
        name: "University of Lisbon",
        country: "portugal",
        city: "Lisbon",
        fields: [...fields]
    },
    {
        name: "Trinity College Dublin",
        country: "ireland",
        city: "Dublin",
        fields: [...fields]
    },
    {
        name: "KU Leuven",
        country: "belgium",
        city: "Leuven",
        fields: [...fields]
    },
    {
        name: "Charles University",
        country: "czechia",
        city: "Prague",
        fields: [...fields]
    },
    {
        name: "University of Oslo",
        country: "norway",
        city: "Oslo",
        fields: [...fields]
    },
    {
        name: "University of Zurich",
        country: "switzerland",
        city: "Zurich",
        fields: [...fields]
    },
    {
        name: "National and Kapodistrian University of Athens",
        country: "greece",
        city: "Athens",
        fields: [...fields]
    },
    {
        name: "The University of Tokyo",
        country: "japan",
        city: "Tokyo",
        fields: [...fields]
    },
    {
        name: "University of Toronto",
        country: "canada",
        city: "Toronto",
        fields: [...fields]
    },
    {
        name: "The University of Melbourne",
        country: "australia",
        city: "Melbourne",
        fields: [...fields]
    }
];

window.universities = universities;


/* Demo tuition fees in EUR per academic year.
   These are illustrative values, not real university prices. */

const demoTuitionByCountry = {
    poland: 4000,
    germany: 3000,
    netherlands: 10000,
    sweden: 9000,
    denmark: 9000,
    france: 4000,
    italy: 3500,
    spain: 4000,
    austria: 4000,
    finland: 8000,
    portugal: 3500,
    ireland: 12000,
    belgium: 5000,
    czechia: 4000,
    norway: 9000,
    switzerland: 12000,
    greece: 3000,
    japan: 7000,
    canada: 18000,
    australia: 20000
};

const demoFieldAdjustments = {
    business: 0,
    "computer-science": 500,
    engineering: 800,
    "social-sciences": -300,
    arts: 300,
    law: 400,
    medicine: 1500,
    "natural-sciences": 600
};

window.universities = universities;
window.demoTuitionByCountry = demoTuitionByCountry;
window.demoFieldAdjustments = demoFieldAdjustments;


/* Demo scholarship information.
   These are fictional examples, not verified scholarship offers. */

const demoScholarships = {
    Poland: {
        name: "Poland My First Choice – NAWA",
        amount: "PLN 2,000 / month",
        tuition: "Full tuition exemption at eligible public universities",
        benefits: "Monthly scholarship and possible travel allowance.",
        who: "International students applying for full-time Master's studies. Country and university restrictions apply.",
        url: "https://nawa.gov.pl/en/students/foreign-students/poland-my-first-choice-programme"
    },
    Germany: {
        name: "DAAD Study Scholarships",
        amount: "From approx. €992 / month",
        tuition: "Tuition fees are generally not covered.",
        benefits: "Monthly allowance, insurance and possible travel support.",
        who: "Mainly graduates applying for Master's studies; requirements depend on the specific DAAD programme.",
        url: "https://www.daad.de/en/studying-in-germany/scholarships/"
    },
    Netherlands: {
        name: "NL Scholarship",
        amount: "€5,000 (one-time payment)",
        tuition: "Partial support only — it does not cover the full tuition fee.",
        benefits: "Financial contribution during the first year of study.",
        who: "Bachelor's and Master's applicants from outside the EEA at participating universities.",
        url: "https://www.studyinnl.org/finances/nl-scholarship"
    },
    Sweden: {
        name: "Swedish Institute Scholarships",
        amount: "Monthly living allowance; amount depends on the current call.",
        tuition: "Full tuition coverage for eligible Master's programmes.",
        benefits: "Living allowance and, in some cases, travel grant.",
        who: "International students applying for selected Master's programmes; eligible countries and work experience requirements apply.",
        url: "https://si.se/en/apply/scholarships/"
    },
    Denmark: {
        name: "Danish Government Scholarships",
        amount: "Amount depends on the university and award.",
        tuition: "Full or partial tuition fee waiver.",
        benefits: "Some awards also include a monthly living grant.",
        who: "Highly qualified international students applying for eligible Master's programmes at Danish universities.",
        url: "https://studyindenmark.dk/"
    },
    France: {
        name: "France Excellence Eiffel Scholarship",
        amount: "Master's: approx. €1,200 / month",
        tuition: "Tuition fees are not covered by the Eiffel programme itself.",
        benefits: "Monthly allowance, travel, insurance and other support services.",
        who: "International students nominated by French higher education institutions for Master's or doctoral studies.",
        url: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence"
    },
    Italy: {
        name: "MAECI Government Scholarships",
        amount: "Monthly stipend; amount depends on the current call.",
        tuition: "Possible exemption from tuition fees; conditions depend on the university.",
        benefits: "Financial support for the scholarship period and possible insurance.",
        who: "International students applying for eligible Master's, arts or doctoral programmes.",
        url: "https://studyinitaly.esteri.it/"
    },
    Spain: {
        name: "Erasmus Mundus Joint Masters Scholarship",
        amount: "Living allowance and travel support according to programme rules.",
        tuition: "Participation costs are covered for scholarship holders.",
        benefits: "Monthly support and contribution to travel and installation costs.",
        who: "Students from around the world applying for selected joint Master's programmes.",
        url: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters"
    },
    Austria: {
        name: "OeAD Scholarships",
        amount: "Varies by scholarship programme.",
        tuition: "Depends on the specific scholarship and university.",
        benefits: "Some programmes provide a monthly grant and insurance.",
        who: "International students, graduates and researchers; eligibility depends on the selected programme.",
        url: "https://grants.at/en/"
    },
    Finland: {
        name: "University Tuition Fee Scholarships",
        amount: "Usually a tuition fee reduction rather than a cash payment.",
        tuition: "Typically 50–100% tuition fee waiver, depending on the university.",
        benefits: "Some universities offer additional merit-based support.",
        who: "Applicants to fee-paying Bachelor's and Master's programmes; living costs are usually not included.",
        url: "https://www.studyinfinland.fi/funding-your-studies"
    },
    Portugal: {
        name: "University Merit Scholarships",
        amount: "Varies by university and academic performance.",
        tuition: "Partial tuition reduction or a fixed financial award.",
        benefits: "Some universities offer additional academic support.",
        who: "Bachelor's and Master's students with strong academic results; requirements vary by institution.",
        url: "https://www.study-research.pt/"
    },
    Ireland: {
        name: "Government of Ireland International Education Scholarship",
        amount: "€10,000 for one year",
        tuition: "Full fee waiver for the scholarship year at the host institution.",
        benefits: "€10,000 stipend for living expenses.",
        who: "High-achieving international students applying for eligible Master's, postgraduate diploma or PhD studies.",
        url: "https://hea.ie/policy/internationalisation/goi-ies/"
    },
    Belgium: {
        name: "Master Mind Scholarship",
        amount: "€10,225 per academic year",
        tuition: "Tuition fee waiver, subject to the programme rules.",
        benefits: "Annual financial grant.",
        who: "Outstanding international students applying for eligible Master's programmes in Flanders.",
        url: "https://www.studyinflanders.be/scholarships/master-mind-scholarships"
    },
    Czechia: {
        name: "Czech Government Scholarships",
        amount: "Monthly stipend; amount depends on study level and current rules.",
        tuition: "Can cover tuition for selected programmes.",
        benefits: "Monthly financial support during the study period.",
        who: "Applicants from selected countries applying for eligible Master's or doctoral programmes.",
        url: "https://www.studyin.cz/"
    },
    Norway: {
        name: "BI Presidential Scholarship",
        amount: "May include a living stipend for selected students.",
        tuition: "Up to 100% tuition coverage at BI Norwegian Business School.",
        benefits: "Possible additional living-cost support.",
        who: "High-achieving applicants to selected Master's programmes at BI.",
        url: "https://www.bi.edu/programmes-and-individual-courses/scholarships/"
    },
    Switzerland: {
        name: "Swiss Government Excellence Scholarships",
        amount: "Monthly allowance; amount depends on the scholarship category.",
        tuition: "Tuition fees are not necessarily covered; conditions vary by institution.",
        benefits: "Monthly stipend and, depending on the award, insurance or other support.",
        who: "Primarily postgraduate researchers and selected artists; not a general Bachelor's scholarship.",
        url: "https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships"
    },
    Greece: {
        name: "IKY Scholarships",
        amount: "Varies by programme and academic year.",
        tuition: "May include tuition support, depending on the call.",
        benefits: "Financial assistance for selected studies or research.",
        who: "Students and researchers applying for specific IKY calls; eligibility varies.",
        url: "https://www.iky.gr/en/"
    },
    Japan: {
        name: "MEXT Japanese Government Scholarship",
        amount: "Monthly stipend; amount depends on study level.",
        tuition: "Full tuition exemption at the host institution.",
        benefits: "Monthly stipend and, under programme rules, travel to and from Japan.",
        who: "International students applying for eligible undergraduate, Master's or doctoral programmes.",
        url: "https://www.studyinjapan.go.jp/en/smap-stopj-applications-scholarships/"
    },
    Canada: {
        name: "Lester B. Pearson International Scholarship",
        amount: "Covers major study and living costs.",
        tuition: "Full tuition coverage at the University of Toronto.",
        benefits: "Books and residence support are also included.",
        who: "Outstanding international high-school students applying for their first undergraduate degree at the University of Toronto.",
        url: "https://future.utoronto.ca/pearson/"
    },
    Australia: {
        name: "Research Training Program (RTP)",
        amount: "Stipend available; amount depends on the university and year.",
        tuition: "Tuition fee offset for eligible research degrees.",
        benefits: "May include a living stipend and allowances.",
        who: "Domestic and international students undertaking eligible Master's by Research or PhD programmes.",
        url: "https://www.education.gov.au/research-block-grants/research-training-program"
    }
};

window.demoScholarships = demoScholarships;