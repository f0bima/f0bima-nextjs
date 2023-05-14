import TodoController from "@app/src/controllers/todo.controller";
import ErrorHandler from "@app/src/handlers/error.handler";
import { HttpStatusCode } from "axios";
import nc from "next-connect";

const handler = nc(ErrorHandler);
/**
 * DEFAULT dari next js
 * @param req
 * @param res
 */

handler
  .get(async (req, res) => {
    try {
      const { id } = req.query;
      const [err, data] = await new TodoController({
        key: "id",
        value: id,
      })._detail();

      if (err) {
        res.status(HttpStatusCode.BadRequest);
        return res.json({
          error: true,
          message: err?.message,
        });
      }
      return res.json({
        error: false,
        status: 200,
        message: "OK",
        data,
      });
    } catch (err) {
      res.status(500);
      return res.json({
        error: true,
        status: 500,
        message: err?.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.query;
      const [err, data] = await new TodoController({
        key: "id",
        value: id,
      })._delete();

      if (err) {
        res.status(HttpStatusCode.BadRequest);
        return res.json({
          error: true,
          message: err?.message,
        });
      }

      return res.json({
        error: false,
        status: 200,
        message: "OK",
        data,
      });
    } catch (err) {
      res.status(500);
      return res.json({
        error: true,
        status: 500,
        message: err?.message,
      });
    }
  });

export default handler;
