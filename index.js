const level = require('level');
const db = connectToDatabase('./leveldb');
var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

(async function() {
    await acceptStudent('201811827', 'Norhani A. Ayaon', 22, 'Marawi City');
}());

function connectToDatabase(dbName){
    return level(dbName, { valueEncoding: 'json' });
}

async function acceptStudent(id, fullName, age, address){
    const student = { 
        ID: id, 
        Name: fullName, 
        Age: age, 
        Address: address,
        Status : 'Applying'
    };
    await db.put(id, student);
    console.log(student);
    
    var InterviewDate = 'February 1, 2021';
    scheduleInterview(id, InterviewDate);
}

async function scheduleInterview(id, scheduleDate){
    const student = await db.get(id);
    student.Status = 'Under Interview';
    student.InterviewDate= scheduleDate;
    await db.put(id, student);
    console.log(student);
    scheduleExam(id, scheduleDate)
}
async function scheduleExam(id, scheduleDate){
    const student = await db.get(id);
    scheduleDate = 'February 11, 2021';
    student.Status = 'Pending Exam';
    student.ExamSchedule= scheduleDate;
    await db.put(id, student);
    console.log(student);

    var ExamScore = Math.random() * (120);
    ExamScore = ExamScore.toFixed();
    rateEntranceExam(id, ExamScore);
}

async function rateEntranceExam(id, examScore){
    const student = await db.get(id);
    student.ExamScore = examScore;
    if (examScore >= 75){
        student.Status = 'Admitted';
    } else {
        student.Status = 'Probitionary';
    }
    await db.put(id, student);
    console.log(student);
}
