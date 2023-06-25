const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");

const getAllJobs = (req, res) => {
  res.send(`All Jobs`);
};
const getJob = (req, res) => {
  res.send(`A Job`);
};
const createJob = async (req, res) => {
  // user ID comes from authentication middleware

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.OK).json(job);
};
const updateJob = (req, res) => {
  res.send(`Update Job`);
};
const deleteJob = (req, res) => {
  res.send(`Delete Job`);
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
