const {
    readLogFile,
    writeLogFile,
    appendLogFile,
    deleteLogFile
} = require('./app')


readLogFile()
writeLogFile("new log data")
appendLogFile("this is appended log data")
//  deleteLogFile()
