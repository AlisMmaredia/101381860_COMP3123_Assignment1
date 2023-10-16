const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// Connect to MongoDB
const DB_URL = "mongodb+srv://Alismaredia:Alis32018@cluster0.0ffxopg.mongodb.net/test"
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Defining User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Defining Employee Schema and Model
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});
const Employee = mongoose.model('Employee', employeeSchema);

//http://localhost:3000/api/v1/user/signup
app.post('/api/v1/user/signup', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).send({ status: true, message: 'User created' });
});

// http://localhost:3000/api/v1/user/login
app.post('/api/v1/user/login', async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) {
    res.status(200).send({ status: true, message: 'User logged in successfully' });
  } else {
    res.status(400).send({ status: false, message: 'Invalid Username and password' });
  }
});

// Create Employee API
app.post('/api/v1/emp/employees', async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).send({ status: true, message: 'Employee created' });
});

// Get All Employees API
app.get('/api/v1/emp/employees', async (req, res) => {
  const employees = await Employee.find();
  res.status(200).send(employees);
});

// Update Employee by ID (PUT)
app.put('/api/v1/emp/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;
    await Employee.findByIdAndUpdate(employeeId, req.body);
    res.status(200).send({ status: true, message: 'Employee updated successfully' });
  } catch (err) {
    res.status(400).send({ status: false, message: 'Error updating employee' });
  }
});

// Delete Employee by ID (DELETE)
app.delete('/api/v1/emp/employees', async (req, res) => {
  try {
    const employeeId = req.query.eid;
    await Employee.findByIdAndDelete(employeeId);
    res.status(204).send();
  } catch (err) {
    res.status(400).send({ status: false, message: 'Error deleting employee' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});