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

    limit(limitNum: number) {
        this.query = this.query.limit(limitNum)
        return this
    }


}

export default APIFeatures