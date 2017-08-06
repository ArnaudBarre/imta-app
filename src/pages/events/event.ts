export class Event {
  name: string = '';
  description: string = '';
  dateStart: string = new Date().toISOString();
  dateEnd: string = new Date().toISOString();
  association: string = null;
}
