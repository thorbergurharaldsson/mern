import { Contact } from "./contactModel.js";

// handel index actions
export const indexContacts = (req, res) => {
  Contact.get((err, contacts) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Contacts retrieved successfully",
      data: contacts,
      contact: Contact.get,
    });
  });
};

// Handle Create contact actions
export const newContact = (req, res) => {
  const contact = new Contact();
  contact.name = req.body.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;

  if (!contact.name) {
    res.status(400).json({
      message: "'name' is required",
    });
  }
  if (!contact.email) {
    res.status(400).json({
      message: "'email' is required",
    });
  } else {
    // save the contact and check for errors
    contact.save((err) => {
      // Check for validation error
      if (err) res.json(err);
      else
        res.json({
          message: "New contact created!",
          data: contact,
        });
    });
  }
};

// Handle view contact info
export const viewContact = (req, res) => {
  Contact.findById(req.params.contact_id, (err, contact) => {
    if (err) res.send(err);
    res.json({
      message: "Contact details loading..",
      data: contact,
    });
  });
};

// Handle update contact info
export const updateContact = (req, res) => {
  Contact.findById(req.params.contact_id, (err, contact) => {
    if (err) res.send(err);
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email ? req.body.email : contact.email;
    contact.gender = req.body.gender ? req.body.gender : contact.gender;
    contact.phone = req.body.phone ? req.body.phone : contact.phone;
    // save the contact and check for errors
    contact.save((err) => {
      if (err) res.json(err);
      res.json({
        message: "Contact Info updated",
        data: contact,
      });
    });
  });
};

// Handle delete contact
export const deleteContact = (req, res) => {
  Contact.remove(
    {
      _id: req.params.contact_id,
    },
    (err, contact) => {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Contact deleted",
      });
    }
  );
};
