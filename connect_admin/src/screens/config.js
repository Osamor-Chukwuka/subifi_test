
const stagingIp = '34.42.172.211:8080';
const apiVersion = '/api/v1'

export const details = {
    baseUrl: stagingIp + apiVersion,
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(('user')))?.token || '',
    CloudinaryApiKey: '785663173512216',
    CloudinaryApiSecret: 'B2kS4me61oAfP7etLjcEw8XjpA',
    CloudName: 'dcde7n693',
    uploadPreset: 'subifi',
    uploadFolder: 'subifi/admin'
} 
