import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,
ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-complex-forms',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './complex-forms.component.html',
  styleUrl: './complex-forms.component.scss'
})
export class ComplexFormsComponent {
  registrationForm: FormGroup;
  passwordMismatch: boolean = false;
  states: { code: string, name: string }[] = [
      { code: 'AP', name: 'Andhra Pradesh' },
      { code: 'AR', name: 'Arunachal Pradesh' },
      { code: 'AS', name: 'Assam' },
      { code: 'BR', name: 'Bihar' },
      { code: 'CG', name: 'Chhattisgarh' },
      { code: 'GA', name: 'Goa' },
      { code: 'GJ', name: 'Gujarat' },
      { code: 'HR', name: 'Haryana' },
      { code: 'HP', name: 'Himachal Pradesh' },
      { code: 'JH', name: 'Jharkhand' },
      { code: 'KA', name: 'Karnataka' },
      { code: 'KL', name: 'Kerala' },
      { code: 'MP', name: 'Madhya Pradesh' },
      { code: 'MH', name: 'Maharashtra' },
      { code: 'MN', name: 'Manipur' },
      { code: 'ML', name: 'Meghalaya' },
      { code: 'MZ', name: 'Mizoram' },
      { code: 'NL', name: 'Nagaland' },
      { code: 'OD', name: 'Odisha' },
      { code: 'PB', name: 'Punjab' },
      { code: 'RJ', name: 'Rajasthan' },
      { code: 'SK', name: 'Sikkim' },
      { code: 'TN', name: 'Tamil Nadu' },
      { code: 'TS', name: 'Telangana' },
      { code: 'TR', name: 'Tripura' },
      { code: 'UP', name: 'Uttar Pradesh' },
      { code: 'UT', name: 'Uttarakhand' },
      { code: 'WB', name: 'West Bengal' }
  ];

  constructor(private fb: FormBuilder) {
      this.registrationForm = this.fb.group({
          personalDetails: this.fb.group({
              firstName: ['', Validators.required],
              lastName: [''],
              email: ['', [Validators.required, Validators.email]],
          }),
          address: this.fb.group({
              street: [''],
              city: ['', Validators.required],
              state: ['', Validators.required],
              zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
          }),
          security: this.fb.group({
              password: ['', Validators.required],
              confirmPassword: ['', Validators.required],
          }, { validators: this.passwordMatchValidator }),
          skills: this.fb.array([]),
      }, { validators: this.passwordMatchValidator });
  }

  get skills(): FormArray {
      return this.registrationForm.get('skills') as FormArray;
  }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true } : null;
  }


  addSkill() {
      const skillGroup = this.fb.group({
          skillName: ['', Validators.required],
          experience: ['', [Validators.required, 
          Validators.pattern('^[0-9]+$'), Validators.min(1), Validators.max(50)]]
      });
      this.skills.push(skillGroup);
  }

  onSubmit() {
      if (this.registrationForm.invalid) {
          this.markAllAsTouched(this.registrationForm);
          if (this.registrationForm.errors?.['passwordMismatch']) {
              this.passwordMismatch = true;
          }
      } else {
          // Handle successful form submission
          console.log('Form Submitted', this.registrationForm.value);
      }
  }

  markAllAsTouched(formGroup: FormGroup) {
      formGroup.markAllAsTouched();
      Object.values(formGroup.controls).forEach(control => {
          if (control instanceof FormGroup) {
              this.markAllAsTouched(control);
          } else if (control instanceof FormArray) {
              control.controls.forEach(ctrl => {
                  if (ctrl instanceof FormGroup) {
                      this.markAllAsTouched(ctrl);
                  } else {
                      ctrl.markAsTouched();
                  }
              });
          } else {
              control.markAsTouched();
          }
      });
  }
}
