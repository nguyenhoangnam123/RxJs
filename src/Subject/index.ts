import {
  Subject,
  from,
  interval,
  ConnectableObservable,
  AsyncSubject
} from 'rxjs';
import { multicast } from 'rxjs/operators';

export function SubjectAsObservable() {
  const subject = new Subject<number>();

  subject.subscribe({
    next: v => console.log(`observable A: ${v}`)
  });

  subject.subscribe({
    next: v => console.log(`observable B: ${v}`)
  });

  subject.next(1);
  subject.next(2);
}

export function SubjectAsObserver() {
  const subject = new Subject<number>();

  subject.subscribe({
    next: v => console.log(`observerA: ${v}`)
  });
  subject.subscribe({
    next: v => console.log(`observerB: ${v}`)
  });

  const observable = from([1, 2, 3]);

  observable.subscribe(subject);
}

export function MulticastObservable() {
  const source = from([1, 2, 3]);
  const subject = new Subject();

  //because typescript always return an Obervable
  //https://stackoverflow.com/questions/54265143/property-connect-does-not-exist-on-type-observableany-rxjs-multicast
  const multicasted = source.pipe(multicast(subject)) as ConnectableObservable<
    number
  >;

  let subscription1, subscription2, subscriptionConnect;

  subscription1 = multicasted.subscribe({
    next: v => console.log(`observerA: ${v}`)
  });

  subscription2 = multicasted.subscribe({
    next: v => console.log(`observerB: ${v}`)
  });

  //provied subject subcribe resource observable
  subscriptionConnect = multicasted.connect();
}

export function AsyncSubjectObservable() {
  const asyncSubject = new AsyncSubject();
  asyncSubject.subscribe({
    next: v => console.log(`asyncSubject has observerA: ${v}`)
  });

  asyncSubject.next(1);
  asyncSubject.next(2);
  asyncSubject.next(3);

  asyncSubject.subscribe({
    next: v => console.log(`asyncSubject has observerB: ${v}`)
  });

  asyncSubject.next(5);
  asyncSubject.complete();

  /*
    will return:
    asyncSubject has observerA: 5
    asyncSubject has observerB: 5
  */
}
