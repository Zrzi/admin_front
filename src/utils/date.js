import moment from 'moment'

export function dateFormat(row, column) {
    //console.log(row, column)
    const date = row[column.property]
    if (date === undefined) {
        return ''
    }
    // 这里的格式根据需求修改
    return moment(date).format('YYYY-MM-DD')
}
export function dateDetailFormat(row) {
    const date = row
    if (date === undefined||date===null) {
        return ''
    }
    // 这里的格式根据需求修改
    return moment(date).format('YYYY-MM-DD')
}
export function timeDetailFormat(btime,etime) {
    const bdate =btime
    const edate=etime
    if (bdate === undefined||edate===undefined||edate===null||bdate===null) {
        return ''
    }
    // 这里的格式根据需求修改
    return moment(bdate).format('hh:mm')+'-'+moment(edate).format('hh:mm')
}
export function timeFormat(row, column) {
    //console.log("时间"+column)
    const date =column
    if (date === undefined||date===null) {
        return ''
    }
    // 这里的格式根据需求修改
    return moment(date).format('hh:mm')
}

// export default {
//     name: 'order-list',
//     props: ['value'],
//     methods: {
//         // 编写日期格式化方法
//         dateFormat: function (row, column) {
//             console.log(row, column)
//             const date = row[column.property]
//             if (date === undefined) {
//                 return ''
//             }
//             // 这里的格式根据需求修改
//             return moment(date).format('YYYY-MM-DD')
//         },
//         timeFormat: function (row, column) {
//             console.log(row, column)
//             const date = row[column.property]
//             if (date === undefined) {
//                 return ''
//             }
//             // 这里的格式根据需求修改
//             return moment(date).format('HH:mm:ss')
//         }
//
//     }
// }

