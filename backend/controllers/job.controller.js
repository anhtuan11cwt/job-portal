import Job from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
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
    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !jobType ||
      experience === undefined ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
        success: false,
      });
    }
    const job = await Job.create({
      company: companyId,
      created_by: req.id,
      description,
      experience: Number(experience),
      jobType,
      location,
      position: Number(position),
      requirements,
      salary: Number(salary),
      title,
    });
    return res.status(201).json({
      job,
      message: "Đăng tin tuyển dụng thành công",
      success: true,
    });
  } catch (error) {
    console.log("Lỗi đăng tin tuyển dụng:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $options: "i", $regex: keyword } },
        { description: { $options: "i", $regex: keyword } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Lỗi lấy danh sách công việc:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({ path: "company" });
    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("Lỗi lấy công việc theo ID:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Lỗi lấy công việc của quản trị viên:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};
