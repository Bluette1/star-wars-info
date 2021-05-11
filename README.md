### star-wars-info

This project is a wrapper information site for the official [stars wars API](https://swapi.dev/), built using Apollo GraphQL server and React client.

![Demo picture](./screenshot.png)


## Built With
- React
- Typescript
- GraphQL
- Nodejs
- Prisma

[Live site](https://starwars-app-revised.herokuapp.com/)

## Description

This project is a wrapper information site for the official [stars wars API](https://swapi.dev/), built using Apollo GraphQL server and React client.

## Run server locally
Clone the git repo and inside the project root folder in the terminal run:

```
cd client
yarn build-deploy
cd server
yarn install
yarn server
```


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
