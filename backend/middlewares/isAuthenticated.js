import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Không có token",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Token không hợp lệ",
        success: false,
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log("Lỗi xác thực:", error.message);
    return res.status(401).json({
      message: "Xác thực thất bại",
      success: false,
    });
  }
};

export default isAuthenticated;
