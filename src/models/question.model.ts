export class Question {
  id: string;
  text: string;
  answer: string;
  created: any;

  constructor (id: string, text: string = '', answer: string = '') {
    this.id = id;
    this.text = text;
    this.answer = answer;
    this.created = new Date();
  }
}