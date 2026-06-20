import { class_members, tasks, users } from "../db/schema.ts";
import { db } from "../drizzle.js";
import { getClasses } from "../services/class.service.js";
import { getTasks } from "../services/task.service.js";

export const dash = async (req) => {
  const [classes, tasks] = await Promise.all([getClasses(req.user.id), getTasks(req.user.id)]);

  return {
    classes,
    tasks,
  };
};
