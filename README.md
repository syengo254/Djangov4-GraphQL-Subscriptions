## A Fullstack Django v4 and React v18 GraphQL App

### Features
1. Add books mutation
2. List books query
3. Books subscription
4. Uses django-channels, @apollo/client, graphql-ws-transport, django-graphene and others.

### Instructions
1. Clone Repo
2. ```pip install -r requirements.txt```
3. ```python manage.py migrate```
4. ```python manage.py loaddata books```
5. cd into react-ui directory and ```yarn ```
6. ```python manage.py runserver``` at project root on one terminal window
7. ``` yarn start``` from another terminal window at react-ui directory
8. View aplication on browser at http://localhost:3000/
9. Graphiql endpoint at http://localhost:8000/graphql/ , you may need to run ```python manage.py collectstatic```


### License
MIT
Other license such as Django, Apollo GraphQL, React and CRA apply.

&copy;2022 David Syengo.
