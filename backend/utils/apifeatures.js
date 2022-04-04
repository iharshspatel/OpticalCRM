const { colours } = require("nodemon/lib/config/defaults");

class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

 



    search() {
        const keyword = this.queryStr.keyword ?  {
            client_id:this.queryStr.id,
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            }
        
        } :(this.queryStr.id ? {client_id:this.queryStr.id} : {})
        // console.log({...keyword});
        this.query = this.query.find({...keyword}).sort({_id: -1 })
    //    console.log(this.query)
        return this;
        
    };


    filter(){
        const queryCopy = {...this.queryStr}
        
        //Removing some fields for category
        
        const removeFields = ["keyword","page", "limit"];
        
        removeFields.forEach(key => delete queryCopy[key])
        
        
        //Filter for Price and Rating
        
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        
        
        
        this.query = this.query.find(JSON.parse(queryStr))   ;
        
        console.log(this.query)
        return this;

        
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage*(currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        
        return this;

    }



}

module.exports = ApiFeatures