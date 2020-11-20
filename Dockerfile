FROM nikolaik/python-nodejs:python3.8-nodejs14 as base

WORKDIR /var/www
COPY . .

# Install Python Dependencies

# RUN ["pip", "install", "boto3"]
RUN ["pip", "install", "-r", "requirements.txt"]
RUN ["pip", "install", "psycopg2"]


# Build our React App
RUN ["npm", "install", "--prefix", "client"]
RUN ["npm", "run", "build", "--prefix", "client"]

# Move our react build for Flask to serve
# Use cp here because we're copying files inside our working directory, not from
# our host machine.
RUN ["cp", "-r", "client/build", "cardashian_app/static"]
RUN ["cp", "-r", "cardashian_app/static/static/js", "cardashian_app/static"]
RUN ["cp", "-r", "cardashian_app/static/static/css", "cardashian_app/static"]

# Setup Flask environment
ENV FLASK_APP=cardashian_app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV REACT_APP_BASE_URL=http://cardashian.herokuapp.com/

EXPOSE 8000

# Run flask environment
CMD gunicorn cardashian_app:app
