

import ResumeTable from "./components/ResumeTable";
import VacancyTable from "./components/VacancyTable";


const dashboardRoutes = [
  {
    path: "/resumes",
    name: "Resumes List",
    icon: "pe-7s-graph",
    component: ResumeTable,
    layout: "/admin"
  },

  {
    path: "/vacancies",
    name: "Vacancies List",
    icon: "pe-7s-note2",
    component: VacancyTable,
    layout: "/admin"
  },

];

export default dashboardRoutes;
