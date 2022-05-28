import { Injectable } from '@angular/core';
import {
    Firestore,
    CollectionReference,
    DocumentData,
    collection,
    addDoc,
    collectionData,
    deleteDoc,
    doc,
    setDoc,
    updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { iNote, Note } from 'src/app/shared/models/note.model';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    // Firebase collectio reference
    private readonly collectionRef: CollectionReference<DocumentData> = collection(this.firestore, 'notes');
    
    constructor(
        private firestore: Firestore
    ) {
    }

    create = (note: Note): Promise<any> => addDoc(this.collectionRef, note);

    update = (note: Note): Promise<void> => {
        const docRef = doc(this.firestore, `notes/${note.id}`);
        return setDoc(docRef, note);
    }

    delete = (note: Note): Promise<void> => {
        const docRef = doc(this.firestore, `notes/${note.id}`);
        return deleteDoc(docRef);
    }

    getAll = (): Observable<iNote[]> => collectionData(this.collectionRef, { idField: 'id' }) as Observable<iNote[]>;

    updateFlag = (note: Note): Promise<void> => {
        const docRef = doc(this.firestore, `notes/${note.id}`);
        return updateDoc(docRef, { isFlagged: note.isFlagged });
    }

}