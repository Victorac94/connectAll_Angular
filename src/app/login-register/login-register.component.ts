import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.sass']
})
export class LoginRegisterComponent implements OnInit {

  register: FormGroup;
  login: FormGroup;
  ruta: string;
  categoriesAdded: string[];
  dbCategories: any[];

  constructor(private router: Router, private loginRegisterService: LoginRegisterService) {
    this.ruta = '';
    this.categoriesAdded = [];

    this.register = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^([a-zA-Z0-9@*#]+)$/)
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^([a-zA-Z0-9@*#]+)$/)
      ])
    }, [this.passwordValidator]);

    this.login = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit() {
    this.ruta = this.router.routerState.snapshot.url;
  }

  async onSubmitingRegister() {
    // Open modal to choose categories
    const backdrop = document.querySelector('.backdrop');
    const modal = document.querySelector('.modal-categories');

    backdrop.classList.add('show-backdrop');
    setTimeout(() => {
      modal.classList.add('show-modal-categories');
    }, 10);

    this.dbCategories = await this.loginRegisterService.getCategories();
  }

  async submitRegister() {
    const form = {
      ...this.register.value,
      categories: [...this.categoriesAdded]
    }
    const response = await this.loginRegisterService.sendRegisterForm(form);

    if (response.success) {
      this.router.navigate(['/home']);
    } else {
      console.log(response.error)
    }
  }

  submitLogin(form) {
    this.loginRegisterService.sendLoginForm(form);
  }

  passwordValidator(registerForm) {
    if (registerForm.controls.password.value === registerForm.controls.repeatPassword.value) {
      return null;
    } else {
      return { 'passwordnotmatch': true }
    }
  }

  // Add/remove tick icon indicating a category has been selected
  toggleCategorySelected(event, category) {
    // Get the category-added icon (green tick)
    const catAddedIcon = event.currentTarget.children[0].children[0];
    catAddedIcon.classList.toggle('show-category-added-icon');

    if (catAddedIcon.classList.contains('show-category-added-icon')) {
      catAddedIcon.style.transform = 'scale(1)';
    } else {
      catAddedIcon.style.transform = 'scale(0)';
    }
    this.addRemoveCategory(category)
  }

  addRemoveCategory(category) {
    const catPresent = this.categoriesAdded.findIndex(cat => cat === category);

    if (catPresent === -1) {
      this.categoriesAdded.push(category);
    } else {
      this.categoriesAdded.splice(catPresent, 1);
    }
  }

  closeModal() {
    const backdrop = document.querySelector('.backdrop');
    const modal = document.querySelector('.modal-categories');

    backdrop.classList.remove('show-backdrop');
    modal.classList.remove('show-modal-categories');
  }

  capitalize(name) {
    return name.replace(/^([a-z])/, (subM) => subM.toUpperCase());
  }
}
