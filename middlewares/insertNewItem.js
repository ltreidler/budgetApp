const _ = require('lodash');

const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

module.exports = (date, category, value, label, place, items) => {

    //if the array is empty, just push it
    const len = items.length;
    const newItem = {date, category, value, label, place};
    if(len == 0) {
        items.push(newItem);
        return items;
    }
    //else, look at the last item in the array
    //if the date of the new item is after that, insert it into the array
    const parsedDate = new Date(date);
    const lastDate = new Date(items[len-1].date);
    if(parsedDate > lastDate) {
        items.push(newItem);
        console.log('Inserted item at final index');
        return items;
    }
    else {
        let index = null;
        let currentIndex = 0;
        let itemDate;
        // _.each(items, item => {
        //     let itemDate = new Date(item.date);
        //     currentIndex += 1;
        //     if(itemDate > parsedDate) {
        //         index = currentIndex;
        //     }
        // });
        while(index == null) {
            if(!items[currentIndex]) {
                //means that the algorithm failed
                index = -1;
            }
            itemDate = new Date(items[currentIndex].date);
            if(itemDate > parsedDate) {
                index = currentIndex;
            }

            currentIndex += 1;
        }

        if (index != -1) {
            console.log('Inserted item at index '+index);
            return insert(items, index, newItem);
        } else {
            console.log('Could not find index');
            return items;
        }
    }
}