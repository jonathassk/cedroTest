import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ErrorFormHandlerService {
  fields = ['name', 'cpf', 'zip', 'address', 'neighborhood', 'city', 'state'];
  verifyEmptySpace(values: object): any {
    const isNullObj = {};
    let cont = 0;
    let isOk = true;
    const nullValues = Object.values(values);
    for (const field of nullValues) {
      if (typeof field === 'undefined' || field == null) {
        isNullObj[this.fields[cont]] = false;
        isOk = false;
      } else {
        isNullObj[this.fields[cont]] = true;
      }
      cont++;
    }
    return [isNullObj, isOk];
  }
}
