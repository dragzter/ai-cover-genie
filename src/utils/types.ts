export interface Resume {
  name: string;
  contact: string;
  summary: string;
  skills: string[];
  education: {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string[];
  }[];
}
