import endpoints from "./endpoints"

let $ = require('jquery')

export const get_auth = (callback) => {
  $.getJSON(endpoints.API_AUTH, callback)
}
export const signup_user = (username, password, callback) => {
  $.post(endpoints.API_SIGNUP, {
      username: username,
      password: password
  }, callback)
}

export const logout_user = () => {
    $.getJSON(endpoints.API_LOGOUT)
}

export const login_user = (username, password, callback) => {
  $.post(endpoints.API_LOGIN, {
      username: username,
      password: password
  }, callback)
}

export const get_thread = (q, page, callback) => {
  $.getJSON(endpoints.API_THREAD, {
      q: q,
      page: page
  }, callback)
}

export const get_thread_index = (callback) => {
  $.get("/api/index.json", callback)
}
