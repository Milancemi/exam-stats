// Data controller
var dataController = (function () {

    // Data for our app
    var data = {
        students: {
            passed: [],
            failed: []
        },
        totals: {
            passed: 0,
            failed: 0
        },
        total: 0,
        successPercentage: -1
    }

    // Constructor function
    function Student(id, name) {
        this.id = id;
        this.name = name;
    }

    // Constructor function
    function Exam(id, subject, student, grade) {
        this.id = id;
        this.subject = subject;
        this.student = student;
        this.grade = grade;
    }

    Exam.prototype.isPassed = function () {
        return this.grade > 5 && this.grade <= 10;
    }

    Exam.prototype.getData = function () {
        return this.subject + ' - ' + this.student.name;
    }

    var examId = 0;
    function addItem(subject, studentName, grade) {
        var ID = Math.random() * 99999;
        var student = new Student(ID, studentName);
        var exam = new Exam(examId, subject, student, grade);
        examId += 1;

        if (exam.isPassed()) {
            data.students.passed.push(exam);
        } else {
            data.students.failed.push(exam);
        }

        return exam;
    }

    function calculateTotals() {
        data.totals.passed = data.students.passed.length;
        data.totals.failed = data.students.failed.length;

        data.total = data.students.passed.length + data.students.failed.length;

        var passedPercentage = (data.totals.passed / data.total) * 100;
        data.successPercentage = Math.round(passedPercentage);

        var failedPercentage = 100 - passedPercentage;
        data.failedPercentage = Math.round(failedPercentage);
    }

    function getStatistics() {
        return {
            passed: data.totals.passed,
            failed: data.totals.failed,
            passedPercentage: data.successPercentage,
            failedPercentage: data.failedPercentage,
            total: data.total
        }
    }

    // This is just for testing purposes 
    function logger() {
        console.log(data);
    }

    return {
        addStudent: addItem,
        dataLogger: logger,
        calculateStats: calculateTotals,
        getStatistics: getStatistics
    }

})();

// UI Controller
var UIController = (function () {

    var DOMSelectors = {
        selectSubject: ".add-subject",
        inputStudent: ".add-student-name",
        inputGrade: ".add-grade",
        buttonAdd: ".add-btn",
        containerPassed: ".passed-list",
        containerFailed: ".failed-list",
        containerPassedCount: ".exam-passed-count",
        containerFailedCount: ".exam-failed-count",
        containerPassedPercentage: ".exam-passed-percentage",
        containerFailedPercentage: ".exam-failed-percentage",
        containerTotalCount: ".exam-total",
    };

    function getInput() {
        var examSubject = document.querySelector(DOMSelectors.selectSubject).value // Will be passed or failed
        var studentName = document.querySelector(DOMSelectors.inputStudent).value
        var studentGrade = document.querySelector(DOMSelectors.inputGrade).value

        return {
            subject: examSubject,
            studentName: studentName,
            grade: parseInt(studentGrade)
        }
    };

    function displayStats(stats) {

        var defaultStats = {
            passed: 0,
            failed: 0,
            passedPercentage: "",
            failedPercentage: "",
            total: 0
        };

        stats = stats || defaultStats;

        document.querySelector(DOMSelectors.containerPassedCount).textContent = stats.passed;
        document.querySelector(DOMSelectors.containerFailedCount).textContent = stats.failed;
        document.querySelector(DOMSelectors.containerTotalCount).textContent = "Total students: " + stats.total;
        //document.querySelector(DOMSelectors.containerTotalCount).textContent = document.querySelector(DOMSelectors.containerTotalCount).textContent.replace('%count%',stats.total);

        document.querySelector(DOMSelectors.containerPassedPercentage).textContent = stats.passedPercentage + "%";
        document.querySelector(DOMSelectors.containerFailedPercentage).textContent = stats.failedPercentage + "%";
        //TODO : MAKE DEFAULT VALUES FOR PERCENTAGE

    }

    function addListItem(exam) {
        var html, outputHtml, containerElement;

        // Create HTML string with placeholder

        if (exam.isPassed()) {
            containerElement = DOMSelectors.containerPassed;
            html = '<div class="item clearfix" id="item-%id%">' +
                '<div class="item-description">%student%</div>' +
                '<div class="right clearfix">' +
                '<div class="item-value">%grade%</div>' +
                '<div class="item-delete">' +
                '<button class="item-delete-btn" onclick="removeItem(%exam.id%)">x</i></button>' +
                '</div>' +
                '</div>' +
                '</div>';
        } else {
            containerElement = DOMSelectors.containerFailed;
            html = '<div class="item clearfix" id="item-%id%">' +
                '<div class="item-description">%student%</div>' +
                '<div class="right clearfix">' +
                '<div class="item-value">%grade%</div>' +
                '<div class="item-delete">' +
                '<button class="item-delete-btn" onclick="removeItem(%exam.id%)">x</i></button>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        // Replace the placeholder text with actual data
        outputHtml = html.replace('%id%', exam.id);
        outputHtml = outputHtml.replace("%student%", exam.getData())
        outputHtml = outputHtml.replace('%grade%', exam.grade);
        outputHtml = outputHtml.replace('%exam.id%', exam.id);

        // Insert HTML into the DOM
        document.querySelector(containerElement).insertAdjacentHTML('beforeend', outputHtml);
    }

    function clearFields() {
        var fields;

        fields = document.querySelectorAll(DOMSelectors.inputStudent + ', ' + DOMSelectors.inputGrade);

        var fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function (current, index, array) {
            current.value = "";
        });

        fieldsArr[0].focus();
    }

    return {
        getInput: getInput,
        addListItem: addListItem,
        clearInputs: clearFields,
        displayStats: displayStats,
        getDOMSelectors: function () {
            return DOMSelectors;
        }
    };

})();

// Main controller
var mainController = (function (dataCtrl, UICtrl) {

    function setupEventListeners() {
        var DOM = UICtrl.getDOMSelectors();

        document.querySelector(DOM.buttonAdd).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode == 13) {
                ctrlAddItem();
            }
        });
    };

    function updateStatistics() {
        // 1. Calculate the total students
        dataCtrl.calculateStats();

        // 2. Return the statistics
        var stats = dataCtrl.getStatistics();

        // 3. Display the total on UI
        UICtrl.displayStats(stats);
    }

    function ctrlAddItem() {
        var input, newItem;

        // 1. Get data from input fields
        input = UICtrl.getInput();
        // console.log(input);

        if (!input.studentName && !input.grade) {
            throw Error("Input can not be empty");
        }

        // 2. Add item to data controller
        newItem = dataCtrl.addStudent(
            input.subject,
            input.studentName,
            input.grade
        );

        // 3. Add the item to UI
        UICtrl.addListItem(newItem);

        // 4. Clear the fields
        UICtrl.clearInputs()

        // 5. Calculate and update statistics
        updateStatistics()
    };

    return {
        init: function () {
            console.log('Application has started');
            UICtrl.displayStats();
            setupEventListeners();
            //TODO : create delete btn using eventListeners
        }
    }

})(dataController, UIController);

// Initialize main controller 
mainController.init();

function removeItem(id){
    document.querySelector("#item-" + id).remove();
}
