console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    $('#add-employee').on('click', addEmployee);
    $('body').on('click', '.button-delete', removeEmployee);
}

let currentStaff = [];
let monthlyCost = 0;

/**
 * Removes row of employee info
 */

function removeEmployee() {
    console.log('in removeEmployee');
    // make monthly cost a global variable
    // set annualCostRemoved equal to the salary in the deleted row
    let annualCostRemoved = $(this).parent().siblings().filter('td.salary').html();
    console.log('removed cost:', annualCostRemoved);
    // monthly cost is annual divided by 12
    let monthlyCostRemoved = Math.round(Number(annualCostRemoved)) / 12;
    // subtract monthlyCostRemoved from monthlyCost
    monthlyCost -= monthlyCostRemoved;
    // display updated monthlyCost
    $('#total-cost').html(`
        <span id="total-cost">$${monthlyCost.toLocaleString()}</span>
    `);
    $(this).parent().parent().remove();
    // somehow also remove that employee object from currentStaff array?
    // so that when another employee is added after one is deleted, the deleted one doesn't reappear because its still in the array
} // end removeEmployee

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
    $('td').empty();
    monthlyCost = 0;
    for(let employee of staffInput){
        $('#current-staff').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.iD}</td>
                <td>${employee.title}</td>
                <td class="salary">${employee.salary}</td>
                <td><button class="button-delete" data-purpose="delete">Delete</button></td>
            </tr>
        `);
        monthlyCost += Math.round(Number(employee.salary) / 12);
        $('#total-cost').html(`
            <span id="total-cost">$${monthlyCost.toLocaleString()}</span>
        `);
        console.log('monthly cost:', monthlyCost);
    } // end for of
} // end displayEmployeeInfo