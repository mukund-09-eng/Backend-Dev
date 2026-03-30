const axios = require("axios");

const BASE_URL = "http://localhost:3000/employees";

// Create Employee
exports.createEmployee = async (req, res, next) => {
  try {
    const employeeData = {
      ...req.body,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null
    };

    const response = await axios.post(BASE_URL, employeeData);
    res.status(201).json(response.data);

  } catch (error) {
    next(error);
  }
};

// Get All Employees
exports.getEmployees = async (req, res, next) => {
  try {
    const response = await axios.get(BASE_URL);
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

// Get Employee By ID
exports.getEmployeeById = async (req, res, next) => {
  try {
    const response = await axios.get(`${BASE_URL}/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

// Update Employee
exports.updateEmployee = async (req, res, next) => {
  try {

    const updatedData = {
      ...req.body
    };

    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }

    const response = await axios.put(
      `${BASE_URL}/${req.params.id}`,
      updatedData
    );

    res.status(200).json(response.data);

  } catch (error) {
    next(error);
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    await axios.delete(`${BASE_URL}/${req.params.id}`);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Payroll Calculation
exports.getPayroll = async (req, res, next) => {
  try {
    const response = await axios.get(`${BASE_URL}/${req.params.id}`);
    const employee = response.data;

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const basic = employee.basicSalary;
    const hra = 0.2 * basic;
    const da = 0.1 * basic;
    const pf = 0.05 * basic;
    const netSalary = basic + hra + da - pf;

    res.status(200).json({
      name: employee.name,
      department: employee.department,
      basic,
      hra,
      da,
      pf,
      netSalary
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

