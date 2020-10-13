const _ = require('lodash');


module.exports = (items) => {
        var len = items.length;
        for(let j = len-1; j>=0; j--){
            for(let i=0; i < len-1; i++) {

                let firstDate = items[i].date;
                let secondDate = items[i+1].date;
                console.log(items[i].date);
                console.log(secondDate<firstDate);
                if(secondDate<firstDate) {
                    let temp = items[i+1];
                    items[i+1] = items[i];
                    items[i] = temp;
                }
            }
        } 
        return items;
}