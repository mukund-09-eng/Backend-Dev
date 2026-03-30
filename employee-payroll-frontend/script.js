const BASE_URL = "http://localhost:5000/api/employees";

/* ================= GET ALL EMPLOYEES ================= */

if (document.getElementById("employeeTable")) {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("employeeTable");
      table.innerHTML = "";

      data.forEach(emp => {
        table.innerHTML += `
          <tr>
            <td>
              <img src="http://localhost:5000${emp.avatar}" 
                   width="40" height="40"
                   style="border-radius:50%; margin-right:8px; object-fit:cover;">
              ${emp.name}
            </td>
            <td>${emp.gender}</td>
            <td>${emp.department}</td>
            <td>₹ ${emp.basicSalary}</td>
            <td>${emp.startDate}</td>
            <td>
              <button onclick="editEmployee('${emp.id}')">Edit</button>
              <button onclick="deleteEmployee('${emp.id}')">Delete</button>
              <button onclick="viewPayroll('${emp.id}')">Payroll</button>
            </td>
          </tr>
        `;
      });
    });
}

/* ================= DELETE ================= */

function deleteEmployee(id) {
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  })
  .then(() => location.reload());
}

/* ================= EDIT REDIRECT ================= */

function editEmployee(id) {
  window.location.href = `form.html?id=${id}`;
}

/* ================= PAYROLL VIEW ================= */

function viewPayroll(id) {
  fetch(`${BASE_URL}/${id}/payroll`)
    .then(res => res.json())
    .then(data => {
      alert(
        `Name: ${data.name}
Basic: ₹${data.basic}
HRA: ₹${data.hra}
DA: ₹${data.da}
PF: ₹${data.pf}
Net Salary: ₹${data.netSalary}`
      );
    });
}

/* ================= FORM PAGE LOGIC ================= */

if (document.getElementById("employeeForm")) {

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");

  /* ===== If Edit Mode ===== */

  if (editId) {
    fetch(`${BASE_URL}/${editId}`)
      .then(res => res.json())
      .then(emp => {
        document.getElementById("name").value = emp.name;
        document.getElementById("salary").value = emp.basicSalary;
        document.getElementById("startDate").value = emp.startDate;

        document.querySelector(
          `input[name='gender'][value='${emp.gender}']`
        ).checked = true;

        emp.department.forEach(dep => {
          document.querySelector(
            `input[type='checkbox'][value='${dep}']`
          ).checked = true;
        });

        // Avatar preselect in edit mode
        document.getElementById("avatar").value = emp.avatar;
      });
  }

  /* ===== Submit Handler ===== */

  document.getElementById("employeeForm")
    .addEventListener("submit", function(e) {

      e.preventDefault();

      const name = document.getElementById("name").value;
      const salary = document.getElementById("salary").value;
      const startDate = document.getElementById("startDate").value;

      const gender =
        document.querySelector("input[name='gender']:checked").value;

      const departments =
        [...document.querySelectorAll("input[type='checkbox']:checked")]
        .map(dep => dep.value);

      const avatar = document.getElementById("avatar").value;

      const employeeData = {
        name,
        gender,
        department: departments,
        basicSalary: Number(salary),
        startDate,
        avatar
      };

      /* ===== If Edit ===== */

      if (editId) {

        fetch(`${BASE_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData)
        })
        .then(() => {
          alert("Employee Updated Successfully");
          window.location.href = "index.html";
        });

      } else {

        /* ===== If New Employee ===== */

        fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData)
        })
        .then(() => {
          alert("Employee Added Successfully");
          window.location.href = "index.html";
        });

      }

    });
}