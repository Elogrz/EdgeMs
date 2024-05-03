<<<<<<< HEAD
<<<<<<< HEAD
# Étape de build
FROM maven:3.9.6 AS build

# Copie du pom.xml et des sources
COPY pom.xml .
COPY src ./src

# Compilation du projet et skip des tests
RUN mvn clean package -DskipTests

# Étape finale pour l'exécution
FROM openjdk:21

# Copie du jar construit à l'étape de build
COPY --from=build /target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]
=======
# Utiliser l'image de base Java (OpenJDK) avec une tag spécifiant la version de JDK
FROM openjdk:11-jdk-slim as build

# Définir le répertoire de travail dans le conteneur
=======
# Étape 1: Construction avec Maven
<<<<<<< HEAD
FROM maven:3.8.4-openjdk-11 as build
>>>>>>> f3077b7 (last change)
=======
FROM maven:3.8.4-openjdk-17 AS build  # Utilisation de Maven avec JDK 17
>>>>>>> 15d5ab7 (updating in java 17 (doesn't work))
WORKDIR /app

# Copier le pom.xml et les sources
COPY pom.xml .
COPY src ./src

# Télécharger toutes les dépendances nécessaires
RUN mvn dependency:go-offline

# Compiler le projet
RUN mvn package -DskipTests

# Étape 2: Exécution avec JRE
FROM openjdk:17-jre-slim  # Utilisation de la version JRE slim de JDK 17 pour l'exécution
WORKDIR /app

# Copier le JAR empaqueté depuis l'étape de construction à l'étape d'exécution
COPY --from=build /app/target/zuul-gateway*.jar zuul-gateway.jar

# Exposer le port sur lequel Zuul s'exécute
EXPOSE 8889

# Exécuter l'application
CMD ["java", "-jar", "zuul-gateway.jar"]
>>>>>>> b613d12 (final client + ZUUUUUL 1)
