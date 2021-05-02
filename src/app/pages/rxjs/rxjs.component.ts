import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs?: Subscription;

  constructor() {



    /*this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      //subs
      //error
      //complete
      valor => console.log('sus', valor),
      (err) => console.warn('Error:', err),
      () => console.info('Obs completo')
    );*/
    this.intervalSubs = this.retornaIntervalo()
      .subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaIntervalo(): Observable<number> {
    const interval$ = interval(100)
      .pipe(
        //Cuabtas veces se va a emitir el observable antes de completarse
        //take(10), indica cuantas veces se va a ejecutar el observable
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false)
      );
    return interval$;
  }

  retornaObservable(): Observable<number> {
    //Observable que se quiere almacenar
    let i = -1;
    const obs$ = new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++
        //next() emite el valor
        observer.next(i);
        if (i === 4) {
          //clearInterval() termina el intervalo
          clearInterval(intervalo);
          //termina el observable
          observer.complete();
        }

        if (i === 2) {
          //bota el error en el observable
          observer.error('i llegó al valor 2');
        }
      }, 1000);
    });

    return obs$;
  }

}
