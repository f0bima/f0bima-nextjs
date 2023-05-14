import { PrismaClient } from "@prisma/client";
import Helpers from "../helpers";

export default class Controller {
  constructor(props = {}) {
    this.req = props?.req ?? undefined;
    this.res = props?.res ?? undefined;
    this.prisma = new PrismaClient();
    this.fields = props?.fields ?? null;
    this.key = props?.key ?? undefined;
    this.value = props?.value ?? null;

    this.tableName = props?.tableName ?? undefined;

    BigInt.prototype.toJSON = function () {
      return this.toString();
    };
  }

  async _create() {
    try {
      if (!this.tableName)
        return [new Error("tableName : table name must be defined!"), null];
      if (
        typeof this.fields !== "object" &&
        Object.keys(this.fields).length === 0
      )
        return [new Error("No data found to save", null)];

      const response = await this.prisma[this.tableName].create({
        data: this.fields,
      });

      return [null, response];
    } catch (error) {
      return [error, null];
    }
  }

  async _list() {
    const { pagination, prisma } = Helpers.Pagination(this.req.query);
    const order = Helpers.Order(this.req.query);
    const where = Helpers.Where(this.req.query);

    let result = {
      query: {
        ...this.req?.query,
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        maxPage: 0,
      },
      data: [],
    };

    let condition = {
      ...prisma,
      orderBy: order,
      where: where,
    };

    try {
      const total = await this.prisma[this.tableName].count();
      const data = await this.prisma[this.tableName].findMany(condition);

      Reflect.set(
        result.pagination,
        "maxPage",
        Math.ceil(total / pagination.limit)
      );

      Reflect.set(result.pagination, "total", total);
      Reflect.set(result.pagination, "limit", pagination.limit);
      Reflect.set(result.pagination, "page", pagination.page);
      Reflect.set(result, "data", data);

      return [null, { ...result }];
    } catch (err) {
      return [err, null];
    }
  }
  async _detail() {
    try {
      if (!isNaN(Number(this.value))) {
        this.value = Number(this.value);
      }

      const response = await this.prisma[this.tableName].findFirst({
        where: { [this.key]: this.value },
        // images: { select: { id: true, productId: true, prefix: true } },
      });
      // if (response === null) {
      //   res.status(HttpStatusCode.BadRequest);
      //   return res.json({
      //     error: true,
      //     message: err?.message,
      //   });
      // }

      return [null, response];
    } catch (error) {
      return [error, null];
    }
  }
  async _delete() {
    try {
      if (!isNaN(Number(this.value))) {
        this.value = Number(this.value);
      }
      const [err, data] = await this._detail();
      if (err) return [new Error(err?.message), null];
      if (!data) return [new Error("Data not found"), null];

      const response = await this.prisma[this.tableName].delete({
        where: { [this.key]: this.value },
        // images: { select: { id: true, productId: true, prefix: true } },
      });

      return [null, response];
    } catch (error) {}
  }
}
