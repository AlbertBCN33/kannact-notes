import { Timestamp } from 'firebase/firestore';


/* Database model */

export interface iNote {
    id?: string | undefined;
    coachFullname: string | undefined;
    creationDate: Timestamp | undefined;
    updatedDate?: Timestamp | undefined;
    description: string | undefined;
    isFlagged: boolean;
}

export class Note implements iNote {
    id?: string | undefined;
    coachFullname: string | undefined;
    creationDate: Timestamp | undefined;
    updatedDate?: Timestamp | undefined;
    description: string | undefined;
    isFlagged: boolean;

    constructor(params?: Partial<iNote>) {
        if (params?.id) this.id = params.id;
        if (params?.coachFullname) this.coachFullname = params.coachFullname;
        if (params?.creationDate) this.creationDate = params.creationDate;
        if (params?.updatedDate) this.updatedDate = params?.updatedDate;
        if (params?.description) this.description = params?.description;
        if (params?.isFlagged || params?.isFlagged === false) this.isFlagged = params.isFlagged 
            else this.isFlagged = false;
    }

}

/* Frontend model */

export interface iNoteItem extends iNote {
    readonly: boolean;
}

export class NoteItem extends Note {
    createdOn: Date | undefined;
    updatedOn: Date | undefined;
    readonly: boolean;

    constructor(params?: Partial<iNoteItem>) {
        super(params);
        this.createdOn = params?.creationDate ? new Date(params.creationDate.toDate()) : undefined;
        this.updatedOn = params?.updatedDate ? new Date(params.updatedDate.toDate()) : undefined;
        this.readonly = params?.readonly || params?.readonly === false ? params.readonly : true;
    }

}