import TodoController from "@app/src/controllers/todo.controller";
import ErrorHandler from "@app/src/handlers/error.handler";
import { TodoValidator } from "@app/src/validators/todo.validator";
import { HttpStatusCode } from "axios";
import nc from "next-connect";

const handler = nc(ErrorHandler);
/**
 * DEFAULT dari next js
 * @param req
 * @param res
 */

handler
  .post(TodoValidator.create, async (req, res) => {
    try {
      const [err, data] = await new TodoController({
        fields: req.body?.todo,
      })._create();

      if (err) {
        res.status(HttpStatusCode.BadRequest);
        return res.json({
          error: true,
          message: err?.message,
        });
      }

      return res.json({
        error: false,
        data: data,
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
  .get(async (req, res) => {
    try {
      const [err, { pagination, query, data }] = await new TodoController({
        req,
      })._list();

      if (err) {
        res.status(400);
        return res.json({
          error: true,
          message: err?.message,
        });
      }

      res.status(200);
      return res.json({
        pagination,
        query,
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
    //logic
  })
  .put(async (req, res) => {
    //logic
  });

export default handler;
