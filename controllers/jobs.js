const getAllJobs = (req, res) => {
  res.send(`All Jobs`);
};
const getJob = (req, res) => {
  res.send(`A Job`);
};
const createJob = (req, res) => {
  res.send(`Create Job`);
};
const updateJob = (req, res) => {
  res.send(`Update Job`);
};
const deleteJob = (req, res) => {
  res.send(`Delete Job`);
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };