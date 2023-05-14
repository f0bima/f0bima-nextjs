import Controller from "./controller";

export default class TodoController extends Controller {
  constructor(props) {
    super(props);

    this.tableName = "todo";
  }
}
