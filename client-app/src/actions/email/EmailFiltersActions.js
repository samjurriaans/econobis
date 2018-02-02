export const setFilterEmailDate = (date) => ({
    type: 'SET_FILTER_EMAIL_DATE',
    date,
});

export const setFilterEmailMailbox = (mailbox) => ({
    type: 'SET_FILTER_EMAIL_MAILBOX',
    mailbox,
});

export const setFilterEmailSentBy = (sentBy) => ({
    type: 'SET_FILTER_EMAIL_SENT_BY',
    sentBy,
});

export const setFilterEmailSubject = (subject) => ({
    type: 'SET_FILTER_EMAIL_SUBJECT',
    subject,
});

export const setFilterEmailStatusId = (statusId) => ({
    type: 'SET_FILTER_EMAIL_STATUS_ID',
    statusId,
});

export const clearFilterEmail = () => ({
    type: 'CLEAR_FILTER_EMAIL',
});