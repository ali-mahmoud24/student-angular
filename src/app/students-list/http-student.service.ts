import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Student } from './student.model';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpStudentService {
  constructor(private httpClient: HttpClient) {}

  fetchStudents() {
    return this.httpClient
      .get<Student[]>('http://localhost:5299/Student/GetStudents')
      .pipe(map((students: Student[]) => students));
  }

  fetchStudentById(studentId: number) {
    return this.httpClient
      .get<Student>(`http://localhost:5299/Student/GetStudent/${studentId}`)
      .pipe(map((student: Student) => student));
  }

  addStudent(student: Student) {
    return this.httpClient.post(
      `http://localhost:5299/Student/AddStudent`,
      student
    );
  }

  editStudent(editedStudent: Student) {
    return this.httpClient.put(
      `http://localhost:5299/Student/EditStudent`,
      editedStudent
    );
  }

  deleteStudent(studentId: number) {
    return this.httpClient
      .delete(`http://localhost:5299/Student/DeleteStudent/${studentId}`)
      .subscribe();
  }
}
