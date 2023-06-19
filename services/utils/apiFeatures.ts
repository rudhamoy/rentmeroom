class APIFeatures {
    constructor(query: any, queryStr: any) {
        this.query = query;
        this.queryStr = queryStr;
    }


    filter() {
        const queryCopy = this.queryStr;
        this.query.find(queryCopy)
        return this
    }

    priceRange(price: any) {
        this.query.find({
            pricePerMonth: {
                $gte: price[0],
                $lte: price[1]
            }
        })
        return this
    }

    address(locations) {
        this.query.find({
            address: locations
        })
        
        return this
    }

    pagination(resPerPage: number) {
        const currentPage = this.queryStr.page || 1;
        const skip = resPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
      }

    // limit(limitNum: number) {
    //     this.query = this.query.limit(limitNum)
    //     return this
    // }


}

export default APIFeatures