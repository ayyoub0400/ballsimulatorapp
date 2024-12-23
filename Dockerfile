#Stable Nginx version
FROM nginx:1.27.3-alpine

#Set working directory in the container
WORKDIR /usr/share/nginx/html

#Copy the static files from the host to the container
COPY ./webapp /usr/share/nginx/html

#Expose the port 80 for access
EXPOSE 80

#Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]