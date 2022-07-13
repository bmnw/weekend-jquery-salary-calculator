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

function emptyInputs(){
    console.log('in emptyInputs');
    $('#first-name-submit').val('');
    $('#last-name-submit').val('');
    $('#id-submit').val('');
    $('#title-submit').val('');
    $('#salary-input').val('');
} // end emptyInputs