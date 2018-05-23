function Exam(subject, student, grade) {
    this.subject = subject;
    this.student = student;
    this.grade = grade;
};
Exam.prototype.getExamInfo = function () {
    var examData = this.subject + ", " + this.student.getStudentData();
};
Exam.prototype.hasPassed = function () {
    var result;
    if (this.grade > 5) {
        result = true;
    } else {
        result = false;
    }
    return result;
}