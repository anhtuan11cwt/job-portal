import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Tên công ty là bắt buộc",
        success: false,
      });
    }
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        message: "Tên công ty đã tồn tại",
        success: false,
      });
    }
    const company = await Company.create({
      description,
      location,
      name,
      userId: req.id,
      website,
    });
    return res.status(201).json({
      company,
      message: "Đăng ký công ty thành công",
      success: true,
    });
  } catch (error) {
    console.log("Lỗi đăng ký công ty:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("Lỗi lấy thông tin công ty:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("Lỗi lấy công ty theo ID:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;
    if (req.file?.path) updateData.logo = req.file.path;
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      returnDocument: "after",
    });
    if (!company) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      message: "Cập nhật công ty thành công",
      success: true,
    });
  } catch (error) {
    console.log("Lỗi cập nhật công ty:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};
