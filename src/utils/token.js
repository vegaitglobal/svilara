import * as _ from 'lodash';

const hasToken = () => {
    let vuex = JSON.parse(localStorage.getItem('vuex'));
    if (_.isEmpty(vuex)) return false

    return vuex.auth.token;
}

export default hasToken;
