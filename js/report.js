function Report() {
    this.date = new Date();
    this.listOfExams = [];
}
Report.prototype.getDate = function() {
    var currentMonth;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        currentMonth = months[this.date.getMonth()];
        return currentMonth;
}

Report.prototype.addExam = function (exam) {
    this.listOfExams.push(exam);
}
Report.prototype.getTotalExams = function () {
    var sumOfExams = 0;
    for (var i = 0; i < this.listOfExams.length; i++) {
        sumOfExams++;
    }
    return sumOfExams;
}
Report.prototype.getTotalPassed = function () {
    var sumOfPassed = 0;
    for (var i = 0; i < this.listOfExams.length; i++) {
        if (this.listOfExams[i].grade > 5) {
            sumOfPassed++;
        }
    }
    return sumOfPassed;
}
Report.prototype.getTotalFailed = function () {
    var sumOfFailed = 0;
    for (var i = 0; i < this.listOfExams.length; i++) {
        if (this.listOfExams[i].grade < 6) {
            sumOfFailed++;
        }
    }
    return sumOfFailed;
}
Report.prototype.getPassedPercent = function() {
    var passedPercent = ((this.getTotalPassed()/this.getTotalExams())*100).toFixed(2);
    return passedPercent;
}
Report.prototype.getFailedPercent = function() {
    var failedPercent = ((this.getTotalFailed()/this.getTotalExams())*100).toFixed(2);
    return failedPercent;
}