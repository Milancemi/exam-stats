//-----------------Top part--------------------------------------
var examTitleMonth = document.querySelector(".exam-title-month");
var totalExams = document.querySelector(".total-exams");
var examPassedCount = document.querySelector(".exam-passed-count");
var examFailedCount = document.querySelector(".exam-failed-count");
var examPassedPercentage = document.querySelector(".exam-passed-percentage");
var examFailedPercentage = document.querySelector(".exam-failed-percentage");

//-----------------Form----------------------------------
var addSubject = document.querySelector(".add-subject");
var addSubjectOptions = addSubject.querySelectorAll("option");
var addStudentName = document.querySelector(".add-student-name");
var addGrade = document.querySelector(".add-grade");
var addGradeOptions = addGrade.querySelectorAll("option");
var addBtn = document.querySelector(".add-btn");

//----------------Bottom part---------------------------------
var passed = document.querySelector(".passed");
var failed = document.querySelector(".failed");
var passedList = document.querySelector(".passed-list");
var failedList = document.querySelector(".failed-list");
passedList.classList.add("passed-list");
failedList.classList.add("failed-list");


var report = new Report();

function collectAndUpdate() {
    collectData(report);
    updateFields(report);
    updateList(report);
}

addBtn.addEventListener("click", collectAndUpdate);


