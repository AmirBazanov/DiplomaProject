import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent  implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async presentModal(){
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: "modal-class"
    })
    await modal.present()
  }

}
