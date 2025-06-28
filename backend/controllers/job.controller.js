import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
// used by admin for psoting the job
export const postJob = async (req, res) => {
  try {
     const user = User.findById(req.id);

    if(!user || user.role == "student"){
       return res.status(400).json({
         success: false,
         message: "You are not authenticated to do this."
       })
    }
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !salary ||
      !description ||
      !requirements ||
      !location ||
      !jobType ||
      (!experience && experience !== 0) ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are mandatory",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split("."),
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// for student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({
        createdAt: -1,
      });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// for student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    const job = await Job.findById(jobId)
      .populate({
        path: "company",
      })
      .populate({
        path: "applications",
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// for admin
export const getAdminJobs = async (req, res) => {
  try {
     const user = User.findById(req.id);

    if(!user || user.role == "student"){
       return res.status(400).json({
         success: false,
         message: "You are not authenticated to do this."
       })
    }
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteJobAndApplications = async (req,res) => {
  try {
    const jobId = req.params.id;
    const user = User.findById(req.id);

    if(!user || user.role == "student"){
       return res.status(400).json({
         success: false,
         message: "You are not authenticated to do this."
       })
    }
   
    await Application.deleteMany({ job: jobId });

    const deletedJob = await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      deletedJob,
      message: "Job deleted successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
};
