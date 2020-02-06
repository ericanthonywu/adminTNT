const globalstate = {
    token: "",
    username: "",
    _id: 0
};

export default (state = globalstate, action) => {
    switch (action.type) {
        case "login":
            return {
                ...globalstate,
                token: action.payload.token,
                username: action.payload.username,
                _id: action.payload.id,
            };
        case "logout":
            return {...globalstate, token: "", username: "", _id: 0};
        default:
            return globalstate
    }
};
