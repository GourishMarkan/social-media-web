import { Conversion } from "../models/conversion.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user_id;
    const receiverId = req.params.id;
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Please add a message",
      });
    }
    // finding the existing conversation
    let conversation = await Conversion.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    // if conversation does not exist creating one
    if (!conversation) {
      conversation = await Conversion.create({
        participants: [senderId, receiverId],
      });
    }
    // adding the message to the conversation
    const newMessage = await Message.create({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    // implement socket io for real time data transfer
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user_id;
    const receiverId = req.params.receiverId;
    // finding the conversation
    const conversation = await Conversion.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation)
      return res.status(200).json({ success: true, messages: [] });
    return res.status(200).json({
      success: true,
      messages: conversation?.messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
