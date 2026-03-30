const express = require("express");
const router = express.Router();
const controller = require("../Controllers/employeeController");

// Create
router.post("/", controller.createEmployee);

// Get All
router.get("/", controller.getEmployees);

// Payroll
router.get("/:id/payroll", controller.getPayroll);

// Get By ID
router.get("/:id", controller.getEmployeeById);

// Update
router.put("/:id", controller.updateEmployee);

// Delete
router.delete("/:id", controller.deleteEmployee);

module.exports = router;