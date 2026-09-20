export const getPagination = (page = 1, limit = 20) => {
    const pageNumber = Math.max(Number(page) || 1, 1);
  
    const limitNumber = Math.min(
      Math.max(Number(limit) || 20, 1),
      100,
    );
  
    const offset = (pageNumber - 1) * limitNumber;
  
    return {
      page: pageNumber,
      limit: limitNumber,
      offset,
    };
  };
  
  export const getPaginationResult = ({
    rows,
    count,
    page,
    limit,
  }) => {
    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  };