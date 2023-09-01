import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from './student.model';
import { HttpStudentService } from './http-student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students-list',
  styleUrls: ['students-list.component.css'],
  templateUrl: 'students-list.component.html',
})
export class StudentsListComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private httpStudentService: HttpStudentService
  ) {}

  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'tel',
    'address',
    'birthday',
    'year',
    'actions',
  ];

  ngOnInit(): void {
    this.students = this.studentService.fetchStudents();

    this.subscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        console.log(students);
        this.students = students;
      }
    );
  }

  onNavigateToEdit(studentId: number) {
    this.router.navigate([studentId], { relativeTo: this.route });
  }

  onDelete(studentId: number) {
    this.studentService.deleteStudentById(studentId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
