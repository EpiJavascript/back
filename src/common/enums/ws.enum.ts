enum WsEmitMessage {
  USER_CHANNEL_MESSAGE = 'user-channel-message', // receiving a private message
  SERVER_CHANNEL_MESSAGE = 'server-channel-message', // receiving a server channel message
  FRIEND_REQUEST = 'friend-request', // receiving a friend request
  FRIEND_LIST_UPDATED = 'friend-list-updated', // friend list modified (+/- friend)
}

export default WsEmitMessage;