FROM maven:3.9.6 AS build

COPY pom.xml /build/pom.xml
COPY back/order/pom.xml /build/back/order/pom.xml

COPY back/order/src /build/back/order/src

WORKDIR /build/back/order/

RUN mvn clean package -DskipTests

FROM openjdk:21

COPY --from=build /build/back/order/target/back/order-*.jar /app/back/order.jar

ENTRYPOINT ["java","-jar","/app/back/order.jar"]