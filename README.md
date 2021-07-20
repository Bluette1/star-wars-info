### star-wars-info

This project is a wrapper information site for the official [stars wars API](https://swapi.dev/), built using Apollo GraphQL server and React client.

![Demo picture](./screenshot.png)


## Built With
- React
- Typescript
- GraphQL
- Nodejs
- Prisma

[Live site](http://starwars-app-revised.herokuapp.com/)

## Description

This project is a wrapper information site for the official [stars wars API](https://swapi.dev/), built using Apollo GraphQL server and React client.

## Run server locally
Clone this git repo.

#### Setting Up Local Database
- Install and set up postgresql, if not already installed. You can visit this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-ruby-on-rails-application-on-ubuntu-14-04) for information on how to install postgresql.
- Create a file named `.env` in the `server` directory according to the `.env-example` file, and add the relevant database credentials.

- To start the client, open the terminal and inside the project root folder type the following 
```
cd client
yarn install
yarn start
```
- Open another tab in the terminal(CTRL+SHIFT+T) and type the following to run server
```
cd server
yarn install
npx prisma migrate dev --name init
yarn server
```
- The client site will open in the browser at http://localhost:3000/.

## Authors

👤 **Marylene Sawyer**
- Github: [@Bluette1](https://github.com/Bluette1)
- Twitter: [@MaryleneSawyer](https://twitter.com/MaryleneSawyer)
- Linkedin: [Marylene Sawyer](https://www.linkedin.com/in/marylene-sawyer-b4ba1295/)


# Acknowledgements

- The content in this repository was retrieved from or inspired by the following sites
  - [Apollo Documentation](https://www.apollographql.com/docs/)
  - [FULL STACK TUTORIAL](https://www.apollographql.com/docs/tutorial/)
  - [GraphQL With React & Apollo Series 1 - 4 ](https://www.youtube.com/watch?v=SEMTj8w04Z8)

- Icons
  - [Seeklogo](https://seeklogo.com/vector-logo/367785/star-wars)
  - [Icons8](https://icons8.com/icons/set/favourite)

### Deployment
#### Heroku

- `cd client && npm run build-deploy`
- `cd server` 
- Initialize git heroku repo accorging to [instructions](https://devcenter.heroku.com/articles/deploying-nodejs)

#### Loading the schema to heroku database
- `heroku run npx prisma db push --preview-feature`

## Potential Future Improvements / Ambitions
- Integrate with more API's
- Review and refurbish the styling
- Add more code testing
- Add more information/pages such as the user profile page

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
