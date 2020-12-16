FROM node:stretch
RUN ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime
ADD ./app /app
WORKDIR /app
RUN chmod +x /app/start.js
CMD /app/start.js