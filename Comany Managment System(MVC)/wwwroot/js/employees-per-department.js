﻿function toggleEmployees(button, DeptId) {
    const employeesContainer = document.getElementById("EmployeesContainer");
    employeesContainer.innerHTML = "";

    const isCollapsed = $('#collapseEmployees').hasClass('show');

    if (isCollapsed) {
        $('#collapseEmployees').collapse('hide'); 
        button.innerHTML = `<i class="bi bi-person-badge me-2"></i> Employees`; 
        button.setAttribute('aria-expanded', 'false'); 
    } else {
        $('#collapseEmployees').collapse('show');
        button.innerHTML = `<i class="bi bi-door-open me-2"></i> Close`;
        button.setAttribute('aria-expanded', 'true'); 

        $.ajax({
            url: "/Employees/GetEmployeesPerDepartment",
            type: "GET",
            data: { deptId: DeptId },
            success: function (result) {
                console.log(result);
                if (result.length === 0) {
                    employeesContainer.innerHTML = `
                        <div class="alert alert-warning text-center mt-2">
                            <h4 class="alert-heading">No Employees!</h4>
                            <p class="mb-0">No Employees were added yet.</p>
                        </div>`;
                    return;
                }

                for (let st of result) {
                    let employeeCard = `
                        <div class="card employee-card d-flex justify-content-between align-items-center p-2 shadow-sm mx-auto" style="width: 95%; display: flex; flex-direction: row; transition: transform 0.2s, box-shadow 0.2s;"
                            onmouseover="this.classList.add('shadow-lg'); this.style.transform='scale(1.02)'"
                            onmouseout="this.classList.remove('shadow-lg'); this.style.transform='scale(1)'">
                            <div class="d-flex flex-column me-3">
                                <h5 class="mb-0 text-info">${st.name}</h5>
                                <p class="mb-0">Age: ${st.age}</p>
                                <p class="mb-0">Salary: $${st.salary}</p>
                                <p class="mb-0">Start Date: ${new Date(st.startDate).toLocaleDateString()}</p>
                            </div>
                            <img src="${imagesPath}/${st.image}" alt="${st.name}" style="width: 60px; height: 60px; object-fit: cover;">
                        </div>`;
                    employeesContainer.innerHTML += employeeCard;
                }
            },
            error: function () {
                console.log("Error fetching employees.");
                employeesContainer.innerHTML = `
                    <div class="alert alert-danger text-center mt-2">
                        <h4 class="alert-heading">Error!</h4>
                        <p class="mb-0">Failed to load employees. Please try again.</p>
                    </div>`;
            }
        });
    }
}