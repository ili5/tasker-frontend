import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BoardModel} from "./models/BoardModel";

@Injectable()
export class BoardService {
  private boardSource = new BehaviorSubject<BoardModel>(new BoardModel());
  currentBoard = this.boardSource.asObservable();

  private boardsSource = new BehaviorSubject<BoardModel[]>([]);
  currentBoards = this.boardsSource.asObservable();

  changeBoard(board: BoardModel) {
    this.boardSource.next(board);
  }

  changeBoards(boards: BoardModel[]) {
    this.boardsSource.next(boards);
  }
}
