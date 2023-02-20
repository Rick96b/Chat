import {axios} from '..';

export default {
    getAllDialogs: () => axios.get('/dialogs'),
    getCurrentDialog: (dialogId) => axios.get(`/dialogs/${dialogId}`),
    getMessages: (dialogId, channel) => axios.get(`/${dialogId}/${channel}`)
}