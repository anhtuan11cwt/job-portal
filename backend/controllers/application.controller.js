import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Mã công việc là bắt buộc",
        success: false,
      });
    }
    const existingApplication = await Application.findOne({
      applicant: userId,
      job: jobId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "Bạn đã ứng tuyển công việc này rồi",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }
    const application = await Application.create({
      applicant: userId,
      job: jobId,
    });
    job.applications.push(application._id);
    await job.save();
    return res.status(201).json({
      message: "Ứng tuyển thành công",
      success: true,
    });
  } catch (error) {
    console.log("Lỗi ứng tuyển:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" },
      });
    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy đơn ứng tuyển",
        success: false,
      });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log("Lỗi lấy danh sách đã ứng tuyển:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: { path: "applicant" },
    });
    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }
    return res.status(200).json({
      applicants: job.applications,
      success: true,
    });
  } catch (error) {
    console.log("Lỗi lấy danh sách ứng viên:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Trạng thái là bắt buộc",
        success: false,
      });
    }
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Không tìm thấy đơn ứng tuyển",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Cập nhật trạng thái thành công",
      success: true,
    });
  } catch (error) {
    console.log("Lỗi cập nhật trạng thái:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};
