export default class Helpers {
  static Pagination(query) {
    let initialObject = {
      pagination: {
        page: 0,
        limit: 0,
      },
      prisma: {
        skip: 0,
        take: 10,
      },
    };

    try {
      if ("page" in query && query?.page !== null && query?.page !== "") {
        Reflect.set(initialObject.pagination, "page", Number(query?.page));
      }

      if ("limit" in query && query?.limit !== null && query?.limit !== "") {
        Reflect.set(initialObject.pagination, "limit", Number(query?.limit));
        Reflect.set(initialObject.prisma, "take", Number(query?.limit));
      }

      if (("limit" in query && query?.limit === null) || query?.limit === "") {
        Reflect.set(initialObject.pagination, "limit", 0);
        Reflect.set(initialObject.prisma, "take", undefined);
      }

      let { page, limit } = initialObject.pagination;
      Reflect.set(
        initialObject.prisma,
        "skip",
        limit * (page > 0 ? page - 1 : 0)
      );
      return { ...initialObject };
    } catch (error) {
      return { ...initialObject };
    }
  }

  static Order(query) {
    const isOrderByExist =
      "orderBy" in query && query?.orderBy !== null && query?.orderBy !== "";
    const isOrderMethodExist =
      "orderMethod" in query &&
      query?.orderMethod !== null &&
      query?.orderMethod !== "";

    if (!isOrderByExist && !isOrderMethodExist) return null;

    const initialObject = [
      {
        [query?.orderBy]: query?.orderMethod,
      },
    ];

    return initialObject;
  }

  static Where(query) {
    const isWhereKeyExist =
      "whereKey" in query && query?.whereKey !== null && query?.whereKey !== "";
    const isWhereValueExist =
      "whereValue" in query &&
      query?.whereValue !== null &&
      query?.whereValue !== "";

    if (!isWhereKeyExist && !isWhereValueExist) return {};

    const initialObject = {
      [query?.whereKey]: { equals: query?.whereValue },
    };

    return initialObject;
  }
}
