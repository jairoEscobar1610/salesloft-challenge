import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Logger } from './logger.service';

export let isDebugMode = !environment.production;

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService implements Logger {

  get info(): any {
    if (isDebugMode) {
      /* tslint:disable-next-line */
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn(): any {
    if (isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error(): any {
    if (isDebugMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

  invokeConsoleMethod(type: string, args?: any): void {
    /* tslint:disable-next-line */
    const logFn: (Function) = console.log || noop;
    logFn.apply(console, [args]);
  }
}
