import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createRole,
  getRoles,
  updateRole,
  createPermission,
  getPermissions,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("create_role"), createRole);
router.get("/", authMiddleware, roleMiddleware("view_roles"), getRoles);
router.put("/:id", authMiddleware, roleMiddleware("edit_role"), updateRole);
router.post(
  "/permissions",
  authMiddleware,
  roleMiddleware("create_permission"),
  createPermission
);
router.get(
  "/permissions",
  authMiddleware,
  roleMiddleware("view_permissions"),
  getPermissions
);

export default router;
