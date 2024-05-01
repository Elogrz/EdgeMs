# Étape 1: Construction avec Maven
FROM maven:3.8.4-openjdk-11 as build
WORKDIR /app

# Copier le pom.xml et les sources
COPY pom.xml .
COPY src ./src

# Télécharger toutes les dépendances nécessaires
RUN mvn dependency:go-offline

# Compiler le projet
RUN mvn package -DskipTests

# Étape 2: Exécution avec JRE
FROM openjdk:11-jre-slim
WORKDIR /app

# Copier le JAR empaqueté depuis l'étape de construction à l'étape d'exécution
COPY --from=build /app/target/zuul-gateway*.jar zuul-gateway.jar

# Exposer le port sur lequel Zuul s'exécute
EXPOSE 8889

# Exécuter l'application
CMD ["java", "-jar", "zuul-gateway.jar"]
