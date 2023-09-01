import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Student } from '../students-list/student.model';

import { StudentService } from '../students-list/student.service';
import { HttpStudentService } from '../students-list/http-student.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css'],
})
export class StudentsFormComponent implements OnInit {
  studentId: string;
  studentForm: FormGroup;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private httpStudentService: HttpStudentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ studentId }: Params) => {
      this.studentId = studentId;
      this.editMode = studentId != null;
      // Because change in params means page reload (change)
      this.initForm();
    });
    console.log(`Edit mode: ${this.editMode}`);
  }

  private initForm() {
    let studentInitail: Student = {
      studentName: '',
      address: '',
      tel: '',
      birthday: '',
      year: '',
    };

    if (this.editMode) {
      const student = this.studentService.fetchStudentById(+this.studentId);
      console.log('student from DB');
      console.log(student);

      if (student) {
        studentInitail = { ...student };

        console.log('Student Initial');
        console.log(studentInitail);
      }
    }

    this.studentForm = new FormGroup({
      studentName: new FormControl(
        studentInitail.studentName,
        Validators.required
      ),
      studentAddress: new FormControl(
        studentInitail.address,
        Validators.required
      ),
      studentTelephone: new FormControl(
        studentInitail.tel,
        Validators.required
      ),
      studentBirthday: new FormControl(
        studentInitail.birthday,
        Validators.required
      ),
      studentYear: new FormControl(studentInitail.year, Validators.required),
    });

    // let studentName = '';
    // let studentAddress = '';
    // let studentTelephone = '';
    // let studentBirthday = '';
    // let studentYear;

    // if (this.editMode) {
    //   this.httpStudentService
    //     .fetchStudentById(+this.studentId)
    //     .subscribe((student: Student) => {
    //       console.log(student);
    //       studentName = student.studentName;
    //       studentAddress = student.address;
    //       studentTelephone = student.tel;
    //       studentBirthday = student.birthday;
    //       studentYear = student.year;
    //     });

    // const student = this.studentService.fetchStudentById(+this.studentId);

    // if (student) {
    //   studentName = student.studentName;
    //   studentAddress = student.address;
    //   studentTelephone = student.tel;
    //   studentBirthday = student.birthday;
    //   studentYear = student.year;
    // }

    // this.studentForm = new FormGroup({
    //   studentName: new FormControl(studentName, Validators.required),
    //   studentAddress: new FormControl(studentAddress, Validators.required),
    //   studentTelephone: new FormControl(studentTelephone, Validators.required),
    //   studentBirthday: new FormControl(studentBirthday, Validators.required),
    //   studentYear: new FormControl(studentYear, Validators.required),
    // });
  }

  onSubmit() {
    if (this.editMode) {
      const editedStudent: Student = {
        studentId: +this.studentId,
        studentName: this.studentForm.value['studentName'],
        address: this.studentForm.value['studentAddress'],
        tel: this.studentForm.value['studentTelephone'],
        birthday: this.studentForm.value['studentBirthday'],
        year: this.studentForm.value['studentYear'],
      };
      this.studentService.editStudent(+this.studentId, editedStudent);
    } else {
      const newStudent: Student = {
        studentName: this.studentForm.value['studentName'],
        address: this.studentForm.value['studentAddress'],
        tel: this.studentForm.value['studentTelephone'],
        birthday: this.studentForm.value['studentBirthday'],
        year: this.studentForm.value['studentYear'],
      };
      this.studentService.addStudent(newStudent);
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
