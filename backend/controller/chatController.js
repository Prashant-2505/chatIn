const Chat = require('../models/chatModel')
const User = require('../models/userModel')

const accessChat = async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        console.log("UserId param not sent with request")
        return res.sendStatus(400)
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { eq: req.user._id } } },
            { users: { $elemMatch: { eq: userId } } }

        ]
    }).populate('users', "-password")
        .populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: "latestMessage",
        select: "name pic email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
    }

    try {
        const createdChat = await Chat.create(chatData)
        const FullChat = await Chat.findOne({ _id: createdChat._id })
            .populate('users', "-password")

        res.status(200).send(FullChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
}

const fetchChat = async (req, res) => {
    try {
        const result = await Chat.find({ users: req.user._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "name pic email"
                }
            })
            .sort({ updatedAt: -1 });

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill out all details" })
    }
    var users = JSON.parse(req.body.users)
    if (users.length < 2) {
        return res.status(400).sennd({ message: "More then 2 users required to form a group chat" })
    }

    users.push(req.user)

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })
        const fullGroupChat = await Chat.find({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).send(fullGroupChat)
    } catch (error) {

    }
}

const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
        chatName
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!updatedChat) {
        res.status(404)
        throw new Error("Chat not found")
    }
    else {
        res.send(updatedChat)
    }

}

const addToGroup = async (req, res) => {
    try {
        const { userId, chatId } = req.body;

        if (!userId || !chatId) {
            return res.status(400).send({ message: "Select user to add to group" });
        }

        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId }
            },
            {
                new: true,
            }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (added) {
            res.status(200).send({ message: "User added successfully", added });
        } else {
            res.status(404).send({ message: "Unable to add users" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const removeFromGroup = async (req, res) => {
    try {
        const { userId, chatId } = req.body;

        if (!userId || !chatId) {
            return res.status(400).send({ message: "Select user to add to group" });
        }

        const removed = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { users: userId }
            },
            {
                new: true,
            }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (removed) {
            res.status(200).send({ message: "User removed successfully", removed });
        } else {
            res.status(404).send({ message: "Unable to add users" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};




module.exports = { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup ,removeFromGroup}