// import the fromEvent operator
import { fromEvent, of } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
// var observable = Observable.create((observer:any) => {
//     observer.next('Hello World!');
//     observer.next('Hello Again!');
//     observer.complete();
//     observer.next('Bye');
// })
// observable.subscribe(
//     (x:any) => logItem(x),
//     (error: any) => logItem ('Error: ' + error),
//     () => logItem('Completed')
// );
// function logItem(val:any) {
//     var node = document.createElement("li");
//     var textnode = document.createTextNode(val);
//     node.appendChild(textnode);
//     document.getElementById("list").appendChild(node);
// }

const list = document.getElementById("list");
const item = document.createElement("li");

const dataSource = of(1, 2, 3, 4, 5);

const sub1 = dataSource
  .pipe(map(value => value + 1))
  .subscribe(value => console.log(value));

const sub3 = of(1, 2, 3, 4, 5, 6, 1, 2)
  .pipe(
    // wait for a 200ms pause
    debounceTime(200),
    // if the value is the same, ignore
    distinctUntilChanged()
    // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
    // switchMap(searchTerm => typeaheadApi.search(searchTerm))
  )
  .subscribe(results => {
    console.log("value is: ", results);
  });

// grab button reference
const button = document.getElementById("myButton");

// create an observable of button clicks
const myObservable = fromEvent(button, "click");

// for now, let's just log the event on each click
// const sub2 = myObservable.subscribe(event => console.log(event));
