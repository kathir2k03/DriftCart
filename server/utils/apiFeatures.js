exports.search = (query, queryStr) => {
    if (queryStr.keyword) {
        const keyword = {
            name: {
                $regex: queryStr.keyword,
                $options: "i"
            }
        };

        query = query.find({ ...keyword });
    }

    return query;
};

exports.filterByCategory = (query, queryStr) => {
    if (queryStr.category) {
        query = query.find({
            category: {
                $regex: `^${queryStr.category}$`,
                $options: "i"
            }
        });
    }

    return query;
};

exports.filterByPrice = (query, queryStr) => {
    let filter = {};

    if (queryStr['price[gt]']) {
        filter.price = {
            ...filter.price,
            $gt: Number(queryStr['price[gt]'])
        };
    }

    if (queryStr['price[gte]']) {
        filter.price = {
            ...filter.price,
            $gte: Number(queryStr['price[gte]'])
        };
    }

    if (queryStr['price[lt]']) {
        filter.price = {
            ...filter.price,
            $lt: Number(queryStr['price[lt]'])
        };
    }

    if (queryStr['price[lte]']) {
        filter.price = {
            ...filter.price,
            $lte: Number(queryStr['price[lte]'])
        };
    }

    return query.find(filter);
};

exports.pagination =  (query, queryStr) => {
    const page = Number(queryStr.page) || 1;
    const limit = Number(queryStr.limit) || 10;

    const skip = (page - 1) * limit;

    return query.skip(skip).limit(limit);
};

