/* Your Code Here */
const createEmployeeRecord = (array) => {
    const employeeRecord = {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
    return employeeRecord
}

const createEmployeeRecords = (arrays) => {
    return arrays.map(array => createEmployeeRecord(array))

}

let createTimeInEvent = function(dateStamp){
    let [newDate, newHour] = dateStamp.split(' ')
    
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: +newHour,
        date: newDate,
    })
    
    return this
}

let createTimeOutEvent = function(dateStamp){
    let [newDate, newHour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: +newHour,
        date: newDate,
    })
    return this
}

let hoursWorkedOnDate = function(wantedDate){
    let inEvent = this.timeInEvents.find(timeInEvent => timeInEvent.date === wantedDate)
    let outEvent = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === wantedDate)
    let hoursWorked = +outEvent.hour - +inEvent.hour 
    return hoursWorked / 100
}

let wagesEarnedOnDate = function(wantedDate){
    return hoursWorkedOnDate.call(this, wantedDate) * this.payPerHour
}

let findEmployeeByFirstName = function(collection, firstNameString){
    return collection.find(employee => employee.firstName === firstNameString)
}

let calculatePayroll = function(array){
    const eligibleDates = array.map(employee => allWagesFor.call(employee))

    const totalPayroll = eligibleDates.reduce((total, currentEmployee) => total += currentEmployee, 0)
    return totalPayroll
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

