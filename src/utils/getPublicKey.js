import httpAuthority from "@/utils/httpAuthority";
import store from "@/store/index"

export default async function() {
    if (store.state.publicKey && store.state.publicKey !== '') {
        return Promise.resolve(store.state.publicKey);
    }
    let publicKey = '';
    try {
        const res = await httpAuthority.get('/getRsaPublicKey');
        publicKey = res.data.data;
        store.commit('SET_PUBLIC_KEY', publicKey);
    } catch (e) {
        publicKey = '';
    }
    return Promise.resolve(publicKey);
};