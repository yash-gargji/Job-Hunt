import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// Regular expressions
const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^.{6,}$/; // At least 6 characters
const roleRegex = /^(student|recruiter)$/; // Example roles

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;

    const errors = [];

    if (!fullname)
      errors.push({ field: "fullname", message: "Full name is required" });
    else if (!nameRegex.test(fullname))
      errors.push({
        field: "fullname",
        message: "Full name should contain only letters and spaces",
      });

    if (!email) errors.push({ field: "email", message: "Email is required" });
    else if (!emailRegex.test(email))
      errors.push({ field: "email", message: "Invalid email format" });

    if (!phoneNumber)
      errors.push({
        field: "phoneNumber",
        message: "Phone number is required",
      });
    else if (!phoneRegex.test(phoneNumber))
      errors.push({
        field: "phoneNumber",
        message: "Phone number must be a 10-digit number",
      });

    if (!password)
      errors.push({ field: "password", message: "Password is required" });
    else if (!passwordRegex.test(password))
      errors.push({
        field: "password",
        message: "Password must be at least 6 characters long",
      });

    if (!role) errors.push({ field: "role", message: "Role is required" });
    else if (!roleRegex.test(role))
      errors.push({
        field: "role",
        message: "Role must be either 'user' or 'admin'",
      });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        errors,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePhoto = "";

    if(file){
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePhoto = cloudResponse.secure_url;
    }

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
         profilePhoto: profilePhoto,
      }
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All mandatory fields are required",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswrodMatch = await bcrypt.compare(password, user.password);
    if (!isPasswrodMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "account doesn't exist with current role,",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    if (!fullname || fullname.trim() === "")
      return res.status(400).json({
        message: "Full name must not be empty",
        success: false,
      });
    else if (!nameRegex.test(fullname))
      return res.status(400).json({
        success: false,
        message: "Full name should contain only letters and spaces",
      });

    if (!email || email.trim() === "")
      return res.status(400).json({
        message: "Email must not be empty",
        success: false,
      });
    else if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });

    if (!phoneNumber)
      return res.status(400).json({
        message: "Phone number is required",
        success: false,
      });
    else if (!phoneRegex.test(phoneNumber))
      res.status(400).json({
        success: "phoneNumber",
        message: "Phone number must be a 10-digit number",
      });
    let skillsArray = [];
    if (skills) skillsArray = skills.split(",");
    

    const userId = req.id; 
    let user = await User.findById(userId);

    if (!user) {
      res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if(file){
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
    }

    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
