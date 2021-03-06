console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    $('#add-employee').on('click', addEmployee);
    $('body').on('click', '.button-delete', removeEmployee);
}

let currentStaff = [];
let monthlyCost = 0;
let removedID;

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
    let monthlyCostRemoved = Math.round(Number(annualCostRemoved) / 12);
    console.log('monthly cost:', monthlyCostRemoved);
    // subtract monthlyCostRemoved from monthlyCost
    monthlyCost -= monthlyCostRemoved;
    // display updated monthlyCost
    $('#total-cost').html(`
        <span id="total-cost">$${monthlyCost.toLocaleString()}</span>
    `);
    // remove deleted row from DOM
    $(this).parent().parent().remove();
    // get ID number of deleted staff
    removedID = $(this).parent().siblings().filter('td.id-number').html();
    console.log('removed ID:', removedID);
    // find the array index of the deleted staff object
    let indexToRemove = currentStaff.findIndex(findMatch);
    console.log('indexToRemove:', indexToRemove);
    // remove object in the indexToRemove position in the array one time
    currentStaff.splice(indexToRemove, 1);
    console.log('updated currentStaff:', currentStaff);
    checkTotalCost();
} // end removeEmployee

function findMatch(object){
    console.log('in findMatch');
    console.log(removedID);
        if(object.iD === removedID){
            return object.iD;
        }
} // end findMatch

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
    checkTotalCost();
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
    $('#table-body').empty();
    monthlyCost = 0;
    for(let employee of staffInput){
        $('#table-body').append(`
            <tr>
                <td class="first-name">${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td class="id-number">${employee.iD}</td>
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

/**
 * check if the monthly total is greater than $20,000. if it is, change background color to red.
 */

function checkTotalCost(){
    console.log('in checkTotalCost');
    if(monthlyCost > 20000){
        console.log('over budget');
        $('#total-cost').removeClass('under-budget');
        $('#total-cost').addClass('over-budget');
    } else {
        console.log('under-budget');
        $('#total-cost').removeClass('over-budget');
        $('#total-cost').addClass('under-budget');
    }
} // end checkTotalCost