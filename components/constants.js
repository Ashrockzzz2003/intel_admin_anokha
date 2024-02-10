const BASE_URL = "http://localhost:5000/api";

const AUTH_URL = `${BASE_URL}/auth`;
const INTEL_URL = `${BASE_URL}/intel`;

const LOGIN_URL = `${AUTH_URL}/loginOfficial`;
const FIRST_ROUND_SUBMISSIONS_URL = `${INTEL_URL}/admin/getAllSubmissions/1`;
const MARK_SEEN_URL = `${INTEL_URL}/admin/markSeen`;
const MARK_UNSEEN_URL = `${INTEL_URL}/admin/markUnseen`;

export {
    LOGIN_URL,
    FIRST_ROUND_SUBMISSIONS_URL,
    MARK_SEEN_URL,
    MARK_UNSEEN_URL,
};
