import { requireAcademyRole } from "../services/role.services.js";

export const requireAcademyLevel1 = requireAcademyRole(["owner", "admin"])

export const requireAcademyLevel2 = requireAcademyRole(["owner", "admin", "teacher"])

export const requireAcademyLevel3 = requireAcademyRole(["owner", "admin", "teacher", "student"]);