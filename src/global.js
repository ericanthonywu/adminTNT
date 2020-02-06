// const host = '35.186.149.219', port = false, prefix = 'user';
const host = 'localhost', port = "3000";

export const backend_url = `http://${host}${port ? `:${port}` : ""}/`;
export const api_url_admin = `${backend_url}admin/`;
export const api_url_clinic = `${backend_url}clinic/`;
export const defaultProfile = `${backend_url}uploads/images/default.png`;
