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

#### Généré le stub spring

```shell 
# copié de https://github.com/OpenAPITools/openapi-generator#16---docker
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/Jsamson33/mini-bench/main/oas/home-iot-api-1.0.0.yaml \
    -g spring \
    -o /local/out/spring
```


## What



## Steps

### Trouver un OAS
    
- [x] trouver un OAS => OAS IOT trouvé sur swaggerhub 
    
### Generer les applications packagées

- [ ] spring (une reference nominale on va dire)
- [ ] spring kotlin
- [ ] quarkus Kotlin
- [ ] Ktor Kotlin

### Generer les applications natives

- [ ] spring 
- [ ] spring kotlin
- [ ] quarkus Kotlin
- [ ] Ktor Kotlin

### Performances + résultats K6

- [ ] spring 
- [ ] spring kotlin
- [ ] quarkus Kotlin
- [ ] Ktor Kotlin 



 
