console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    $('#add-employee').on('click', addEmployee);
}

let currentStaff = [];

/**
 * Gather input values for an employee and appends the data to the staffing table
 */

function addEmployee() {
    console.log('in addEmployee');
    let firstName = $('#first-name-submit').val();
    let lastName = $('#last-name-submit').val();
    let iD = $('#id-submit').val();
    let jobTitle = $('#title-submit').val();
    let salary = $('#salary-input').val();
    console.log(firstName, lastName, iD, jobTitle, salary);
    newEmployee(firstName, lastName, iD, jobTitle, salary);
    console.log(currentStaff);
    displayEmployeeInfo(currentStaff);
    emptyInputs();
} // end addEmployee

/**
 * Creates employee object and pushes object to currentStaff array
 * @param {string} firstNameInput 
 * @param {string} lastNameInput 
 * @param {string} numberInput 
 * @param {string} titleInput 
 * @param {string} salaryInput 
 */

function newEmployee(firstNameInput, lastNameInput, numberInput, titleInput, salaryInput){
    console.log('in newEmployee');
    const employee = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        iD: numberInput,
        title: titleInput,
        salary: salaryInput
    };
    console.log(employee);
    currentStaff.push(employee);
} // end newEmployee

/**
 * Empties input fields when Add Employee button is clicked
 */

function emptyInputs(){
    console.log('in emptyInputs');
    $('#first-name-submit').val('');
    $('#last-name-submit').val('');
    $('#id-submit').val('');
    $('#title-submit').val('');
    $('#salary-input').val('');
} // end emptyInputs

function displayEmployeeInfo(staffInput){
    console.log('in displayEmployeeInfo');
    let monthlyCost = 0;
    for(let employee of staffInput){
        $('#current-staff').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.iD}</td>
                <td>${employee.title}</td>
                <td>${employee.salary}</td>
                <td><button class="button-delete" data-purpose="delete">Delete</button></td>
            </tr>
        `);
        monthlyCost += Math.round(Number(employee.salary) / 12);
        $('#total-cost').html(`
            <span id="total-cost">$${monthlyCost.toLocaleString()}</span>
        `);
    } // end for of
}