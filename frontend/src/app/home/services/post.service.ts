import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/Post";
import {Params} from "@angular/router";
import {Host} from "../../../constants/Host";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getSelectedPost(params: string){
    return this.http.get<Post[]>(`${Host.url}/api/feed${params}`)
  }
}
