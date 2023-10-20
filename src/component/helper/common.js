module.exports = {
  errorCode: {
    SEE_OTHER: 303,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
  designation: {
    SUPER_ADMIN: -1,
    ADMIN: 0,
    USER: 1,
  },
  saltRounds: 8,
  channelStatus: {
    OPEN: 0,
    CLOSED: 1,
    BLOCKED: 2,
  },
  gender: {
    MALE: 0,
    FEMALE: 1,
    OTHER: 2,
  },
  PER_PAGE_POST: 20,
  category: ["academic", "housing", "social", "career"],
};
