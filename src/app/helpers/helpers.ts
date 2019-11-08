export const HOST_URL = 'http://ec2-3-133-233-94.us-east-2.compute.amazonaws.com/';
export const ACCESS_TOKEN = 'accessToken';

export function getUrl(uri: string) {
    return HOST_URL + uri;
}