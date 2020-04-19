
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.sass']
})

export class UploadMediaComponent implements OnInit {

  @Input() file: File;
  @Output() downloadMediaUrl: EventEmitter<string>;
  @Output() uploadTask: EventEmitter<any>;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  uploadCancelled: boolean;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {
    this.downloadMediaUrl = new EventEmitter();
    this.uploadTask = new EventEmitter();
    this.uploadCancelled = false;
  }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    // The storage path
    const id = `${Date.now()}_${this.file.name}`
    let path = '';

    if (this.file.type.startsWith('image/')) {
      path = `images/${id}`;
    } else if (this.file.type.startsWith('video/')) {
      path = `videos/${id}`;
    } else {
      return
    }

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Pass the main task to create-post.component.ts
    this.uploadTask.emit(this.task);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      // tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        // console.log(this.downloadURL);

        this.downloadMediaUrl.emit(this.downloadURL);

        this.db.collection('files').add({ downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  cancelUpload() {
    this.task.cancel();
    this.uploadCancelled = true;
  }

}
