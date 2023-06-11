async function removeMessage(message) {
  try {
    return await message.delete();
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  removeMessage,
};
