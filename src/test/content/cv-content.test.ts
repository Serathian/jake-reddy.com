import { describe, it, expect } from 'vitest';

interface WorkExperience {
  company: string;
  role: string;
  dateRange: string;
  achievements: string[];
}

interface Education {
  institution: string;
  degree: string;
  years: string;
}

interface Skills {
  frontend: string[];
  backend: string[];
  devops: string[];
}

interface CVContent {
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
}

function getCVContent(): CVContent {
  return {
    workExperience: [
      {
        company: 'Company A',
        role: 'Senior Full-Stack Developer',
        dateRange: 'Jan 2021 - Present',
        achievements: [
          'Built feature improving performance 40%',
          'Led team of 4 engineers',
          'Architected microservices platform'
        ]
      },
      {
        company: 'Company B',
        role: 'Full-Stack Developer',
        dateRange: 'Mar 2019 - Dec 2020',
        achievements: [
          'Developed REST API serving 10,000+ daily requests',
          'Implemented CI/CD pipeline reducing deployment time 60%'
        ]
      },
      {
        company: 'Company C',
        role: 'Junior Developer',
        dateRange: 'Jun 2017 - Feb 2019',
        achievements: [
          'Contributed to React frontend with TypeScript',
          'Fixed 50+ production bugs'
        ]
      }
    ],
    education: [
      {
        institution: 'University Name',
        degree: 'BSc Computer Science',
        years: '2015-2019'
      }
    ],
    skills: {
      frontend: ['TypeScript', 'React', 'Astro', 'Tailwind CSS'],
      backend: ['Node.js', 'PostgreSQL', 'Express'],
      devops: ['Docker', 'GitHub Actions', 'Nginx']
    }
  };
}

describe('CV Content Structure', () => {
  it('has work experience entries with required fields', () => {
    const cv = getCVContent();
    expect(cv.workExperience.length).toBeGreaterThan(0);
    
    cv.workExperience.forEach(exp => {
      expect(exp.company).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.dateRange).toBeTruthy();
      expect(exp.achievements).toBeTruthy();
      expect(exp.achievements.length).toBeGreaterThan(0);
    });
  });

  it('has education entry with required fields', () => {
    const cv = getCVContent();
    expect(cv.education.length).toBeGreaterThan(0);
    
    const edu = cv.education[0];
    expect(edu.institution).toBeTruthy();
    expect(edu.degree).toBeTruthy();
    expect(edu.years).toBeTruthy();
  });

  it('has skills in three categories', () => {
    const cv = getCVContent();
    expect(cv.skills.frontend).toBeTruthy();
    expect(cv.skills.backend).toBeTruthy();
    expect(cv.skills.devops).toBeTruthy();
    
    expect(cv.skills.frontend.length).toBeGreaterThan(0);
    expect(cv.skills.backend.length).toBeGreaterThan(0);
    expect(cv.skills.devops.length).toBeGreaterThan(0);
  });
});

describe('CV Content Quality', () => {
  it('at least one achievement includes metrics', () => {
    const cv = getCVContent();
    const allAchievements = cv.workExperience.flatMap(exp => exp.achievements);
    
    // Regex matches patterns like "40%", "10,000+", "4 engineers", "60%"
    const metricsPattern = /\d+%|\d+[,\d]*\+|\d+ engineers?/;
    const hasMetrics = allAchievements.some(achievement => 
      metricsPattern.test(achievement)
    );
    
    expect(hasMetrics).toBe(true);
  });
});
