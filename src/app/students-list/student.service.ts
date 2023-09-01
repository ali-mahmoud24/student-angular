import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Student } from './student.model';
import { HttpStudentService } from './http-student.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StudentService {
  studentsChanged = new Subject<Student[]>();

  private students: Student[] = [];

  constructor(
    private httpStudentService: HttpStudentService,
    private router: Router
  ) {}

  setStudents(students: Student[]) {
    this.students = students;
    this.studentsChanged.next(this.students.slice());
  }

  fetchStudents() {
    this.httpStudentService.fetchStudents().subscribe((students: Student[]) => {
      this.setStudents(students);
      // this.students = students;
    });

    return this.students.slice();
  }

  fetchStudentById(studentId: number) {
    // let loadedStudent: Student;

    // this.httpStudentService
    //   .fetchStudentById(studentId)
    //   .subscribe((student: Student) => {
    //     loadedStudent = student;
    //   });

    const student = this.students.find(
      (student) => student.studentId == studentId
    );

    return student;
  }

  addStudent(newStudent: Student) {
    this.httpStudentService
      .addStudent(newStudent)
      .subscribe(() => this.router.navigate(['/students']));

    this.students.push(newStudent);
    this.studentsChanged.next(this.students.slice());
  }

  editStudent(studentId: number, editedStudent: Student) {
    console.log('Edited student in service: ');
    console.log(editedStudent);
    this.httpStudentService.editStudent(editedStudent).subscribe(() => {
      this.router.navigate(['/students']);
    });

    // let student = this.fetchStudentById(studentId);

    // student = { ...editedStudent };

    // console.log(student);

    // this.studentsChanged.next(this.students.slice());
  }

  deleteStudentById(studentId: number) {
    this.httpStudentService.deleteStudent(studentId);

    const filteredStudents = this.students.filter(
      (student) => student.studentId !== studentId
    );

    this.studentsChanged.next(filteredStudents);
  }
}
