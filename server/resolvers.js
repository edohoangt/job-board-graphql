import { Job, Company } from "./db.js";

function rejectIf(condition) {
  if (condition) {
    throw new Error("Unauthorized!");
  }
}

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (_root, { id }) => Job.findById(id),
    company: (_root, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIf(!user);

      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: (_root, { id }, { user }) => {
      rejectIf(!user);

      const job = Job.findById(id);
      rejectIf(job.companyId !== user.companyId);

      return Job.delete(id);
    },
    updateJob: (_root, { input }, { user }) => {
      rejectIf(!user);

      const job = Job.findById(input.id);
      rejectIf(job.companyId !== user.companyId);

      return Job.update({ ...input, companyId: user.companyId });
    },
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
