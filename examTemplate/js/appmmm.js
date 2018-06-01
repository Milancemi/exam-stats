var modelController = (function(){

    var report = {
        students :{
            passed = [],
            failed = []
        },

        totals:{
            passed = 0,
            failed = 0
        },
        
        total = 0,
        successRate = -1
    }

    function Student(name){
        this.name = name;
        this.id = Math.floor(Math.random() * 99999); 
    }

    Student.prototype.getName = function(){
        return this.name;
    };

    Student.prototype.getId = function(){
        return this.id;
    }

    function Exam(subject, student, grade){
        this.subject = subject;
        this.student = student;
        this.grade = grade;
        this.id = Math.floor(Math.random() * 99999);
    }

    Exam.prototype.isPassed = function(){
        return (this.grade > 5 && this.grade <= 10) ? true : false;
    }

    Exam.prototype.getExamData = function(){
        return this.subject + " - " + this.student.getName();
    }

    function addExam(subject, student, grade){
        
    }





})();

var uiController = (function(){
    
})();

var mainController = (function(){
    
})();