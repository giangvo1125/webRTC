//services loading UI
export const loading_gif = '<div class="blockui-default-message"><i style="color: grey;" class="fa fa-spinner fa-pulse fa-3x fa-fw color-string"/></div>';
export const loading_non_gif = '<div></div>';
// NProgress.configure({
//     parent: '#loading-bar', 
//     positionUsing: 'translate', 
//     showSpinner: false,
// });

export const blockUI = (isBlock) => {
    let loading_template = loading_gif;
    if(isBlock == true) {
        
        $.blockUI({
            baseZ: 2000,
            message: loading_template,
            css: {
                border: 'none',
                backgroundColor: 'transparent'
            },
            overlayCSS: { backgroundColor: 'none' }
        });
    }
    else if(isBlock == false) {
        $.unblockUI();
    }
};


export const getFullName = (first, middle, last) => {
    return `${first ? first : ''} ${middle? middle : ''} ${last? last : ''}`
}

export const getUserName = (id, messages) => {
    let name = 'not in list'
     messages.forEach((msg) => {
        if (msg.from === id)
        {
            name = msg.fromName
        }
    })
    return name;
}

export const checkItemInList = (item, list, valueName = null) => {
    if (list.length > 0) {
        for (let index = 0; index < list.length; index += 1) {
            if(valueName) {
                if(list[index][valueName] === item) {
                    return index;
                }
            } else {
                if(list[index] === item) {
                    return index;
                }
            }
        }
        return -1;
    } else {
        return -1;
    }
}

export const convertStatusValueToText = (status) => {
    switch (status)
    {
        case 0:
            return 'Requested';
        case 1:
            return 'Pending';
        case 2:
            return 'Verified';
        case 3:
            return 'Incomplete';
        case 4:
            return 'Canceled';
        default:
            return 'wrong status'
    }
};

export const getLocalTime = (verify_time) => {
    let utc = moment.utc(verify_time)
    return utc.local()
}

export const permissionToText = (permission) => {
    switch (permission)
    {
        case '1':
            return 'Only Me';
        case 1:
            return 'Only Me';
        case '2':
            return 'Share when Authorized';
        case 2:
            return 'Share when Authorized';
        default:
            return ''
    }
};

export const convertCompanyName = (RefType, owner) => {
    switch (RefType)
    {
        case 0:
            return owner.last_company;
        case 1:
            return owner.last_school;
        case 2:
            return 'Document';
        default:
            return ''
    }
};

export const getVerificationRequestTypeText = (type) => {
    switch (type)
    {
        case 0:
            return 'Experience';
        case 1:
            return 'Education';
        case 2:
            return 'Other';
        default:
            return 'wrong type'
    }
}

export const blockElement = (isBlock, Id) => {
    if(isBlock == true) {
        $(`#${Id}`).block({
            message: loading_gif, 
            css: {
                border: 'none',
                backgroundColor: 'transparent', 
                marginBottom: '20px', 
            },
            overlayCSS: { backgroundColor: 'none' }, 
            blockMsgClass: 'block-msg-default'
        });
    }
    else {
        $(`#${Id}`).unblock()
    }
}

export const showNotify = (title, text, type, position) => {
    $.notify({
        title: title,
        text: text,
        // image: "<i class='"+icon+"'></i>"
    }, {
        style: 'metro',
        className: type,
        globalPosition:position,
        showAnimation: "show",
        showDuration: 0,
        hideDuration: 0,
        autoHideDelay: 5000,
        autoHide: true,
        clickToHide: true
    });
};

export const sort_by = (field, reverse, primer) => {

   var key = primer ?
       (x) => {return primer(x[field])} :
       (x) => {return x[field]};

   reverse = !reverse ? 1 : -1;

   return (a, b) => {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

export const normalString = '^[a-z0-9]*$';
export const regexPassword = '^(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
export const regexFile = /^(data:image|data:application)\/(png|jpg|pdf|vnd.ms-excel|zip);base64,/;
export const regexString = '^[a-zA-Z0-9\\s\\-\\.]{1,}$';
export const regexYear = '^\\d{4}$';
export const regexEmail = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
export const regexNumber = '^\\d+$';
export const regexUrl = "^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"

export const getUrlParameter = (key) => {
    let pageUrl = decodeURIComponent(window.location.search.substring(1)),
        paramsUrl = pageUrl.split('&'),
        paramsName,
        i;
    for (i = 0; i < paramsUrl.length; i++) {
        paramsName = paramsUrl[i].split('=');

        if (paramsName[0] === key) {
            return paramsName[1] === undefined ? true : paramsName[1];
        }
    }
}

export const compareDate = (date1, date2, condition) => {
    let run_date1 = new Date(date1)
    let run_date2 = new Date(date2)
    if(condition == true) {
        if(run_date1 > run_date2) {
            // date1 = moment(date2).format('MM/DD/YYYY');
            return moment(date2).format('MM/DD/YYYY');
        }
        else
            return date1;
    }
    else if(condition == false) {
        if(run_date1 < run_date2) {
            // date1 = moment(date2).format('MM/DD/YYYY');
            return moment(date2).format('MM/DD/YYYY');
        }
        else
            return date1;
    }
    else {
        return null;
    }
}
export const formatTime = (value) => {
        const offset =  -(new Date().getTimezoneOffset() / 60);
        // return moment(value).add(7, 'hours').fromNow();
        return moment(value).fromNow();
}
export const base64ToArrayBuffer = (base64) => {
    let binaryString = window.atob(base64.replace(regexFile,''));
    let binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        let ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
export const saveByteArray = (fileName, byte) => {
    var blob = new Blob([byte]);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var timeNow = new Date();
    var month = timeNow.getMonth() + 1;
    link.download = fileName;
    link.click();
};

export const saveByUrl = (fileName, url) => {
    var link = document.createElement('a');
    link.href = url;
    var timeNow = new Date();
    var month = timeNow.getMonth() + 1;
    link.download = fileName;
    link.click();
}

export const generateString = (length) => {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    var string_length = 6
    if(length != '' && length != null && length != undefined) {
        string_length = length
    }
    for (var i = 0, n = charset.length; i < string_length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const newTabByUrl = (url) => {
    if(url!= null && url != '') {
        window.open(url, '_blank');
        //url truyen vao phai co dang http://xxxx hay https://xxxx
    }
}

export const checkData = (data) => {
    if(data !== undefined && data !== null && data != '') {
        return true;
    }
    else {
        return false;
    }
}

export const checkObj = (obj) => {
    if(checkData(obj) && !_.isEmpty(obj)) {
        return true;
    }
    else {
        return false;
    }
}

export const checkTrueData = (data, key) => {
    let type = typeof key;
    let value_number,value_string;
    let isCheck = false
    if(type == 'number') {
        value_number = key;
        value_string = key.toString();
        isCheck = true;
    }
    else if(type == 'string') {
        value_number = parseInt(key);
        value_string = key;
        isCheck = true;
    }

    if(isCheck == true) {
        if(data == value_number || data == value_string) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export const isNotExisted = (data, arrayKey) => {
    let isNotExisted = true;
    for(let i = 0; i < arrayKey.length; i++) {
        if(arrayKey[i].type == 'indexOf') {
            if(data.indexOf(arrayKey[i].value) != -1) {
                isNotExisted = false;
            }
        }
        else {
            if(data == arrayKey[i].value) {
                isNotExisted = false;
            }
        }
    }
    return isNotExisted;
}

export const isExistedInArray = (array, obj, keyFound) => {
    let isExisted = false;
    for(let i = 0; i < array.length; i++) {
        if (checkData(array[i][keyFound])) {
            if(array[i][keyFound] == obj[keyFound]) {
                isExisted = true;
                break;
            }
        }
    }
    return isExisted;
}

export const isExistedDataInArray = (array, data) => {
    let isExisted = false;
    for(let i = 0; i < array.length; i++) {
        if(array[i] == data) {
            isExisted = true;
        }
    }
    return isExisted;
}

export const countItemObjHasValue = (obj) => {
    let count = 0;
    for(let key in obj) {
        if(Helper.checkData(obj[key])) {
            count++;
        }
    }
    return count;
}

export const getObjFromArray = (array, key, value) => {
    let obj = {}
    if(Array.isArray(array)) {
        obj = _.find(array, (item) => {
            return item[key] == value;
        })
    }
    return obj;
}
export const checkArray = (array) => {
    if(Array.isArray(array) && array.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

export const renameObjectKey = (obj, oldKey, newKey) => {
    let newObj = {}
    _.forEach(obj, (value, key) => {
        if(key == oldKey) {
            key = newKey || key
            newObj[key] = value
        }
        else {
            newObj[key] = value
        }
    })
    return newObj
}

export const showPopUpDelete = (callback, textString, confirmBtnText) => {
    swal({
        title: "Are you sure?",
        text: textString,
        showCancelButton: true,
        cancelButtonClass: "btn-default",
        confirmButtonClass: "btn-danger",
        confirmButtonText: confirmBtnText || "Delete",
        closeOnConfirm: true, 
        imageUrl: "/assets/css/images/ic_confirm.png",
    },
    () => {
        callback();
    });
}

export const getLineFromString = (textLength, Elementwidth) => {
    const charW = 81/11;
    let lines = parseInt((charW * textLength)/Elementwidth) + 1
    return lines
}

export const resizeTextarea = (element, stringValue) => {
    let strArray = stringValue.split('\n')
    let lines = strArray.length - 1;
    strArray.forEach(str => {
        lines += getLineFromString(str.length, element.width()) - 1
    })
    if(lines > 3){
        element.css('minHeight',(lines*20 + 36).toString()+'px')
        element.css('maxHeight',(lines*20 + 36).toString()+'px')
    }else{
        element.css('minHeight','98px')
        element.css('maxHeight','98px')
    }
}

export const convertObjToArr = (obj) => {
    let arr = []
    if(Helper.checkObj(obj)) {
        for(let key in obj) {
            let data = obj[key];
            data.key = key;
            arr.push(data);
        }
        return arr;
    }
    else {
        return arr;
    }
}

export const getMessageFromUser = (array, id) => {
    function getFromName(item, idKey) {
        for(let k in item) {
            if(item[k].from == parseInt(idKey)) {
                item.fromName = item[k].fromName
            }
            else {
                item.fromName = item[k].toName
            }
            break;
        }
    }
    let arr = array.filter((item) => {
        let key = item.key;
        let index_symbol = key.indexOf('-')
        let id1 = key.substr(0, index_symbol);
        let id2 = key.substr(index_symbol + 1, key.length);
        if(Helper.checkTrueData(id, id1) || Helper.checkTrueData(id, id2)) {
            if(Helper.checkTrueData(id, id1)) {
                item.from = parseInt(id2);
                getFromName(item, item.from)
            }
            else {
                item.from = parseInt(id1);
                getFromName(item, item.from)
            }
            return item;
        }
    });
    return arr;
}

export const getDateTimeForMessage = (date) => {
    let returnDate = ''
    let now = moment();
    if(moment(date).isSame(now, 'd')) {
        returnDate = moment(date).format('HH:mm')
    }
    else {
        let range = now.diff(moment(date), 'days')
        if(range <= 7) {
            returnDate = moment(date).format('ddd')
        }
        else {
            returnDate = moment(date).format('DD MMM')
        }
    }
    return returnDate;
}

export const makeObjVerifyExp = (data) => {
    let obj = {}
    for(let key in data) {
        if(key == 'request_time') {
            obj.created_date = moment(data[key]).format('MM/DD/YYYY')
        }
        else if(key == 'verifyItem') {
            obj.document_list = data[key].document_list;
        }
        else if(typeof data[key] === 'object' &&  checkObj(data[key]) && (key != 'verifyItem' && key != 'owner' && key != 'document_list' && key != 'verification_document')) {
            for(let childKey in data[key]) {
                if(childKey == 'status') {
                    obj[`${key}_status`] = data[key][childKey]
                }
                else if(childKey == 'employment_date_from' || childKey == 'employment_date_to') {
                    obj[childKey] = moment(data[key][childKey], 'YYYY-MM-DD HH:mm:ss').format('MM/YYYY')
                }
                else if(childKey == 'request_time') {
                    obj[childKey] = moment(data[key][childKey], 'YYYY-MM-DD HH:mm:ss').format('MMM D YYYY')
                }
                else if(childKey == 'transaction') {
                    obj[`${key}_${childKey}`] = data[key][childKey]
                }
                else {
                    obj[childKey] = data[key][childKey]
                }
            }
        }
        else if(key == 'verification_document') {
            obj[`${key}_transaction`] = data[key].transaction
            obj.document_list = Helper.formatDate(data[key].documents, 'created_date', 'MM/DD/YYYY HH:mm a')
        }
        else {
            obj[key] = data[key]
        }
    }
    return obj;
}

export const makeObjVerifyEdu = (data) => {
    let obj = {}
    for(let key in data) {
        if(key == 'request_time') {
            obj.created_date = moment(data[key]).format('MM/DD/YYYY')
        }
        else if(key == 'verifyItem') {
            obj.document_list = data[key].document_list;
        }
        else if(typeof data[key] === 'object' &&  checkObj(data[key]) && (key != 'verifyItem' && key != 'owner' && key != 'document_list' && key != 'verification_document')) {
            for(let childKey in data[key]) {
                if(childKey == 'status') {
                    obj[`${key}_status`] = data[key][childKey]
                }
                else if(childKey == 'graduation_date') {
                    obj[childKey] = moment(data[key][childKey], 'YYYY-MM-DD HH:mm:ss').format('MMM D YYYY')
                }
                else if(childKey == 'request_time') {
                    obj[childKey] = moment(data[key][childKey], 'YYYY-MM-DD HH:mm:ss').format('MMM D YYYY')
                }
                else if(childKey == 'transaction') {
                    obj[`${key}_${childKey}`] = data[key][childKey]
                }
                else {
                    obj[childKey] = data[key][childKey]
                }
            }
        }
        else if(key == 'verification_document') {
            obj[`${key}_transaction`] = data[key].transaction
            obj.document_list = Helper.formatDate(data[key].documents, 'created_date', 'MM/DD/YYYY HH:mm a')
        }
        else {
            obj[key] = data[key]
        }
    }
    return obj;
}

export const checkDataArray = (data, array) => {
    let isCheck = false;
    array.forEach((item) => {
        if(checkTrueData(data, item))
            isCheck = true;
    });
    return isCheck;
}

export const formatDate = (array, key, format) => {
    array.forEach((item) => {
        item[key] = moment(item[key]).format(format)
    })
    return array;
}

export const makeDataOdd = (data) => {
    let returnData = [];
    if(Helper.checkArray(data)) {
        data.map((item) => {
            let obj = {
                Id: item.Id, 
                Name: item.Name, 
                Matches: [], 
            };
            item.Matches.map((match) => {
                let objMatch = {
                    Id: match.Id, 
                    Start: match.Start, 
                    Status: match.Status, 
                    Team1: match.Team1, 
                    Team2: match.Team2, 
                    Periods: []
                }
                let arrayLength = []
                if(match.Periods[0] !== null) {
                    if(Helper.checkArray(match.Periods[0].Spreads))
                        arrayLength.push(match.Periods[0].Spreads.length)
                    if(Helper.checkArray(match.Periods[0].Totals))
                        arrayLength.push(match.Periods[0].Totals.length)
                }
                if(match.Periods[1] !== null) {
                    if(Helper.checkArray(match.Periods[1].Spreads))
                        arrayLength.push(match.Periods[1].Spreads.length)
                    if(Helper.checkArray(match.Periods[1].Totals))
                        arrayLength.push(match.Periods[1].Totals.length)
                }
                arrayLength.sort();
                let length = arrayLength[arrayLength.length - 1];
                for(let i = 0; i < length; i++) {
                    let objPeriod = {
                        fullTime: {}, 
                        firstTime: {}, 
                    };
                    if(i == 0) {
                        if(Helper.checkObj(match.Periods[0]) && Helper.checkArray(match.Periods[0].MoneyLine))
                            objPeriod.fullTime.MoneyLine = match.Periods[0].MoneyLine;
                        if(Helper.checkObj(match.Periods[1]) && Helper.checkArray(match.Periods[1].MoneyLine))
                            objPeriod.firstTime.MoneyLine = match.Periods[1].MoneyLine;
                    }
                    if(Helper.checkObj(match.Periods[0])) {
                        if(Helper.checkArray(match.Periods[0].Spreads) && checkObj(match.Periods[0].Spreads[i])) {
                            objPeriod.fullTime.Spreads = match.Periods[0].Spreads[i];
                        }
                        if(Helper.checkArray(match.Periods[0].Totals) && checkObj(match.Periods[0].Totals[i])) {
                            objPeriod.fullTime.Totals = match.Periods[0].Totals[i];
                        }
                    }
                    if(Helper.checkObj(match.Periods[1])) {
                        if(Helper.checkArray(match.Periods[1].Spreads) && checkObj(match.Periods[1].Spreads[i])) {
                            objPeriod.firstTime.Spreads = match.Periods[1].Spreads[i];
                        }
                        if(checkArray(match.Periods[1].Totals) && checkObj(match.Periods[1].Totals[i])) {
                            objPeriod.firstTime.Totals = match.Periods[1].Totals[i];
                        }
                    }
                    objMatch.Periods.push(objPeriod);
                }
                obj.Matches.push(objMatch)
            })
            if(Helper.checkArray(obj.Matches))
                returnData.push(obj);
        })
    }
    return returnData;
}

export const _calculatorWinbet =  [
    //american - 0
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds)
        let result = 0
        if (odds < 0) {
            result = (odds / -100) * betMoney
        } else {
            result = (odds / 100) * betMoney
        }
        return result
    },
    //malaysia - 1
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds)
        let result = 0
        if (odds < 0) {
            result = betMoney
        } else {
            result = odds * betMoney
        }
        return result
    },
    //decimal - 2,
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds)
        const result = (odds - 1) * betMoney
        return result
    },
    //indo - 3,
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds)
        if (odds > 0) {
            return odds * betMoney
        } else {
            return betMoney
        }
    }
]

export const _parseOddsArray = [
    [
        function(value) {
            return value
        }, //0-0
        function(value) { //0-1: american-malay
            return (-100 / value)
        },
        function(value) { //0-2: american-decimal
            switch (true) {
                case (value >= 0):
                    return ((value / 100) + 1)
                case (value < 0):
                    return ((-100 / value) + 1)
                default:
                    return value
            }
        },
        function(value) { //0-3: american-indo
            switch (true) {
                case (value >= 0):
                    return (value / 100)
                case (value < 0):
                    return (value / 100)
                default:
                    return value
            }
        }
    ],
    [
        function(value) { //1-0: malay-american
            return (-100 / value)
        },
        function(value) { //1-1: malay-malay
            return value
        },
        function(value) { //1-2 malay-decimal
            let result = 0
            if (value > 0) {
                result = (value + 1)
            } else {
                result = (-1 / value) + 1
            }
            return result
        },
        function(value) {
            return -1 / value
        },
        function(value) {
            let result = 0
            if (value > 0) {
                result = (value)
            } else {
                result = (-1 / value)
            }
            return result
        }
    ],
    [
        function(value) { //2-0: decimal-american
            switch (true) {
                case (value >= 2):
                    return ((value - 1) * 100)
                case (value < 2):
                    return (-100 / (value - 1))
                default:
                    return ''
            }
        },
        function(value) { //2-1: decimal-malay
            let result = null
            if (value >= 2) {
                result = value - 1
            } else {
                result = -1 / (value - 1)
            }
            return result
        },
        function(value) { //2-2: decimal-decial
            return value
        },
        function(value) { //2-3: decimal-indo
            let result = null
            if (value >= 2) {
                result = value - 1
            } else {
                result = -1 / (value - 1)
            }
            return result
        },
        function(value) { //2-3: decimal-hongkong
            return value - 1
        }
    ],
    [
        function(value) { //3-0: indo-american
            switch (true) {
                case (value >= 1):
                    return (value * 100)
                case (value < 1):
                    return (value * 100)
            }
        },
        function(value) { //3-1 indo-malay
            return -1 / value
        },
        function(value) { //3-2 indo-decimal
            let result = 0
            if (value > 0) {
                result = (value + 1)
            } else {
                result = (-1 / value) + 1
            }
            return result
        },
        function(value) { //3-3 indo-indo
            return value
        },
        function(value) { //3-4 indo-hongkong
            let result = 0
            if (value > 0) {
                result = (value)
            } else {
                result = (-1 / value)
            }
            return result
        }
    ]
]

export const roundOdds = (odds) => {
    let finalOdds = null
    if (odds) {
        let oriOdds = odds
        let subOdds = parseFloat(oriOdds.toString().substring(0, oriOdds > 0 ? 4 : 5))

        if (oriOdds == subOdds) {
            finalOdds = (oriOdds).toFixed(2)
        } else {
            if (oriOdds < 0) {
                finalOdds = (subOdds - 0.01).toFixed(2)
            } else {
                finalOdds = (subOdds).toFixed(2)
            }
        }
    }
    return finalOdds
}

export const _parseOddsEntry = (objOdds, oddsEntry, percent = 0, notRound = true) => {
    let temp = null
    switch (true) {
        //same odds
        case (objOdds.type == oddsEntry):
            return objOdds.value < 0 ? (objOdds.value*(1 + percent/100)).toFixed(2) : (objOdds.value*(1 - percent/100)).toFixed(2)
            //another odds
        case (objOdds.type != oddsEntry):
            switch (true) {
                case (objOdds.type == null):
                    return null
                    //default odds - parse Amecican to --> oddsEntry
                default:
                    temp = _parseOddsArray[objOdds.type][oddsEntry](objOdds.value)
                    // temp = temp.toFixed(2)
                    let string = temp.toString()
                    let stringValue = string;
                    if(string.indexOf('.') != -1) {
                        stringValue = string.substring(0, string.indexOf('.') + 3) 
                        if(oddsEntry == 0) {
                            if(string.indexOf('-') == -1)
                                stringValue = stringValue.substring(0, string.indexOf('.'))
                            else {
                                let t = stringValue.substring(0, string.indexOf('.'))
                                stringValue = (parseFloat(t) -1).toString()
                            }
                        }
                    }
                    stringValue = stringValue < 0 ? stringValue * (1 + percent/100) : stringValue * (1 - percent/100)
                    stringValue = stringValue.toFixed(2)

                    return notRound == true ? parseFloat(stringValue) : roundOdds(temp)
            }
    }
}

export const makeDataResult = (data) => {
    let returnData = {
        matches: [], 
        league: [], 
    };
    data.forEach((item, index) => {
        let obj = {
            fullTime: {
                team1Score: checkObj(item.resultdetail.Model) ? item.resultdetail.Model.ScoreHost : null, 
                team2Score: checkObj(item.resultdetail.Model) ? item.resultdetail.Model.ScoreGuest: null, 
            }, 
            results: [], 
            date: item.date, 
            team1: item.host, 
            team2: item.guest, 
            id: item.id, 
            league: item.league, 
        };

        item.resultdetails.forEach((result) => {
            let objResult = {
                team1Score: checkObj(result.Model) ? result.Model.ScoreHost : null, 
                team2Score: checkObj(result.Model) ? result.Model.ScoreGuest: null, 
                matchMarket: checkObj(result.Model) ? result.Model.MatchMarket : null, 

            }
            obj.results.push(objResult)
        })
        let findIndex = _.findIndex(returnData.league, (i) => {
            return i.leagueName == item.league
        })
        if(findIndex == -1) {
            returnData.league.push({leagueName: item.league, id: item.id})
        }
        returnData.matches.push(obj)
    
    })
    return returnData;
}
export const makeOutRightOdds = (data, sportId) => {
    let returnData = [];
    let sortLevel = sortArray[sportId] 
    data.forEach((item, index) => {
        let obj = {
            Id: item.Id, 
            Name: item.Name, 
            matches: [], 
        };
        for(let key in sortLevel) {
            for(let i = 0; i < sortLevel[key].length; i++) {
                let sortdata = sortLevel[key][i];
                let leagueName = obj.Name.toLowerCase()
                if(leagueName.indexOf(sortdata.key.toLowerCase()) != -1) {
                    obj[key] = sortdata.value;
                }
            }
        }
        item.Matches.forEach((match, matchIndex) => {
            let outrightOdds = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '0'//odds outright
            ])
            let outrightOddsType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '1'//oods type
            ])
            let outrightPoint = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '0'//point
            ])
            let outrightSide = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '0'//side
            ])
            let outrightTeam1 = immutable.fromJS(match).getIn([
                'Names',
                '0'//team1
            ])
            let outrightTeam2 = immutable.fromJS(match).getIn([
                'Names',
                '1'//team1
            ])
            let objMatch = {
                Id: match.Id, 
                Start: match.Start, 
                Status: match.Status, 
                Type: outrightOddsType, 
                Value: outrightOdds, 
                Side: outrightSide, 
                Point: outrightPoint, 
                Team1: outrightTeam1, 
                Team2: outrightTeam2
            }
            obj.matches.push(objMatch)
        })
        returnData.push(obj)
    })
    returnData.forEach((item) => {
        item.matches.sort((a, b) => {
            return a.Team1 > b.Team1 ? 1: a.Team1 < b.Team1 ? -1 : 0;
        })
    })
    return returnData;
    // immutable
}

export const getKeyByBetSide = (key) => {
    switch (key) {
        case 0:
            return 'Spread';
        break;
        case 1:
            return 'Spread';
        break;
        case 2:
            return 'Total';
        break;
        case 3:
            return 'Total';
        break;
        case 4:
            return 'MoneyLine';
        break;
        case 5:
            return 'MoneyLine';
        break;
        case 6:
            return 'MoneyLine';
        break;
        case 7:
            return 'MoneyLine';
        break;
        case 8:
            return 'oddEvent';
        break;
        case 9:
            return 'oddEvent';
        break;
        case 10:
            return 'OutRight';
        break;
    }
}

export const makeDataOddV2 = (data, sportId) => {
    let returnData = [];
    let count = 0;
    let sortLevel = sortArray[sportId]
    data.forEach((league, index) => {
        league.Matches.forEach((match, matchIndex) => {
            count++;
            let objMatch = {
                fullTime: {
                    Spread: {
                        lengthOdd: 0, 
                        lines: [], 
                    }, 
                    Total: {
                        lengthOdd: 0, 
                        lines: [], 
                    },
                    MoneyLine: {
                        lengthOdd: 0, 
                        lines: [], 
                    }, 
                }, 
                firstTime: {
                    Spread: {
                        lengthOdd: 0, 
                        lines: [], 
                    }, 
                    Total: {
                        lengthOdd: 0, 
                        lines: [], 
                    },
                    MoneyLine: {
                        lengthOdd: 0, 
                        lines: [], 
                    },
                }, 
                Team1: match.Names[0], 
                Team2: match.Names[1], 
                Id: match.Id, 
                Start: match.Start, 
                Status: match.Status, 
                leagueId: league.Id, 
                leagueName: league.Name, 
            }
            match.Periods.forEach((period) => {
                let keyMatch = ''
                if(period[0] == 0) { //FullTime
                    keyMatch = 'fullTime';
                }
                else {
                    keyMatch = 'firstTime';
                }
                objMatch[keyMatch] = {}
                for(let i = 1; i < period.length; i++) {
                    let betSide = immutable.fromJS(period[i]).getIn([
                        '0'
                    ])
                    let keyBetSide = getKeyByBetSide(betSide)
                    if(keyBetSide !== '') {
                        objMatch[keyMatch][keyBetSide] = {lengthOdd: 0}
                        objMatch[keyMatch][keyBetSide].Type = immutable.fromJS(period[i]).getIn([
                            '1'
                        ])
                        objMatch[keyMatch][keyBetSide].lines = [];

                        for(let j = 2; j < period[i].length; j++) {
                            let objLine = {
                                Type: objMatch[keyMatch][keyBetSide].Type, 
                                Side: betSide, 
                            }
                            objLine.Point = immutable.fromJS(period[i][j]).getIn([
                                '0'
                            ])
                            objLine.Team1 = immutable.fromJS(period[i][j]).getIn([
                                '1', 
                                '0'
                            ])
                            objLine.Team2 = immutable.fromJS(period[i][j]).getIn([
                                '1', 
                                '1'
                            ])
                            objLine.Draw = immutable.fromJS(period[i][j]).getIn([
                                '1', 
                                '2'
                            ])
                            objMatch[keyMatch][keyBetSide].lines.push(objLine)
                            objMatch[keyMatch][keyBetSide].lengthOdd++;
                        }

                    }
                }
            })
            if(Helper.checkArray(match.Scores)) {
                objMatch.Team1Score = match.Scores[0];
                objMatch.Team2Score = match.Scores[1];
            }
            if(Helper.checkObj(match.TimeLive)) {
                objMatch.TimeLive = match.TimeLive;
            }
            // obj.Matches.push(objMatch)
            
            for(let key in sortLevel) {
                for(let i = 0; i < sortLevel[key].length; i++) {
                    let sortdata = sortLevel[key][i];
                    let leagueName = objMatch.leagueName.toLowerCase()
                    if(leagueName.indexOf(sortdata.key.toLowerCase()) != -1) {
                        objMatch[key] = sortdata.value;
                    }
                }
            }
            returnData.push(objMatch)
        })
        // returnData.push(obj)
    })
    return {returnData: returnData, count: count};
}

export const _calculatorMaxPayout = [
    //american - 0
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds) //.toFixed(2)
        let result = 0
        if (odds < 0) {
            result = (odds / -100) * betMoney + betMoney
        } else {
            result = (odds / 100) * betMoney + betMoney
        }
        return result
    },
    //malaysia - 1
    function(betMoney, odds, side) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds) //.toFixed(2)
        switch (side) {
            case 4:
            case 5:
            case 6:
                return (betMoney * odds)
                break
            default:
                if (odds > 0)
                    return ((betMoney * odds) + betMoney)
                return ((betMoney * odds) * -1 + betMoney)
                break
        }
    },
    //decimal - 2
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds) //.toFixed(2)
        return (betMoney * odds)
    },
    //indo - 3
    function(betMoney, odds, side) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds) //.toFixed(2)
        switch (side) {
            case 4:
            case 5:
            case 6:
                return (betMoney * odds)
                break
            default:
                if (odds > 0) {
                    return (betMoney * odds) + betMoney
                } else {
                    return (betMoney * -odds) + betMoney
                }
        }
    }
]

export const makeOEventOdds = (data, sportId) => {
    let returnData = [];
    let sortLevel = sortArray[sportId]
    data.forEach((item, index) => {
        item.Matches.forEach((match, matchIndex) => {
            let oEventType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '1'//oods type
            ])
            let oEventOtherType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '1'//oods type
            ])
            let oEventTypePoint = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '0'//point
            ])
            let oEventTypeSide = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '0'//side
            ])
            let Team1 = immutable.fromJS(match).getIn([
                'Names',
                '0'//team1
            ])
            let Team2 = immutable.fromJS(match).getIn([
                'Names',
                '1'//team1
            ])
            let odds = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '0'//odds outright
            ])
            let events = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '1'//odds outright
            ])
            let zeroOne = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '1',//array odds
                '0'//odds outright
            ])
            let twoThree = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '1',//array odds
                '1'//odds outright
            ])
            let fourSix = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '1',//array odds
                '2'//odds outright
            ])
            let sevenOver = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '1',//array odds
                '3'//odds outright
            ])
            let objMatch = {
                Id: match.Id, 
                leagueId: item.Id, 
                leagueName: item.Name, 
                Start: match.Start, 
                Status: match.Status, 
                Type: oEventType, 
                OtherType: oEventOtherType, 
                // Value: outrightOdds, 
                odds: odds, 
                events: events, 
                zeroOne: zeroOne,
                twoThree: twoThree, 
                fourSix: fourSix, 
                sevenOver: sevenOver, 
                Side: oEventTypeSide, 
                Point: oEventTypePoint, 
                Team1: Team1, 
                Team2: Team2
            }
            for(let key in sortLevel) {
                for(let i = 0; i < sortLevel[key].length; i++) {
                    let sortdata = sortLevel[key][i];
                    let leagueName = objMatch.leagueName.toLowerCase()
                    if(leagueName.indexOf(sortdata.key.toLowerCase()) != -1) {
                        objMatch[key] = sortdata.value;
                    }
                }
            }
            returnData.push(objMatch)
        })
    })
    return returnData;
    // immutable
}

export const makeDoubleChanceOdds = (data, sportId) => {
    let returnData = [];
    let sortLevel = sortArray[sportId]
    data.forEach((item, index) => {
        item.Matches.forEach((match, matchIndex) => {
            let Team1 = immutable.fromJS(match).getIn([
                'Names',
                '0'//team1
            ])
            let Team2 = immutable.fromJS(match).getIn([
                'Names',
                '1'//team1
            ])
            let fullTimeMoneyLineType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '1'//oods type
            ])
            let firstTimeMoneyLineType = immutable.fromJS(match).getIn([
                'Periods',
                '1',//firsttime
                '1',//obj odds
                '1'//oods type
            ])
            let fullTimeMoneyLineSide = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '0'//side
            ])
            let firstTimeMoneyLineSide = immutable.fromJS(match).getIn([
                'Periods',
                '1',//firsttime
                '1',//obj odds
                '0'//side
            ])
            let fullTimeMoneyLinePoint = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '0'//point
            ])
            let firstTimeTimeMoneyLinePoint = immutable.fromJS(match).getIn([
                'Periods',
                '1',//firsttime
                '1',//obj odds
                '2',//oods+point
                '0'//point
            ])
            let fullTimeMoneyLineTeam1 = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '0'//odds outright
            ])
            let fullTimeMoneyLineTeam2 = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '1'//odds outright
            ])
            let fullTimeMoneyLineDraw = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '2'//odds outright
            ])
            let firstTimeMoneyLineTeam1 = immutable.fromJS(match).getIn([
                'Periods',
                '1',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '0'//odds outright
            ])
            let firstTimeMoneyLineTeam2 = immutable.fromJS(match).getIn([
                'Periods',
                '1',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '1'//odds outright
            ])
            let firstTimeMoneyLineDraw = immutable.fromJS(match).getIn([
                'Periods',
                '1',//fulltime
                '1',//obj odds
                '2',//oods+point
                '1',//array odds
                '2'//odds outright
            ])
            let fullTimeDCType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '1'//oods type
            ])
            let fullTimeDCSide = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '0'//side
            ])
            let fullTimeDCPoint = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '0'//point
            ])
            let fullTimeDC1x = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '1',//array odds
                '0'//odds outright
            ])
            let fullTimeDC2x = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '1',//array odds
                '1'//odds outright
            ])
            let fullTimeDC12 = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '2',//obj odds
                '2',//oods+point
                '1',//array odds
                '2'//odds outright
            ])

            let objMatch = {
                Id: match.Id, 
                Start: match.Start, 
                Status: match.Status, 
                MoneyLine: {
                    fullTime: {
                        Point: fullTimeMoneyLinePoint, 
                        Type: fullTimeMoneyLineType, 
                        Side: fullTimeMoneyLineSide, 
                        Team1: fullTimeMoneyLineTeam1, 
                        Team2: fullTimeMoneyLineTeam2, 
                        Draw: fullTimeMoneyLineDraw, 
                    }, 
                    firstTime: {
                        Point: firstTimeTimeMoneyLinePoint,
                        Type: firstTimeMoneyLineType, 
                        Side: firstTimeMoneyLineSide, 
                        Team1: firstTimeMoneyLineTeam1, 
                        Team2: firstTimeMoneyLineTeam2, 
                        Draw: firstTimeMoneyLineDraw, 
                    }
                },  
                DoubleChance: {
                    Type: fullTimeDCType, 
                    Side: fullTimeDCSide, 
                    Point: fullTimeDCPoint, 
                    '1x': fullTimeDC1x, 
                    '2x': fullTimeDC2x, 
                    '12': fullTimeDC12,

                }, 
                Team1: Team1, 
                Team2: Team2,
                leagueId: item.Id, 
                leagueName: item.Name, 
            }
            for(let key in sortLevel) {
                for(let i = 0; i < sortLevel[key].length; i++) {
                    let sortdata = sortLevel[key][i];
                    let leagueName = objMatch.leagueName.toLowerCase()
                    if(leagueName.indexOf(sortdata.key.toLowerCase()) != -1) {
                        objMatch[key] = sortdata.value;
                    }
                }
            }
            returnData.push(objMatch)
        })
    })
    return returnData;
}

export const sortArray = {
    29: { //soccer
        level1: [{
            key: 'UEFA',
            value: 0
        }, {
            key: 'International',
            value: 1
        }, {
            key: 'England',
            value: 2
        }, {
            key: 'Italy',
            value: 2
        }, {
            key: 'Spain',
            value: 2
        }, {
            key: 'Germany',
            value: 2
        }, {
            key: 'France',
            value: 2
        }],
        level2: [{
            key: 'Champions League',
            value: 0
        }, {
            key: 'Europa League',
            value: 1
        }, {
            key: 'Friendlies',
            value: 2
        }, {
            key: 'Premier League',
            value: 2
        }, {
            key: 'Serie A',
            value: 3
        }, {
            key: 'La Liga',
            value: 4
        }, {
            key: 'Bundesliga',
            value: 5
        }, {
            key: 'Ligue 1',
            value: 6
        }, {
            key: 'FA Cup',
            value: 7
        }, {
            key: 'Cup',
            value: 8
        }, {
            key: 'Championship',
            value: 9
        }, {
            key: 'Bundesliga 2',
            value: 10
        }]
    },
    4: { //basketball
        level1: [{
            key: 'NBA',
            value: 0
        }, {
            key: 'Europe',
            value: 1
        }, {
            key: 'WNBA',
            value: 1
        }, {
            key: 'Italy',
            value: 1
        }, {
            key: 'Spain',
            value: 1
        }, {
            key: 'Poland',
            value: 1
        }, {
            key: 'World',
            value: 1
        }, {
            key: 'France',
            value: 1
        }],
        level2: [{
            key: 'Euroleague',
            value: 0
        }, {
            key: 'WNBA',
            value: 1
        }, {
            key: 'Lega A',
            value: 2
        }, {
            key: 'LEB Gold',
            value: 3
        }, {
            key: 'Tauron Basket Liga',
            value: 4
        }, {
            key: ' Lega Nazionale Pallacanestro Gold',
            value: 5
        }, {
            key: 'International Friendlies Women',
            value: 6
        }, {
            key: 'Championnat Pro B',
            value: 7
        }]
    },
    33: {
        level1: [{
            key: 'ATP Challenger Bordeaux',
            value: 0
        }, {
            key: 'ATP Challenger Heilbronn',
            value: 1
        }, {
            key: 'ATP Rome',
            value: 2
        }, {
            key: 'ITF Women Bastad',
            value: 3
        }, {
            key: 'ITF Women La Bisbal',
            value: 4
        }, {
            key: 'ITF Women Naples',
            value: 5
        }, {
            key: 'ITF Women Saint Gaudens',
            value: 6
        }, {
            key: 'WTA Rome',
            value: 7
        }, {
            key: 'WTA Strasbourg',
            value: 8
        }],
        level2: [{
            key: 'QF',
            value: 0
        }, {
            key: 'R16',
            value: 1
        }, {
            key: 'Doubles',
            value: 2
        }, {
            key: 'SF',
            value: 3
        }, {
            key: ' Qualifiers',
            value: 4
        }]
    },
    12: {
        level1: [{
            key: 'CS:GO',
            value: 0
        }, {
            key: 'Dota 2',
            value: 1
        }, {
            key: 'Heroes of the Storm',
            value: 2
        }, {
            key: 'League of Legends',
            value: 3
        }, {
            key: 'Overwatch',
            value: 4
        }],
        level2: [{
            key: 'AdriaMasters',
            value: 0
        }, {
            key: 'Binary Dragons Cup',
            value: 1
        }, {
            key: 'ESL South East Europe',
            value: 2
        }, {
            key: 'Minor Championship',
            value: 3
        }, {
            key: 'Showmatch',
            value: 4
        }, {
            key: 'Dreamleague',
            value: 0
        }, {
            key: 'LootBet Cup',
            value: 1
        }, {
            key: 'Prodota Cup',
            value: 2
        }, {
            key: 'SL I-League StarSeries',
            value: 3
        }, {
            key: 'World Cyber Arena',
            value: 4
        }, {
            key: 'Global Championship',
            value: 0
        }, {
            key: 'Mid-Season Invitational',
            value: 0
        }, {
            key: 'OGN Overwatch APEX',
            value: 0
        }, {
            key: 'Pacific Championship',
            value: 1
        }]
    }
}

export const getBetSide = (id) =>{
    switch(id) {
        case 0:
            // return 'TEAM1_SPREAD';
            return 'team1';
        break;
        case 1:
            // return 'TEAM2_SPREAD';
            return 'team2';
        break;
        case 2:
            // return 'OVER';
            return 'over';
        break;
        case 3:
            // return 'UNDER';
            return 'under';
        break;
        case 4:
            // return 'TEAM1_MONEY';
            return 'team1';
        break;
        case 5:
            // return 'TEAM2_MONEY';
            return 'team2';
        break;
        case 6:
            // return 'DRAW_MONEY';
            return 'draw';
        break;
        case 7:
            // return 'NO_DRAW_MONEY';
            return '';
        break;
        case 8:
            // return 'ODD';
            return 'odd';
        break;
        case 9:
            // return 'EVEN';
            return 'even';
        break;
        case 10:
            // return 'OUTRIGHT';
            return 'team1';
        break;
        case 11:
            // return 'ZERO_ONE';
            return 'zeroOne';
        break;
        case 12:
            // return 'TWO_THREE';
            return 'twoThree';
        break;
        case 13: 
            // return 'FOUR_SIX';
            return 'fourSix';
        break;
        case 14:
            // return 'SEVEN_OVER';
            return 'sevenOver';
        break;
        case 15:
            // return 'WIN_DRAW1';
            return 'team1';
        break;
        case 16:
            // return 'WIN_DRAW2';
            return 'team1';
        break;
        case 17:
            // return 'TEAM1_TEAM2';
            return 'team1';
        break;
    }
}

export const makeDataCorrectScore = (data, sportId) => {
    let nameField = [
        'CS_AOS',   
        'CS_0_0',  
        'CS_0_1',    
        'CS_0_2',    
        'CS_0_3',    
        'CS_1_0',    
        'CS_1_1',    
        'CS_1_2',    
        'CS_1_3',    
        'CS_2_0',    
        'CS_2_1',    
        'CS_2_2',    
        'CS_2_3',    
        'CS_3_0',    
        'CS_3_1',    
        'CS_3_2',    
        'CS_3_3',    
        'CS_4_0',    
        'CS_4_1',    
        'CS_4_2',    
        'CS_4_3',    
        'CS_0_4',    
        'CS_1_4',    
        'CS_2_4',    
        'CS_3_4',    
        'CS_4_4',  
    ]
    let returnData = [];
    let sortLevel = sortArray[sportId]
    data.forEach((item, index) => {
        item.Matches.forEach((match, matchIndex) => {
            let Team1 = immutable.fromJS(match).getIn([
                'Names',
                '0'//team1
            ])
            let Team2 = immutable.fromJS(match).getIn([
                'Names',
                '1'//team1
            ])
            let correctSroceType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '1'//oods type
            ])

            let correctSroceSide = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '0'//oods type
            ])
            let correctSrocePoint = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods type
                '0'//odds point
            ])
            let correctSroceMarket = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '0',//obj odds
            ])
            let objMatch = {
                Id: match.Id, 
                Start: match.Start, 
                Status: match.Status, 
                Team1: Team1, 
                Team2: Team2,
                leagueId: item.Id, 
                leagueName: item.Name, 
                market: correctSroceMarket, 
                Side: correctSroceSide, 
                Point: correctSrocePoint, 
                Type: correctSroceType, 
            }
            for(let i = 0; i < nameField.length; i++) {
                let value = immutable.fromJS(match).getIn([
                    'Periods',
                    '0',//fulltime
                    '1',//obj odds
                    '2',//oods type
                    '1',//odds obj
                    i
                ])
                if(value !== undefined) {
                    objMatch[nameField[i]] = value
                }

            }

            for(let key in sortLevel) {
                for(let i = 0; i < sortLevel[key].length; i++) {
                    let sortdata = sortLevel[key][i];
                    let leagueName = objMatch.leagueName.toLowerCase()
                    if(leagueName.indexOf(sortdata.key.toLowerCase()) != -1) {
                        objMatch[key] = sortdata.value;
                    }
                }
            }
            returnData.push(objMatch)
        })
    })
    return returnData;
}

export const makeDataHTFT = (data, sportId) => {
    let nameField = ['HH', 'HD', 'HA', 'DH', 'DD', 'DA', 'AH', 'AD', 'AA'];
    let returnData = [];
    let sortLevel = sortArray[sportId]
    data.forEach((item, index) => {
        item.Matches.forEach((match, matchIndex) => {
            let Team1 = immutable.fromJS(match).getIn([
                'Names',
                '0'//team1
            ])
            let Team2 = immutable.fromJS(match).getIn([
                'Names',
                '1'//team1
            ])
            let HTFTType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '1'//oods type
            ])

            let HTFTSide = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '0'//oods type
            ])
            let HTFTPoint = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods type
                '0'//odds point
            ])
            let HTFTMarket = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '0',//obj odds
            ])
            let objMatch = {
                Id: match.Id, 
                Start: match.Start, 
                Status: match.Status, 
                Team1: Team1, 
                Team2: Team2,
                leagueId: item.Id, 
                leagueName: item.Name, 
                market: HTFTMarket, 
                Side: HTFTSide, 
                Point: HTFTPoint, 
                Type: HTFTType, 
            }
            for(let i = 0; i < nameField.length; i++) {
                let value = immutable.fromJS(match).getIn([
                    'Periods',
                    '0',//fulltime
                    '1',//obj odds
                    '2',//oods type
                    '1',//odds obj
                    i
                ])
                if(value !== undefined) {
                    objMatch[nameField[i]] = value
                }

            }

            for(let key in sortLevel) {
                for(let i = 0; i < sortLevel[key].length; i++) {
                    let sortdata = sortLevel[key][i];
                    let leagueName = objMatch.leagueName.toLowerCase()
                    if(leagueName.indexOf(sortdata.key.toLowerCase()) != -1) {
                        objMatch[key] = sortdata.value;
                    }
                }
            }
            returnData.push(objMatch)
        })
    })
    return returnData;
}

export const makeDataGoal = (data, sportId) => {
    let nameField = ['HFG', 'HLG', 'AFG', 'ALG', 'NG'];
    let returnData = [];
    let sortLevel = sortArray[sportId]
    data.forEach((item, index) => {
        item.Matches.forEach((match, matchIndex) => {
            let Team1 = immutable.fromJS(match).getIn([
                'Names',
                '0'//team1
            ])
            let Team2 = immutable.fromJS(match).getIn([
                'Names',
                '1'//team1
            ])
            let goalType = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '1'//oods type
            ])

            let goalSide = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '0'//oods type
            ])
            let goalPoint = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '1',//obj odds
                '2',//oods type
                '0'//odds point
            ])
            let goalMarket = immutable.fromJS(match).getIn([
                'Periods',
                '0',//fulltime
                '0',//obj odds
            ])
            let objMatch = {
                Id: match.Id, 
                Start: match.Start, 
                Status: match.Status, 
                Team1: Team1, 
                Team2: Team2,
                leagueId: item.Id, 
                leagueName: item.Name, 
                market: goalMarket, 
                Side: goalSide, 
                Point: goalPoint, 
                Type: goalType, 
            }
            for(let i = 0; i < nameField.length; i++) {
                let value = immutable.fromJS(match).getIn([
                    'Periods',
                    '0',//fulltime
                    '1',//obj odds
                    '2',//oods type
                    '1',//odds obj
                    i
                ])
                if(value !== undefined) {
                    objMatch[nameField[i]] = value
                }

            }

            for(let key in sortLevel) {
                for(let i = 0; i < sortLevel[key].length; i++) {
                    let sortdata = sortLevel[key][i];
                    let leagueName = objMatch.leagueName.toLowerCase()
                    if(leagueName.indexOf(sortdata.key.toLowerCase()) != -1) {
                        objMatch[key] = sortdata.value;
                    }
                }
            }
            returnData.push(objMatch)
        })
    })
    return returnData;
}
