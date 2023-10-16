import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 2000 },
        { duration: '50s', target: 2000 },
        { duration: '10s', target: 4000 },
        { duration: '50s', target: 4000 },
        { duration: '10s', target: 6000 },
        { duration: '50s', target: 6000 },
        { duration: '10s', target: 8000 },
        { duration: '50s', target: 8000 },
        { duration: '10s', target: 0 },
    ],
};

export default function () {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    const res = http.get('http://127.0.0.1:8080/devices', { headers: headers });

    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);

}