import { createRef, use } from "react";
import { Application } from "../models/application.model";
import { Job } from "../models/job.model";
import { application } from "express";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const JobId = req.params.id;

    if (!JobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: JobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "already applied",
        success: false,
      });
    }

    // check if the exists
    const job = await Job.findById(JobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    // create a new application
    const newApplication = await Application.create({
      job: JobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// to find the jobs applied by the user
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "No jobs applied",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for admin to see how many students have applied

export const getApplicants = async(req,res) => {
     try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options : {sort: {createdAt: -1}},
            populate: { path : "applicant"}
        })

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

     } catch (error) {
        console.log(error);
        
     }
}

export const updateStatus = async(req,res) =>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400),json({
               message: "status is required",
               success:false
            })
        }
        const application = await Application.findById(applicationId);

        if(!application){
           return res.status(404).json({
             message: "application not found",
             success: false
           })
        }
        // update the status

        application.status = status.toLowerCase();
        await application.save();
        
        return res.status(200).json({
           message: "status updated successfully",
           success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}
