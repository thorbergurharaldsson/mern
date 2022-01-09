import { Router } from "express";
const router = Router();
// Set default API response
router.get("/", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "Welcome to my API!",
  });
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
  .put(updateContact)
  .delete(deleteContact);

// Export API routes
export default router;
