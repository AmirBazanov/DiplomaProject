import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {FeedPostEntity} from "../models/post.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FeedPost} from "../models/post.interface";
import {catchError, from, Observable, of, switchMap, throwError} from "rxjs";

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>
    ) {}
    createPost(feedPost: FeedPost): Observable<FeedPost>{
        return from(this.feedPostRepository.save(feedPost))
    }

    findAllPosts(): Observable<FeedPost[]>{
        return from(this.feedPostRepository.find())
    }

    updatePost(id: number, feedPost: FeedPost): Observable<FeedPost> {
        return from(this.feedPostRepository.update(id, feedPost)).pipe(
            switchMap((updateResult: UpdateResult) => {
                if (updateResult.affected && updateResult.affected > 0) {
                    return this.feedPostRepository.findOneOrFail({where: {id: id}});
                } else {
                    throw new HttpException('Update operation did not affect any rows.', HttpStatus.NOT_FOUND);
                }
            }),
            catchError((error) => {
                return throwError(new HttpException('Failed to retrieve the updated post: ' + error.message, HttpStatus.NOT_FOUND));
            }),
        );
    }

    deletePost(id: number): Observable<HttpStatus>{
        return from(this.feedPostRepository.delete(id)).pipe(
            switchMap((updateResult: DeleteResult) => {
                if (updateResult.affected && updateResult.affected > 0) {
                    return of(HttpStatus.OK)
                } else {
                    throw new HttpException('Delete operation did not affect any rows.', HttpStatus.NOT_FOUND);
                }
            }),
            catchError((error) => {
                return throwError(new HttpException('Failed to retrieve the deleted post: ' + error.message, HttpStatus.NOT_FOUND));
            }),
        );
    }
}
