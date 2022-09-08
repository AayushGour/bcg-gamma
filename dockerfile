FROM postgres:latest
COPY *.sql /docker-entrypoint-initdb.d/
COPY data.csv /
ADD setup.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*
EXPOSE 5432