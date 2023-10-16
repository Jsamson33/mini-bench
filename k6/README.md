# Load test

## run Grafana / influxdb 

```shell
# run Grafana / influxdb
docker compose up -d

# run K6 script /scripts/run.js
docker run --rm --network host -v /$(pwd)/scripts:/scripts -i grafana/k6 run /scripts/run.js --insecure-skip-tls-verify -e K6_OUT=influxdb=http://localhost:8086/k6
```
