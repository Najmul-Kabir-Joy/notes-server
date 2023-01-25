const pagination = (page, limit) => {
  const offset = page * limit;
  return {
    limit,
    offset,
  };
};

const prepareQueryForNotes = (search, sort, email) => {
  let query = { email: email };
  if (search !== "" && search !== '""') {
    query.title = { $regex: search.replace(/"/g, ""), $options: "i" };
  }
  if (sort !== "all") {
    query.tag = sort;
  }

  return query;
};

module.exports = {
  pagination,
  prepareQueryForNotes,
};
