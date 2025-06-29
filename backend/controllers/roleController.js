import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

export const createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating role", error: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating role", error: error.message });
  }
};

export const createPermission = async (req, res) => {
  try {
    const permission = new Permission(req.body);
    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating permission", error: error.message });
  }
};

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ name: 1 }); // Alphabetical order
    res.json(permissions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch permissions",
      error: error.message,
    });
  }
};
