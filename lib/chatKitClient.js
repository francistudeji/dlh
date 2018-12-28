const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:3b00ed07-103c-4828-8fd7-271bb696c15d",
  key:
    "ec62e079-cb87-4597-8cdd-132a763a2cbf:IVKs05XgClYTnO3fKpFNDGaaeffkz2E0H18PBlGINz4="
});

module.exports = chatkit;
