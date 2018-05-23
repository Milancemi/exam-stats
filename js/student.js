function Student(name, surname) {
    this.name = name;
    this.surname = surname;
};
Student.prototype.getStudentData = function () {
    var fullname = this.name + " " + this.surname;
    return fullname;
};