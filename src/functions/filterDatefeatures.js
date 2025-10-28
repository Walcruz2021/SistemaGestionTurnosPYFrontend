import listDate from "./dates.json"

export default function filterDatefeatures(data) {

    const arrayDate = []
    const cant = 5
    let j = 1

    while (j <= cant) {
        if (data >= 12) {
            data = 0
            arrayDate.push(listDate[data])
            data++
            j++
        } else {
            arrayDate.push(listDate[data])
            data++
            j++
        }
    }

    return arrayDate
}

