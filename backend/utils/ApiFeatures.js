class ApiFeatures {
    constructor(query, query_str) {
        // stores the query string in class funtion
        this.query = query;
        this.queryStr = query_str;

    }
    search_feature() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            } : {

            }


        this.query = this.query.find({ ...keyword })
        return this;

    }

    filter() {
        const query_copy = { ...this.queryStr }
        const remove_query = ["keyword", "page", "limit"]
        remove_query.forEach(key => delete query_copy[key]);

        // ------------------> query prizes filter
        // Convert query_copy values to the required format
        // const query_str = JSON.stringify(query_copy).replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);


        this.query = this.query.find(query_copy);
        return this;

    }

    pagination(result_per_page) {
        const current_page = Number(this.queryStr.page)||4;
        this.query = this.query
            .limit(result_per_page)
            .skip(result_per_page * (current_page-1));
        
        this.query
        return this;
    }



}

module.exports = ApiFeatures;