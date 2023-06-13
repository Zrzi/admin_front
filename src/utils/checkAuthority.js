import httpAuthority from "@/utils/httpAuthority";

export default function (resourceId) {
    if (!resourceId) {
        return Promise.reject('resourceId不存在');
    }
    return httpAuthority.get('/authority/checkAuthority', {params: {resourceId}});
};