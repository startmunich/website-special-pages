import fs from 'fs'
import path from 'path'

interface Member {
  id: number
  name: string
  batch: string
  role: string
  company?: string
  linkedinUrl?: string
  imageUrl: string
  bio?: string
  expertise?: string[]
  achievements?: string
}

interface MemberCSVRow {
  Name: string
  Batch: string
  Role: string
  Company: string
  LinkedIn: string
  ImageUrl: string
  Bio: string
  Expertise: string
  Achievements: string
}

function parseCSV(content: string): MemberCSVRow[] {
  const lines = content.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim())
  const rows: MemberCSVRow[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const row: any = {}
    
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    
    rows.push(row as MemberCSVRow)
  }
  
  return rows
}

export async function parseMembers(): Promise<Member[]> {
  const csvPath = path.join(process.cwd(), 'public', 'MembersList.csv')
  
  try {
    const fileContent = fs.readFileSync(csvPath, 'utf-8')
    const rows = parseCSV(fileContent)
    
    const members: Member[] = rows.map((row, index) => ({
      id: index + 1,
      name: row.Name?.trim() || '',
      batch: row.Batch?.trim() || '',
      role: row.Role?.trim() || '',
      company: row.Company?.trim() || undefined,
      linkedinUrl: row.LinkedIn?.trim() || undefined,
      imageUrl: row.ImageUrl?.trim() || '/placeholder-profile.jpg',
      bio: row.Bio?.trim() || undefined,
      expertise: row.Expertise?.trim() 
        ? row.Expertise.split(',').map((s: string) => s.trim()).filter(Boolean)
        : undefined,
      achievements: row.Achievements?.trim() || undefined,
    }))
    
    return members
  } catch (error) {
    console.error('Error reading members CSV:', error)
    return []
  }
}
