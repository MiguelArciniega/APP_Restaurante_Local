import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Platillo } from 'src/app/models/platillo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {
  platillosCollection: AngularFirestoreCollection<Platillo>;
  platillos: Observable<Platillo[]>;
  platillosDoc: AngularFirestoreDocument<Platillo>;

  editingStudent: Platillo;

  constructor(private firestore: AngularFirestore) {
    this.platillosCollection = this.firestore.collection('platillos');
    this.platillos = this.platillosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const datas = a.payload.doc.data() as Platillo;
        datas.id = a.payload.doc.id;
        return datas;
      });
    }));
  }

  createPlatillo(saucer: Platillo) {
    return this.firestore.collection('platillos').add(saucer);
  }
}