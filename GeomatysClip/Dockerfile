FROM openjdk:8-jdk-alpine

# Set workdir
WORKDIR /temp

# Copy all files, Not a good solution here because we have to delete source code after
# but a quickest way for the test
COPY . /temp

#Generate the jar
RUN /temp/gradlew build

# Copy built jar
RUN cp -r /temp/build/libs/ /app

# Set workdir
WORKDIR /app

#remove source files
RUN rm -r /temp

# Set Timezone
RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

# Expose port App
EXPOSE 8080

# Expose volume App
VOLUME /app

#Launch application
ENTRYPOINT ["java","-jar","/app/clip-1.0.0.jar"]