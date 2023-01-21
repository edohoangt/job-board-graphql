import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (_root, { id }) => Job.findById(id),
    company: (_root, { id }) => Company.findById(id),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },
};
