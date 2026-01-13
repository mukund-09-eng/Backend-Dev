const fs = require('fs')


function readLogFile() {
    const data = fs.readFileSync('./log.txt', 'utf-8')
    console.log("Log file content:")
    console.log(data)
}


function writeLogFile(data) {
    fs.writeFileSync('./log.txt', data)
    console.log("Log file written successfully")
}

function appendLogFile(data) {
    fs.appendFileSync('./log.txt', '\n' + data)
    console.log("Log file appended successfully")
}


function deleteLogFile() {
    fs.unlinkSync('./log.txt')
    console.log("Log file deleted successfully")
}


module.exports  = {
    readLogFile,
    writeLogFile,
    appendLogFile,
    deleteLogFile
}
