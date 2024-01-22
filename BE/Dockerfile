FROM amazoncorretto:17
WORKDIR /app
ADD ./build/libs/*.jar /app/
ENTRYPOINT ["java", "-jar", "app.jar"]