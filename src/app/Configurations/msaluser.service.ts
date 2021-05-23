import { Injectable } from '@angular/core';
import * as Msal from 'msal';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LogLevel } from '@azure/msal-browser';
import { MsalGuardConfiguration } from '@azure/msal-angular';

const msalConfig = {
  auth: {
      clientId: "11111111-1111-1111-111111111111",
      authority: "https://login.microsoftonline.com/common",
      knownAuthorities: [],
      redirectUri: "https://localhost:3001",
      postLogoutRedirectUri: "https://localhost:3001/logout",
      navigateToLoginRequestUrl: true
  },
  cache: {
      cacheLocation: 'sessionStorage' as 'sessionStorage',
      storeAuthStateInCookie: false
  },
  system: {
      loggerOptions: {
          loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
              if (containsPii) {
                  return;
              }
              switch (level) {
                  case LogLevel.Error:
                      console.error(message);
                      return;
                  case LogLevel.Info:
                      console.info(message);
                      return;
                  case LogLevel.Verbose:
                      console.debug(message);
                      return;
                  case LogLevel.Warning:
                      console.warn(message);
                      return;
              }
          },
          piiLoggingEnabled: false
      },
      windowHashTimeout: 60000,
      iframeHashTimeout: 6000,
      loadFrameTimeout: 0
  }
};
@Injectable()
export class MsalUserService {



    private accessToken: any;
    public clientApplication: Msal.UserAgentApplication = null;
    constructor() {
        this.clientApplication = new Msal.UserAgentApplication(msalConfig);
    }

    public GetAccessToken(): Observable<any> {
        if (sessionStorage.getItem('msal.idtoken') !== undefined && sessionStorage.getItem('msal.idtoken') != null) {
            this.accessToken = sessionStorage.getItem('msal.idtoken');
        }
        return this.accessToken;
    }

    public authCallback(errorDesc, token, error, tokenType) {
        if (token) {

        } else {
            console.log(error + ':' + errorDesc);
        }
    }

    public getCurrentUserInfo() {
        // const user = this.clientApplication.getUser();
        // alert(user.name);
    }

    public logout() {
        this.clientApplication.logout();
      }
}
