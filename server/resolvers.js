import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (_root, { id }) => Job.findById(id),
    company: (_root, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: (_root, { input }) => Job.create(input),
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }) => Job.update(input),
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
