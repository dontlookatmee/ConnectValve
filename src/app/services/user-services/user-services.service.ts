import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

interface Service {
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  title: string;
  uid: string;
}

interface ServicesMeta {
  id: string;
  data: {
    category: string;
    description: string;
    image: string;
    name: string;
    price: number;
    title: string;
    uid: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  userId: string;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  getServices() {
    return this.afs
      .collectionGroup('services')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((values) => {
            const data = values.payload.doc.data();
            const id = values.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getService(uid: string) {
    return this.afs
      .collection('services')
      .doc(uid)
      .snapshotChanges()
      .pipe(
        map((values) => {
          const data = values.payload.data();
          const id = values.payload.id;
          return { id, data };
        })
      );
  }

  getMyServices() {
    return this.afs
      .collectionGroup('services')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((values) => {
            const data = values.payload.doc.data();
            const id = values.payload.doc.id;
            return { id, data };
          });
        }),
        map((services: ServicesMeta[]) => {
          return services.filter((service: ServicesMeta) => {
            return service.data.uid === this.userId;
          });
        })
      );
  }

  createService(data: Service) {
    console.log('created service');
    return this.afs.collection('services').add(data);
  }

  // I may store the services in each user DB profile later

  // addServiceToUserDbProfile(data: {}) {
  //   console.log('service added to profile');
  //   return this.afs
  //     .collection('profiles')
  //     .doc(this.userId)
  //     .update({
  //       services: firebase.firestore.FieldValue.arrayUnion(data),
  //     });
  // }

  updateService(id: string, data: {}) {
    return this.afs.collection('services').doc(id).update(data);
  }

  deleteService(id: string) {
    return this.afs.collection('services').doc(id).delete();
  }
}
