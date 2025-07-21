const COLLECTIONS = {
  main: {
    users: process.env.REACT_APP_USERS_COLLECTION,
    bannedUser: process.env.REACT_APP_BANNED_USER_COLLECTION,
    adminUsers: process.env.REACT_APP_ADMIN_USER_COLLECTION,
    outreachEvents: process.env.REACT_APP_MAIN_OUTREACH_EVENTS_COLLECTION,
    visitLogs: process.env.REACT_APP_MAIN_VISIT_LOG_COLLECTION,
    bmeEvents: process.env.REACT_APP_BMEEVENTS_COLLECTION,
    helpRequests: process.env.REACT_APP_HELP_REQUESTS_COLLECTION,
    contacts: process.env.REACT_APP_CONTACTS_COLLECTION,
    testUser: process.env.REACT_APP_TEST_USER_COLLECTION,
    auditLog: process.env.REACT_APP_AUDIT_LOG_COLLECTION,
    officialEvents: process.env.REACT_APP_OFFICIAL_EVENTS,
    events: process.env.REACT_APP_EVENTS_COLLECTION,
    visitLogsBookNew: process.env.REACT_APP_VISIT_LOG_NEW_COLLECTION
  },
  development: {
    users: process.env.REACT_APP_USERS_COLLECTION,
    bannedUser: process.env.REACT_APP_BANNED_USER_COLLECTION,
    adminUsers: process.env.REACT_APP_ADMIN_USER_COLLECTION,
    outreachEvents: process.env.REACT_APP_DEV_OUTREACH_EVENTS_COLLECTION,
    visitLogs: process.env.REACT_APP_DEV_VISIT_LOG_COLLECTION,
    bmeEvents: process.env.REACT_APP_BMEEVENTS_COLLECTION,
    helpRequests: process.env.REACT_APP_HELP_REQUESTS_COLLECTION,
    contacts: process.env.REACT_APP_CONTACTS_COLLECTION,
    testUser: process.env.REACT_APP_TEST_USER_COLLECTION,
    auditLog: process.env.REACT_APP_AUDIT_LOG_COLLECTION,
    officialEvents: process.env.REACT_APP_OFFICIAL_EVENTS,
    events: process.env.REACT_APP_EVENTS_COLLECTION,
    visitLogsBookNew: process.env.REACT_APP_VISIT_LOG_NEW_COLLECTION 
  },
};

const env = process.env.REACT_APP_ENV || 'main';

// Determine the collections based on the branch
const collectionMapping = env === 'development' ? COLLECTIONS.main : COLLECTIONS.development;

// Export the collections
export default collectionMapping;