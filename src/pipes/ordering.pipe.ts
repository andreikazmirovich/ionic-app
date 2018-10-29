import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'OrderByDate'})
export class OrderByDatePipe implements PipeTransform {
  public transform(list: any[], orderParam: string) {
    if (list) {
      if (!orderParam){
        return list;
      }
      
      return list.sort((a, b) => {
        return this.getObjectValue(a, orderParam) && this.getObjectValue(b, orderParam) && this.getObjectValue(a, orderParam).toDate() < this.getObjectValue(b, orderParam).toDate() ? -1 : 1;
      });
    }
  }

  public getObjectValue(obj: any, param: string) {
    const nestedParams = param.split('.');
    switch(nestedParams.length) {
      case 1: return obj[nestedParams[0]];
      case 2: return obj[nestedParams[0]][nestedParams[1]];
      case 3: return obj[nestedParams[0]][nestedParams[1]][nestedParams[2]];
    }
  }
}