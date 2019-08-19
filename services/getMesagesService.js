const chat = require('../model/chats');

function getMessages(req, res){
    console.log(req.body)
    const {chatid, page, noOfRecords} = req.body;
    chat.findOne({
        _id: chatid,
    },{messages: 1})
        .populate({
            path: 'messages',
            options: {
                sort: {
                    createdAt: -1,
                },
                skip: page*noOfRecords,
                limit: noOfRecords,
            },
            populate: {
                path: 'sender',
                select: {
                    firstName: 1,
                    lastName: 1,
                },
                
            },
        })
        .then((messages) => {
            console.log(messages);
            res.json(messages);
        })
}

module.exports = {
    getMessages,
}