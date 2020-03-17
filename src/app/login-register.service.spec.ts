import { TestBed } from '@angular/core/testing';

import { LoginRegisterService } from './login-register.service';

describe('LoginRegistroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRegisterService = TestBed.get(LoginRegisterService);
    expect(service).toBeTruthy();
  });
});
