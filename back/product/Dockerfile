FROM maven:3.9.6 AS build

COPY pom.xml /build/pom.xml
COPY back/product/pom.xml /build/back/product/pom.xml

COPY back/product/src /build/back/product/src

WORKDIR /build/back/product/

RUN mvn clean package -DskipTests

FROM openjdk:21

COPY --from=build /build/back/product/target/back/product-*.jar /app/back/product.jar

ENTRYPOINT ["java","-jar","/app/back/product.jar"]