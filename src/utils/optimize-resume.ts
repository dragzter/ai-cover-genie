import { Resume } from "@/utils/types";

export const optimizeResume = (resumeParts: Resume) => {
  const { name, contact, summary, skills, education, experience } = resumeParts;
  const nameHTML = `<h2 class="resume-name"> ${name} </h2>`;
  const skillHTML = getFormattedSkills(skills || []);
  const educationHTML = getFormattedEducation(education);
  const summaryHTML = `<p class="resume-summary"> ${summary} </p>`;
  const contactHTML = `<p class="resume-contact"> ${contact} </p>`;
  let experienceHTML = getFormattedExperience(experience);

  return `
    <div class="resume">
      ${nameHTML}
      ${contactHTML}
      ${summaryHTML}
      <h3> SKILLS </h3>
      ${skillHTML}
      <h3> EXPERIENCE </h3>
      ${experienceHTML}
      <h3> EDUCATION </h3>
      ${educationHTML}
    </div>
  `;
};

function getFormattedSkills(skills: string[]) {
  return `<p class="resume-skills"> ${skills.join(", ")} </p>`;
}

function getFormattedEducation(education: Resume["education"]) {
  let educationGroup = [];
  for (const edu of education) {
    const startDate = edu.startDate ? edu.startDate + " - " : "";

    educationGroup.push(`
      <div class="resume-education">
        <h4> ${edu.degree} in ${edu.school} </h4>
        <p> ${startDate}  ${edu.endDate} </p>
      </div>
    `);
  }

  return educationGroup.join("");
}

function getFormattedExperience(experience: Resume["experience"]) {
  let experienceGroup = [];
  for (const exp of experience) {
    const jobTitle = exp.title.toUpperCase();
    const jobCompany = exp.company;
    const jobDate = `${exp.startDate} - ${exp.endDate}`;
    const jobDescription = exp.description;

    experienceGroup.push(`
      <div class="resume-experience">
        <div class="job-title"> <h4>${jobTitle}</h4>  <h4>${jobDate}</h4></div>
        <h4> ${jobCompany} </h4>
        <ul>
          ${jobDescription.map((desc) => `<li> ${desc} </li>`).join("")}
        </ul>
      </div>
    `);
  }

  return experienceGroup.join("");
}
