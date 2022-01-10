import { Router } from "express";
import path from "path";
const router = Router();
// Set default API response
router.get("/", (req, res) => {
  res.send("test");
});

import {
  indexContacts,
  newContact,
  viewContact,
  updateContact,
  deleteContact,
} from "./contactController.js";

router.route("/contacts").get(indexContacts).post(newContact);

router
  .route("/contacts/:contact_id")
  .get(viewContact)
  .patch(updateContact)
  .delete(deleteContact);

// Export API routes
export default router;
