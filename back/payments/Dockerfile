FROM maven:3.9.6 AS build

COPY pom.xml /build/pom.xml
COPY back/payments/pom.xml /build/back/payments/pom.xml

COPY back/payments/src /build/back/payments/src

WORKDIR /build/back/payments/

RUN mvn clean package -DskipTests

FROM openjdk:21

COPY --from=build /build/back/payments/target/back/payments-*.jar /app/back/payments.jar

ENTRYPOINT ["java","-jar","/app/back/payments.jar"]