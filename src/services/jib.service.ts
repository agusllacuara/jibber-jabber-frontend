import {Injectable} from '@angular/core';
import {Jib} from "../model/Jib";

@Injectable({
  providedIn: 'root',
})
export class JibService {

  getAllJibs(): Jib[] {
    return [
      new Jib(
        'agusllacuara',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'Not me',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'notLacuara',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'not not me',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'agusllacuara',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'Not me',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'notLacuara',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'not not me',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        []),
      new Jib(
        'agusllacuara',
        'This is the content of a demo jib',
        ['asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd'],
        ['asd', 'asd', 'asd', 'asd', 'asd'],
        [])
    ]
  }
}
