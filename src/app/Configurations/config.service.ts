import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface IAppConfig {
  clientId: string;
  guard: {
    interactionType: string,
    authRequest: {
      scopes: []
    },
    loginFailedRoute: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static settings: IAppConfig;
  private http: HttpClient;
  constructor(private readonly httpHandler: HttpBackend) {
    this.http = new HttpClient(httpHandler);
  }

  load(endpoint: string) {
    return new Promise<void>((resolve, reject) => {
        this.http.get(endpoint).toPromise().then((response : IAppConfig) => {
          ConfigService.settings = (response as IAppConfig);

          console.log('Config Loaded');
          console.log( ConfigService.settings);
          resolve();

        }).catch((response: any) => {
           reject(`Could not load the config file`);
        });
    });
  }
  init(endpoint: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(endpoint).pipe(map(result => result))
        .subscribe(value => {
          //ConfigService.settings = value;
          resolve(true);
        },
        (error) => {
          reject(error);
        });
    });
  }

  loadAppConfig(endpoint: string) {
    return this.http.get(endpoint)
      .toPromise()
      .then(data => {
        //ConfigService.settings = data;
      });
  }

  getSettings(key?: string | Array<string>): any {

    if (!key || (Array.isArray(key) && !key[0])) {
      return ConfigService.settings;
    }

    if (!Array.isArray(key)) {
      key = key.split('.');
    }

    const result = key.reduce((acc: any, current: string) => acc && acc[current], ConfigService.settings);

    return result;
  }
}
