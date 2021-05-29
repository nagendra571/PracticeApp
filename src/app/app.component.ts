import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfigService } from './Configurations/config.service';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nagendra';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  ActiveTab: string = 'Recipe';
  profile!: ProfileType;


  constructor(@Inject(MSAL_GUARD_CONFIG)
    private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient,
    // private conf: ConfigService
    ) {
      // console.log('config in app Comp', conf.getSettings('clientId'));
    }

  navbarClicked(values:string){
    this.ActiveTab = values;
  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });

      // this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  login() {
    // ********************** For popup style ************************
    // this.authService.loginPopup()
    //   .subscribe({
    //     next: (result) => {
    //       console.log(result);
    //       this.setLoginDisplay();
    //     },
    //     error: (error) => console.log(error)
    //   });
    // ********************** For popup style ************************

    // this.authService.loginRedirect();

    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() { // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'https://nagangularapp.azurewebsites.net/'
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
