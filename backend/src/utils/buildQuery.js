
function parseArrayParam(param) {
  if (!param) return undefined;
  return String(param)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function buildQueryAndSort(params) {
  const {
    search,
    customerRegion,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sortBy
  } = params;

  const query = {};
  let impossible = false;

  
  if (search && search.trim()) {
    const s = search.trim();
    const or = [];

  
    or.push({ "Customer Name": { $regex: s, $options: "i" } });

   

    if (/^\d+$/.test(s)) {
      or.push({ "Phone Number": Number(s) });
    }

    query.$or = or;
  }

  

  const regions = parseArrayParam(customerRegion);
  if (regions && regions.length) {
    query["Customer Region"] = { $in: regions };
  }

 

  const genders = parseArrayParam(gender);
  if (genders && genders.length) {
    query["Gender"] = { $in: genders };
  }


  const minAge = ageMin !== undefined && ageMin !== "" ? Number(ageMin) : undefined;
  const maxAge = ageMax !== undefined && ageMax !== "" ? Number(ageMax) : undefined;

  if (
    (ageMin !== undefined && ageMin !== "" && Number.isNaN(minAge)) ||
    (ageMax !== undefined && ageMax !== "" && Number.isNaN(maxAge))
  ) {
    impossible = true;
  } else if (minAge !== undefined || maxAge !== undefined) {
    if (minAge !== undefined && maxAge !== undefined && minAge > maxAge) {
      impossible = true;
    } else {
      query["Age"] = {};
      if (minAge !== undefined) query["Age"].$gte = minAge;
      if (maxAge !== undefined) query["Age"].$lte = maxAge;
    }
  }


  const categories = parseArrayParam(productCategory);
  if (categories && categories.length) {
    query["Product Category"] = { $in: categories };
  }


  const tagList = parseArrayParam(tags);
  if (tagList && tagList.length) {
    const pattern = tagList.join("|"); 
    query["Tags"] = { $regex: pattern, $options: "i" };
  }

  const payments = parseArrayParam(paymentMethod);
  if (payments && payments.length) {
    query["Payment Method"] = { $in: payments };
  }

  let fromD, toD;
  if (dateFrom) fromD = new Date(dateFrom);
  if (dateTo) toD = new Date(dateTo);

  if ((dateFrom && isNaN(fromD)) || (dateTo && isNaN(toD))) {
    impossible = true;
  } else if (fromD || toD) {
    query["Date"] = {};
    if (fromD) query["Date"].$gte = fromD;
    if (toD) {
      toD.setHours(23, 59, 59, 999);
      query["Date"].$lte = toD;
    }
  }

  if (impossible) {
    return { query: { _id: null }, sort: { "Date": -1 } };
  }
  
  let sort = {};
  switch (sortBy) {
    case "quantity":
      sort = { "Quantity": -1 };
      break;
    case "customerName":
      sort = { "Customer Name": 1 };
      break;
    case "date":
    default:
      sort = { "Date": -1 };
      break;
  }

  return { query, sort };
}

module.exports = { buildQueryAndSort };
