FROM ruby:2.6.6

COPY Gemfile .
COPY entrypoint.sh .

RUN gem install bundler -v 2.1.4
RUN bundle install

CMD [ "sh", "-c", "entrypoint.sh" ]