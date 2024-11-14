FROM ruby:3.2.4
RUN apt-get update -qq && apt-get install -y vim gosu

RUN mkdir /backend
WORKDIR /backend
COPY . /backend

RUN bundle config set --local path 'vendor/bundle'

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]