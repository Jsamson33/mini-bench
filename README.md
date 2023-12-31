# mini-bench

# TL;DR

Tester des frameworks Java/Kotlin en mode app packagée et native généré à partir d'un OAS IOT et "benchmarké" avec K6 


# Mini bench de frameworks Java/Kotlin 

## Why

Qui dit nouvelle mission dit souvent nouvelles technos. Pour ma part, cette fois-ci ce sera Kotlin & Ktor.

Ayant l'habitude de Java/spring/springBoot, je veux me faire un avis rapide.

Je souhaitais aussi faire du Quarkus alors pourquoi ne pas tester aussi, et puis tant qu'on y est, pourquoi ne pas tester Quarkus/kotlin. Le tout en mode app packagé, mais aussi native.

Bon alors, comme on dit par chez nous, "y a plus qu'à"

L'idée est de tester l'expressivité du langage/framework, la rapidité de mise en œuvre mais aussi avoir une idée des "performances" (on discutera de ce sujet plus loin).

Étant bien occupé, je dois aller vite. Du coup, mon plan est le suivant :

- Trouver un OAS valide qui ai du sens
- Ensuite, générer tout les stubs des applications via un petit outil bien sympa
- Réaliser les tests de performances avec K6 (parce que c'est cool d'avoir les dashboards Grafana en temps réel) et que je sais m'en servir, ce qui m'évitera de la charge supplémentaire!


## How

### 1) Trouver un OAS valide qui ai du sens

Bon là j'ai un peu cherché sur le net, je suis rapidement tombé sur ça [public-apis](https://github.com/public-apis/public-apis) qui est une liste de plein d'APIs publiques. Pas exactement ce que je cherche, mais plein d'idée pour démarrer des applications.

C'est alors que je me dit, bon je me lance, je code un Open API Specification (OAS) à la main via [swagger editor](https://swagger.io/tools/swaggerhub/faster-api-design/) pour faire mon API de test. Et c'est là que je trouve un template IOT tout fait. 

Du coup je le recupère et je le stock, ce sera ma référence pour les générations  

### 2) Generer les applications packagées

Pour ça j'ai prévu de me servir de [openapi-generator](https://github.com/OpenAPITools/openapi-generator). J'ai l'habitude de m'en servir pour generer les clients des API que j'utilise, mais aussi pour des stubs pour des tests d'intégration, ou pour generer des OAS et des docs d'api. 
Bref on va faire vite.

On va se servir de l'image docker pour générer les applications. mais le resultat serait le même avec le jar ou le nodejs. 

#### Générer le stub *java-spring* [Running]

copié de https://github.com/OpenAPITools/openapi-generator#16---docker

```shell 
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Jsamson33/mini-bench/main/oas/home-iot-api-1.0.0.yaml \
    -g spring \
    -o /local/out/java-spring
```

#### Générer le stub *java-vertx* [Running]

```shell 
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Jsamson33/mini-bench/main/oas/home-iot-api-1.0.0.yaml \
    -g java-vertx \
    -o /local/out/java-vertx
```

#### Générer le stub *kotlin-server* [KO gradle/kotlin versions]

```shell 
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Jsamson33/mini-bench/main/oas/home-iot-api-1.0.0.yaml \
    -g kotlin-server \
    -o /local/out/kotlin-server
```


#### Générer le stub *kotlin-spring* 

```shell 
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Jsamson33/mini-bench/main/oas/home-iot-api-1.0.0.yaml \
    -g kotlin-spring \
    -o /local/out/kotlin-spring
```

#### Générer le stub *kotlin-vertx*

```shell 
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Jsamson33/mini-bench/main/oas/home-iot-api-1.0.0.yaml \
    -g kotlin-vertx \
    -o /local/out/kotlin-vertx
```

#### Générer le stub *java-quarkus* (ie: jaxrs-spec with library quarkus)

```shell 
# attention à la subtilité: quarkus est une librairie de jaxrs-spec
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Jsamson33/mini-bench/main/oas/home-iot-api-1.0.0.yaml \
    -g jaxrs-spec --library=quarkus \ 
    -o /local/out/java-quarkus
```


#### Générer le stub *kotlin-quarkus*

Manquant... le faire à la main ? :
1) init un projet quarkus en activant l'extension kotlin
2) ajouter les DTO du projet kotlin-spring
3) coder à la main.
4) faire l'implémentation du generator kotlin-quarkus et proposer la PR :) 


## What

Bon le premier test est concluant, java-spring encaisse jusqu'a 8000 VU sans broncher.
Le soucis viens des autres generateur de stub: il sont dans des versions plutot anciennes (gradle 7, java8, kotlin 1.9) 
bref pas vraiment à mon gout pour ce bench.
Ce qui est interressant c'est que les pojos et autres controlleurs sont les mêmes, donc on peut les réutiliser.



Conclusions
 - pour les servers stubs, il faut les mettre à jours si on souhaite s'en servir en production
 - cela génére quand meme les DTO et les controlleurs ce qui est un gain de temps non négligeable pour un POC ou un starter
 - On peut comparer et se faire une idée de l'expressivité des differents frameworks 




## Steps

### Trouver un OAS
    
- [x] trouver un OAS => OAS IOT trouvé sur swaggerhub 
    
### Generer les applications packagées

- [x] java-spring 
- [x] java-vertx
- [x] java-quarkus
- [x] spring kotlin
- [x] Ktor Kotlin (kotlin-server)
- [ ] quarkus Kotlin (TODO)

### Generer les applications natives

- [ ] java-quarkus
- [ ] java-spring
- [ ] java-vertx
- [ ] Ktor Kotlin (kotlin-server)
- [ ] kotlin-spring
- [ ] Kotlin-vertx
- [ ] Kotlin-quarkus


### Performances + résultats K6

un petit `docker compose up -d` sur le docker-compose.yml de k6 et on lance les tests via la commande : 

```shell 
docker run --rm --network host -v /$(pwd)/scripts:/scripts -i grafana/k6 run /scripts/run.js --insecure-skip-tls-verify -e K6_OUT=influxdb=http://localhost:8086/k6
```

- [X] java-spring
- [ ] java-quarkus
- [ ] java-vertx
- [ ] Ktor Kotlin (kotlin-server)
- [ ] kotlin-spring
- [ ] Kotlin-vertx
- [ ] Kotlin-quarkus



 
