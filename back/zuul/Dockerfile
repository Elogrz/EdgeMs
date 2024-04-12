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
WORKDIR /app

# Copier le fichier pom.xml et télécharger les dépendances (pour la mise en cache des dépendances)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copier le reste du code source du projet
COPY src src

# Compiler le projet
RUN mvn package -DskipTests

# Utiliser l'image OpenJDK pour exécuter l'application
FROM openjdk:11-jre-slim

WORKDIR /app

# Copier le jar compilé depuis l'étape de construction
COPY --from=build /app/target/zuul-gateway-*.jar zuul-gateway.jar

# Exposer le port sur lequel Zuul sera accessible
EXPOSE 8080

# Commande pour exécuter l'application
CMD ["java", "-jar", "zuul-gateway.jar"]
>>>>>>> b613d12 (final client + ZUUUUUL 1)
