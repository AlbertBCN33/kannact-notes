import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { iNote, Note, NoteItem } from '../../shared/models/note.model';
import { NotesService } from './notes.service';
import { SortTypes } from 'src/app/shared/models/sorting.model';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit, OnDestroy {

	private unsubscribe: Subject<void> = new Subject<void>();

	// Form
	componentForm: FormGroup;

	// Data
	notesList: NoteItem[] = [];
	SortTypes = SortTypes;

	constructor(
		private fb: FormBuilder,
		private notesService: NotesService
	) {
		this.componentForm = this.setForm();
	}

	ngOnInit(): void {
		this.getNotes();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	setForm = (): FormGroup => this.fb.group({
		description: [null, Validators.required],
		isFlagged: [false],
		filterCreationDate: [SortTypes.DESC],
		filterSearch: []
	});

	getNotes = (): void => {
		// Reset previous values
		this.notesList.length = 0;

		// Get data
		this.notesService.getAll().pipe(takeUntil(this.unsubscribe)).subscribe((response: iNote[]) => {
			if (response?.length > 0) 
				this.notesList = response.map((doc) => new NoteItem(doc));
				this.sortBy();
		});
	}

	createNote = (): void => {
		// Set new note
		const newNote: Note = new Note({
			coachFullname: 'James Brown', // Mocked data
			creationDate: Timestamp.now(),
			isFlagged: this.componentForm.get('isFlagged')?.value,
			description: this.componentForm.get('description')?.value
		});
		// Request
		this.notesService.create(Object.assign({}, newNote)).then((response) => {
			// Reset form
			this.componentForm.get('description')?.reset(null);
			this.componentForm.get('isFlagged')?.reset(false);
		});
	}

	updateNote = (note: NoteItem): void => {
		// Update note
		const updatedNote: Note = new Note(Object.assign({}, note, { updatedDate: Timestamp.now() }));
		// Request
		this.notesService.update(Object.assign({}, updatedNote)).then((response) => {});
	}

	deleteNote = (note: NoteItem): void => {
		this.notesService.delete(note).then((response) => {});
	}

	// Flag
	toggleFlag = (note: NoteItem): void => {
		// Change flag status
		note.isFlagged = !note.isFlagged;

		this.notesService.updateFlag(note).then((response) => {
			// Update sorted list
			this.sortBy();
		});
	}

	/**
	 * Sort: client-side
	 * @description Sort by multiple fields. Always sort by flagged notes first, 
	 * and then sort by the creation date (ascending/descending)
	 */
	sortBy = (changed?: boolean): void => {
		// Set descending or ascending sorting
		if (changed) this.componentForm.get('filterCreationDate')?.patchValue(this.componentForm.get('filterCreationDate')?.value === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC);
		
		// Sort
		if (this.componentForm.get('filterCreationDate')?.value === SortTypes.DESC) 
			this.notesList.sort((a, b) => +b.isFlagged - +a.isFlagged || (b?.createdOn?.getTime() as number) - (a?.createdOn?.getTime() as number));
		else if (this.componentForm.get('filterCreationDate')?.value === SortTypes.ASC)
			this.notesList.sort((a, b) => +b.isFlagged - +a.isFlagged || (a?.createdOn?.getTime() as number) - (b?.createdOn?.getTime() as number));

		this.notesList = [...this.notesList];
	}

	clearSearch = (): void => this.componentForm.get('filterSearch')?.reset(null);

}
