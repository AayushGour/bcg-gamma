FROM postgres:latest
COPY *.sql /docker-entrypoint-initdb.d/
ADD back_end/setup.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*
EXPOSE 5432