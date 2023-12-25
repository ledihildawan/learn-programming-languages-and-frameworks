import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { OnInit, Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  styleUrl: './sign-in.component.scss',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  private readonly _router: Router = inject(Router);
  private readonly _apiService: ApiService = inject(ApiService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _formBuilder: NonNullableFormBuilder = inject(
    NonNullableFormBuilder
  );

  public formGroup!: FormGroup<SignInForm>;

  public isBusy: boolean = false;
  public hasFailed: boolean = false;
  public showInputErrors: boolean = false;

  private _setupForm(): void {
    const ctrl = this._formBuilder.control.bind(this);

    this.formGroup = this._formBuilder.group<SignInForm>({
      username: ctrl('', [Validators.required]),
      password: ctrl('', [Validators.required]),
    });
  }

  public async doSignIn(): Promise<void> {
    if (this.formGroup.invalid) {
      this.showInputErrors = true;
      return;
    }

    this.isBusy = true;

    const { username, password } = this.formGroup.getRawValue();

    try {
      const res: {
        token: string;
        name: string;
      } = await lastValueFrom(this._apiService.signIn(username, password));

      this._authService.doSign(res.token, res.name);

      this._router.navigate(['todos']);
    } catch (error) {
      this.isBusy = false;
      this.hasFailed = true;
    }
  }

  public ngOnInit(): void {
    this._setupForm();
  }
}

interface SignInForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
