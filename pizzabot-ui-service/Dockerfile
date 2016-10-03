FROM node:5

ADD ../ /home/service
RUN cd /home/service && npm install
CMD cd /home/service && node pizzabot-ui-service/service.js