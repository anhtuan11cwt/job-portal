import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
        success: false,
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          message: "Email đã được đăng ký",
          success: false,
        });
      }
      return res.status(400).json({
        message: "Số điện thoại đã được đăng ký",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePhoto = req.file?.path || "";
    await User.create({
      email,
      fullName,
      password: hashedPassword,
      phoneNumber,
      profile: { profilePhoto },
      role,
    });
    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      success: true,
    });
  } catch (error) {
    console.log("Lỗi đăng ký:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không chính xác",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không chính xác",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại với vai trò này",
        success: false,
      });
    }
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const userData = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({
        message: `Chào mừng bạn quay trở lại ${user.fullName}`,
        success: true,
        user: userData,
      });
  } catch (error) {
    console.log("Lỗi đăng nhập:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const logout = async (_req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Đăng xuất thành công",
      success: true,
    });
  } catch (error) {
    console.log("Lỗi đăng xuất:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
        success: false,
      });
    }
    if (email || phoneNumber) {
      const existingUser = await User.findOne({
        _id: { $ne: userId },
        $or: [
          email ? { email } : null,
          phoneNumber ? { phoneNumber } : null,
        ].filter(Boolean),
      });

      if (existingUser) {
        if (email && existingUser.email === email) {
          return res.status(400).json({
            message: "Email đã được đăng ký",
            success: false,
          });
        }

        if (phoneNumber && existingUser.phoneNumber === phoneNumber) {
          return res.status(400).json({
            message: "Số điện thoại đã được đăng ký",
            success: false,
          });
        }
      }
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills.split(",").map((s) => s.trim());
    }
    await user.save();
    const updatedUser = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
      role: user.role,
    };
    return res.status(200).json({
      message: "Cập nhật hồ sơ thành công",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Lỗi cập nhật hồ sơ:", error.message);
    return res.status(500).json({
      message: "Lỗi máy chủ",
      success: false,
    });
  }
};
