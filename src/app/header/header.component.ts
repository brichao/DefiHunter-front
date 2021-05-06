import { CommunicationComposantService } from './../services/communication-composant.service';
import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { RegisterFormService } from '../services/register-form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  dataIconGoogle = 'assets/images/iconGoogle.png';

  @Output()
  public menuEvent = new EventEmitter<MouseEvent>();

  chamis$: Observable<firebase.User | null>;

  constructor(  public auth: AngularFireAuth,
                private registerService: RegisterFormService,
                private router: Router,
                private emailService: CommunicationComposantService
              ){
    this.chamis$ = auth.authState;
  }

  handleMenuClick(event: MouseEvent): void {
    this.menuEvent.emit(event);
  }

  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.auth.signInWithPopup(provider);
    this.redirectUserAfterLogin();

}

logout(): void {
  this.auth.signOut();
}

isLoggedIn(): Observable<firebase.User | null> {
  return this.chamis$;
}

// Redirects User to Register Page if the user's email is not found in the database
redirectUserAfterLogin(): void {
  this.chamis$
    .subscribe(c => {
      console.log(c);
      if (c != null && !RegisterFormService.emails.includes(c?.email as string)) {
        this.emailService.envoieMail(c.email);
        RegisterFormService.emails.push(c?.email as string);
        this.router.navigate(['inscription'], { state: { redirect: this.router.url } } );
      } else {
        this.router.navigate([''], {state: {redirect: this.router.url}})
      }
    });
  }
}
