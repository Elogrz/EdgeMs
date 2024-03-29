FROM maven:3.9.6 AS build

COPY pom.xml /build/pom.xml
COPY back/authentification/pom.xml /build/back/authentification/pom.xml

COPY back/authentification/src /build/back/authentification/src

WORKDIR /build/back/authentification/

RUN mvn clean package -DskipTests

FROM openjdk:21

COPY --from=build /build/back/authentification/target/back/authentification-*.jar /app/back/authentification.jar

ENTRYPOINT ["java","-jar","/app/back/authentification.jar"]