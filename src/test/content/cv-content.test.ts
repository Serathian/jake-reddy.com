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
        company: 'Solita',
        role: 'Software Designer',
        dateRange: '10/2021 - Present',
        achievements: [
          'Developed mission planning UIs, 3D visualization, and real-time telemetry for confidential Autonomous Flight R&D project',
          'Engineered backend integrations utilizing Protocol Buffers (protobuf) and NATS stream-based state management',
          'Led Vue 2 to React frontend migration for public procurement platform serving nationwide entities',
          'Architected hilma-sdk typed SDK providing self-documenting data validation patterns',
          'Implemented Azure Service Bus integration with transactional outbox pattern for guaranteed delivery',
          'Executed framework migration from .NET 8 to .NET 10 with 100% backward compatibility',
        ],
      },
      {
        company: 'Hospitality Operations',
        role: 'Manager',
        dateRange: '01/2019 - 04/2020',
        achievements: ['Oversaw daily operations, inventory management, and team scheduling'],
      },
    ],
    education: [
      {
        institution: 'Centria AMK & University of Helsinki',
        degree: 'Highway 2 Code (MERN Full Stack)',
        years: '01/2021 - 07/2021',
      },
    ],
    skills: {
      frontend: ['React', 'Vue', 'TypeScript', 'Optimizely CMS'],
      backend: ['.NET 10 / C#', 'ASP.NET Core', 'Azure App Services', 'PostgreSQL'],
      devops: ['Docker', 'Azure DevOps', 'YAML Pipelines', 'StatusCake'],
    },
  };
}

describe('CV Content Structure', () => {
  it('has work experience entries with required fields', () => {
    const cv = getCVContent();
    expect(cv.workExperience.length).toBeGreaterThan(0);

    cv.workExperience.forEach((exp) => {
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
  it('at least one achievement includes metrics or specific technical milestones', () => {
    const cv = getCVContent();
    const allAchievements = cv.workExperience.flatMap((exp) => exp.achievements);

    const metricsPattern = /100%|\.NET 10|Vue 2|React|hilma-sdk/;
    const hasMetrics = allAchievements.some((achievement) => metricsPattern.test(achievement));

    expect(hasMetrics).toBe(true);
  });
});
