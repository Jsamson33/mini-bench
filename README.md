# mini-bench

# Why

Qui dit nouvelle mission dit souvent nouvelles technos. Pour ma part, cette fois-ci ce sera Kotlin & Ktor.

Ayant l'habitude de Java/spring/springBoot, je veux me faire un avis rapide.

Je souhaitais aussi faire du Quarkus alors pourquoi ne pas tester aussi, et puis tant qu'on y est, pourquoi ne pas tester Quarkus/kotlin. Le tout en mode app packagé, mais aussi native.

Bon alors, comme on dit par chez nous, "y a plus qu'à"

L'idée est de tester l'expressivité du langage/framework, la rapidité de mise en œuvre mais aussi avoir une idée des "performances" (on discutera de ce sujet plus loin).

Étant bien occupé, je dois aller vite. Du coup, mon plan est le suivant :

- Trouver un OAS valide qui ai du sens
- Ensuite, générer tout les stubs des applications via un petit outil bien sympa
- Réaliser les tests de performances avec K6 (parce que c'est cool d'avoir les dashboards Grafana en temps réel) et que je sais m'en servir, ce qui m'évitera de la charge supplémentaire!


1) Trouver un OAS valide qui ai du sens

Bon là j'ai un peu cherché sur le net, je suis rapidement tombé sur ça [public-apis](https://github.com/public-apis/public-apis) qui est une liste de plein d'APIs publiques. Pas exactement ce que je cherche, mais plein d'idée pour démarrer des applications.

C'est alors que je me dit, bon je me lance, je code un Open API Specification (OAS) à la main via [swagger editor](https://swagger.io/tools/swaggerhub/faster-api-design/) pour faire mon API de test. Et c'est là que je trouve un template IOT tout fait. 

Du coup je le recupère et je le stock, ce sera ma référence pour les générations  



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



 
