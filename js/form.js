
function validateForm(currentStudent, currentGrade) {
    if (currentStudent.length < 1 || currentStudent[0] !== currentStudent[0].toUpperCase() || (!currentStudent.includes(" "))) {
        return false;
    }
    var spacePosition = currentStudent.indexOf(" ");
    for (var i = 0; i < currentStudent.length; i++) {
        if (currentStudent[spacePosition + 1] !== currentStudent[spacePosition + 1].toUpperCase()) {
            return false;
        }
    }
    if (currentGrade < 5 || currentGrade > 10) {
        return false;
    }
}

function collectData(report) {
    var currentSubject = addSubject.value;
    var currentStudent = addStudentName.value;
    var currentGrade = addGrade.value;

    if (validateForm(currentStudent) == false) {
        alert("Enter valid student name");
        return;
    }
    if (validateForm(currentStudent, currentGrade) == false) {
        alert("Enter valid grade");
        return;
    } else {
        var currentStudentName = currentStudent.split(" ")[0];
        var currentStudentSurname = currentStudent.split(" ")[1];
        var student = new Student(currentStudentName, currentStudentSurname);
        var subject = new Subject(currentSubject);
        var exam = new Exam(subject, student, currentGrade);
        report.addExam(exam);
    }
};
function updateFields(report) {
    examTitleMonth.textContent = report.getDate();
    totalExams.textContent = report.getTotalExams();
    examPassedCount.textContent = report.getTotalPassed();
    examFailedCount.textContent = report.getTotalFailed();
    examPassedPercentage.textContent = report.getPassedPercent();
    examFailedPercentage.textContent = report.getFailedPercent();
    // addStudentName.value = "";
};

function updateList(report) {
    // Create all the list elements from the HTML file
    // item clearfix div
    var itemClearfix = document.createElement("div");
    itemClearfix.classList.add("item-clearfix");
    // item-description div
    var itemDescription = document.createElement("div");
    itemDescription.classList.add("item-description");
    itemDescription.textContent = addStudentName.value + " ";
    // right clearfix div
    var rightClearfix = document.createElement("div");
    rightClearfix.classList.add("right-clearfix");
    // item value div
    var itemValue = document.createElement("div");
    itemValue.classList.add("item-value");
    itemValue.textContent = addGrade.value;
    // item delete div-----
    var itemDelete = document.createElement("div");
    itemDelete.classList.add("item-delete");
    // item delete button-----
    var itemDeleteBtn = document.createElement("button");
    itemDeleteBtn.textContent = "x";
    itemDeleteBtn.classList.add("item-delete-btn");
    console.log(itemDeleteBtn);

    // Append all the created elements to their parrent elements
    itemDelete.appendChild(itemDeleteBtn);
    rightClearfix.appendChild(itemValue);
    rightClearfix.appendChild(itemDelete);
    
    
    if(addGrade.value > 5) {
        itemClearfix.setAttribute("id", "passed-0");
        itemClearfix.appendChild(itemDescription);
        itemClearfix.appendChild(rightClearfix);
        passedList.appendChild(itemClearfix);
        passed.appendChild(passedList);
    } else {
        itemClearfix.setAttribute("id", "failed-0");
        itemClearfix.appendChild(itemDescription);
        itemClearfix.appendChild(rightClearfix);
        failedList.appendChild(itemClearfix);
        failed.appendChild(failedList);
    }
}
