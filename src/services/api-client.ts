import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key: '8871779f948542c8b6a387351db26075' // this is a free trial key please replace it with yours from https://rawg.io/apidocs
    }
})