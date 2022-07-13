console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    $('#add-employee').on('click', addEmployee);
}

/**
 * Gather input values for an employee and appends the data to the staffing table
 */

function addEmployee() {
    console.log('in addEmployee');
    
}