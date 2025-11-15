import fs from 'fs';
import path from 'path';

interface Founder {
  name: string
  role: string
  batch: string
  imageUrl: string
  linkedinUrl?: string
}

interface Company {
  id: number
  name: string
  website: string
  summary: string
  description: string
  logoUrl: string
  foundingYear: number | string
  category: string[]
  founders: Founder[]
  totalRaised?: string
  employees?: number
  isSpotlight?: boolean
  isYCombinator?: boolean
  companyLinkedin?: string
  investmentRound?: string
  milestones?: string
  supportingPrograms?: string
}

// Helper function to get founder image path
function getFounderImagePath(founderName: string): string {
  const normalizedName = founderName.trim();
  const founderPicsDir = path.join(process.cwd(), 'public', 'FounderPics');
  
  try {
    const files = fs.readdirSync(founderPicsDir);
    // Match by exact name (case-insensitive)
    const matchingFile = files.find(file => {
      const fileName = file.replace(/\.(jpg|jpeg|png)$/i, '');
      return fileName.toLowerCase() === normalizedName.toLowerCase();
    });
    
    if (matchingFile) {
      // Return local path relative to public folder
      return `/FounderPics/${matchingFile}`;
    }
  } catch (error) {
    console.error('Error reading founder pics directory:', error);
  }
  
  // Fallback to UI Avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(founderName)}&size=80&background=4f46e5&color=fff`;
}

// Define spotlight startups by name
const SPOTLIGHT_STARTUPS = [
  'Productlane',
  'OneTutor',
  'Manex AI'
];

// Define Y Combinator startups by name
const YCOMBINATOR_STARTUPS = [
  'Productlane',
  // Add more Y Combinator companies here
];

// Parse CSV data
export function parseStartupsCSV(): Company[] {
  const csvPath = path.join(process.cwd(), 'public', 'StartupsList.csv');
  
  try {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    const companies: Company[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parse CSV line (handling quoted fields)
      const values: string[] = [];
      let currentValue = '';
      let insideQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim()); // Add last value
      
      // Map CSV columns
      const startupName = values[0] || 'Unnamed Startup';
      const memberName = values[1] || '';
      const memberLinkedin = values[2] || '';
      const shortDescription = values[4] || 'No description available';
      const longDescription = values[5] || shortDescription;
      const categories = values[6] ? values[6].split(',').map(c => c.trim()).filter(c => c) : ['Other'];
      const website = values[7] || '';
      const companyLogo = values[8] || `https://ui-avatars.com/api/?name=${encodeURIComponent(startupName)}&size=300&background=00002c&color=fff&bold=true&font-size=0.4`;
      const foundingYear = values[9] ? parseInt(values[9]) : new Date().getFullYear();
      const role = values[10] || 'Founder';
      const supportingPrograms = values[11] || '';
      const hasInvestment = values[12]?.toLowerCase() === 'yes';
      const investmentRound = values[13] || '';
      const investmentSize = values[14] || '€0';
      const milestones = values[15] || '';
      const companyLinkedin = values[16] || '';
      
      // Skip if no startup name
      if (!startupName || startupName === 'Startup Name') continue;
      
      // Create founder object if member exists
      const founders: Founder[] = [];
      if (memberName) {
        founders.push({
          name: memberName,
          role: role,
          batch: supportingPrograms || 'START Munich',
          imageUrl: getFounderImagePath(memberName),
          linkedinUrl: memberLinkedin || undefined
        });
      }
      
      // Determine if spotlight (based on predefined list)
      const isSpotlight = SPOTLIGHT_STARTUPS.includes(startupName);
      
      // Determine if Y Combinator (based on predefined list or supportingPrograms)
      const isYCombinator = YCOMBINATOR_STARTUPS.includes(startupName) || 
                            supportingPrograms.toLowerCase().includes('y combinator') ||
                            supportingPrograms.toLowerCase().includes('ycombinator') ||
                            supportingPrograms.toLowerCase().includes('yc');
      
      companies.push({
        id: i,
        name: startupName,
        website: website.replace(/^https?:\/\//, ''),
        summary: shortDescription,
        description: longDescription || shortDescription,
        logoUrl: companyLogo,
        foundingYear: foundingYear,
        category: categories,
        founders: founders,
        totalRaised: investmentSize !== '€0' ? investmentSize : undefined,
        employees: 0, // Not in CSV
        isSpotlight: isSpotlight,
        isYCombinator: isYCombinator,
        companyLinkedin: companyLinkedin || undefined,
        investmentRound: investmentRound || undefined,
        milestones: milestones || undefined,
        supportingPrograms: supportingPrograms || undefined
      });
    }
    
    return companies;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}
