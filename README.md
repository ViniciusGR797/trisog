# Compass Challenge - Trisog UI

<div align="center">
  <img src="https://img.shields.io/static/v1?label=javascript&message=language&color=yellow&style=for-the-badge&logo=javascript"/>
  <img src="https://img.shields.io/static/v1?label=typescript&message=superset&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=React&message=library&color=blue&style=for-the-badge&logo=react"/>  
  <img src="https://img.shields.io/static/v1?label=next.js&message=framework&color=white&style=for-the-badge&logo=next.js"/>  
  <img src="https://img.shields.io/static/v1?label=sass&message=preprocessor&color=pink&style=for-the-badge&logo=sass"/>
  <img src="https://img.shields.io/static/v1?label=css%20modules&message=methodology&color=white&style=for-the-badge&logo=CSSModules"/>
  <img src="https://img.shields.io/static/v1?label=firebase%20authentication&message=auth&color=white&style=for-the-badge&logo=firebase"/>
  <img src="https://img.shields.io/static/v1?label=firebase%20storage&message=storage&color=white&style=for-the-badge&logo=firebase"/>
  <img src="https://img.shields.io/static/v1?label=yarn&message=manager&color=pink&style=for-the-badge&logo=yarn"/>
  <img src="https://img.shields.io/static/v1?label=vercel&message=hosting&color=black&style=for-the-badge&logo=vercel"/>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ViniciusGR797/trisog?style=for-the-badge">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ViniciusGR797/trisog?style=for-the-badge">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/ViniciusGR797/trisog?style=for-the-badge">
  <img alt="Bitbucket open issues" src="https://img.shields.io/bitbucket/issues/ViniciusGR797/trisog?style=for-the-badge">
  <img alt="Bitbucket open pull request" src="https://img.shields.io/bitbucket/pr-raw/ViniciusGR797/trisog?style=for-the-badge">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=Development&color=GREEN&style=for-the-badge"/>
</div>

<div align="center">
  <br/>
  <img src="docs/login.jpg" alt="Login page">
</div>

> The software developed is a web application created for the Compass Challenge, whose focus is the creation of a travel agency website.

## Tópicos

:small_blue_diamond: [🔗 Access URLs](#-access-urls)

:small_blue_diamond: [📫 Documentation](#-documentation)

:small_blue_diamond: [🗻 Challenge](#-challenge)

:small_blue_diamond: [🛠 Built with](#-built-with)

:small_blue_diamond: [🏡 Execution locally](#-execution-locally)

:small_blue_diamond: [🙌 Recognition](#-recognition)

:small_blue_diamond: [📄 License](#-license)

## 🔗 Access URLs

To access the API Trisog in production or homologation environments:

<div align="center">

| Ambiente       | URL                           |
| -------------- | ------------------------------|
| `Production`   | https://trisog.vercel.app     |
| `Homologation` | https://trisog-hom.vercel.app |

</div>

For detailed information about the project, visit [Project Documentation](#-documentation).

## 📫 Documentation

The project documentation is available at the following links:

- [Figma Prototypes](https://www.figma.com/design/I96XeStHlz7igQI0KMcUIb/Desafio-3---Compass-UOL?node-id=6803-1073&t=c3kRxZZcv3xrOgQc-0): This link provides access to Figma prototypes, showcasing the design and layout of the web application.

Be sure to review these documents to gain more insights into the landing page project and understand the design and functionality requirements. For more detailed information about the web application requirements, please refer to the [challenge](#-challenge) section.

## 🗻 Challenge

### Challenge Description

You will need to recreate the three pages mentioned above while staying true to your original design.

Delivery date: 09/03/2024 – 5:30 pm – Tuesday.

Each presentation will last a maximum of 10 minutes.

### The **MANDATORY** requirements are:

- Use front-end in React with TypeScript.
- Back-end in Node (TypeScript required).
- Use of any is prohibited.
- Database using mongoDB or sql lite.
- It is necessary to protect the Tours route.
- Create sliders to display the most popular tours and types of activities in the sessions, in Carousel format. Library recommendation: [Splide](https://splidejs.com/), [Splide for React docs.](https://splidejs.com/integration/react-splide/) (Feel free to use the library of your choice).
- Use [Firebase](https://firebase.google.com/docs/auth?hl=pt-br), to handle user authentication. Authentication must be possible with: email, Facebook and Google.
- All features must be using the API developed in Node, data persistence should not be done in the Front. - You can use an external library for styling.
- You must choose the images.
- Create a private repository on your Github and add the instructors as collaborators to the project.
- Add a README to your project.
- Make small commits and use Conventional Commits to keep your repository organized.
- All images must be hosted in an S3 bucket (general purpose) or Firebase Storage.

#### Header:
- Login/Sign up page with the design created by you;
- Search button searching for all existing tours.
#### Footer:
- Each social network link must redirect to the home page of each network.
- Email field must be validated.
#### Home:
- Develop the search field.
- The Type field is an ‘Experience’ field, such as beaches.
- Tours Session must contain the most popular tours session chosen by you, and the data must come from the back-end, and must be in carousel format, the number of tours must be 8 (eight).
- Hover on the favorite button.
- Session to choose a ‘Type’ must come with the API data, the logic will be: search in the back-end how many tours there are with x category and render this value and the minimum value among those tours. For example: in the API there are 15 Tours with the Beaches category, and the minimum value is from $650, so it should render ‘15 Tours+’ and ‘From $650’. Render all categories that are in the back-end.
- Contact Us has no functionality.
- Top Attractions Cards must bring data from the back-end, displaying at least 6 cards. If you choose to make the pages optional, the click must redirect to the destination details page.
#### Destination - OPCIONAL:
- Top Attractions cards must bring data from the back-end, displaying at least 12 cards. We recommend doing this with Grid. When clicking on a card, it will direct you to the details page of that destination.
#### Destination Details - OPCIONAL:
- Fixed images, ‘See more photos’ button does not need to be functional.
- Use Google Maps API to bring the location of the destination.
- Use Weather API to bring information from the local weather table.
- Destination information all coming from the back-end.
- Carousel with popular tours in that destination, when clicking on ‘See All’ it should direct to the tours page with the filter for that place selected.
- ‘Activities’ carousel should be disregarded.
#### Tour Package:
- ALL FUNCTIONAL FILTERS.
- Filter data such as categories/destinations must come from the back-end.
- Must contain pagination directly from the back-end.
- Keep reviews with fixed value, they do not need to be broken values.
#### Tour Details:
- Fixed image of that destination.
- All tour information coming from the back-end.
- Sessions to be disregarded: Included/Exclude, Tour Places, Calendar & Price.
- Calculate as the user adds more people in the filter on the right-hand side menu.
- Use Google Maps API to bring the tour location.
#### Reviews:
- Average Reviews is an average of the reviews, so the highest rating should be an average of the other six ratings on the right.
- Values ​​can be integers.
- In the field to add a review, the user should rate each service by entering how many stars it deserves.
- The user should be able to enter the name and email of their choice. it is not necessary to retrieve it from the Login.
- The comment should be rendered on the page when submitted and the average reviews should change.

### The **OPTIONAL** requirements are:
- Responsive application.
- Landing page and destination details.

## 🛠 Built with

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): A widely used scripting language for web development, essential for building dynamic and interactive user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static types and other features to enhance code maintainability and robustness.
- [React](https://reactjs.org/): A popular JavaScript library for building user interfaces, enabling the creation of reusable components.
- [Next.js](https://nextjs.org/): A React framework that provides features like server-side rendering and static site generation for optimized web applications.
- [Sass](https://sass-lang.com/): A CSS preprocessor that adds power and elegance to CSS, allowing for more maintainable and modular styles.
- [CSS Modules](https://github.com/css-modules/css-modules): A methodology for writing modular and reusable CSS, ensuring that styles are scoped locally to components.
- [Firebase Authentication](https://firebase.google.com/products/auth): Comprehensive authentication service that provides secure user login via email, social media, or other authentication methods.
- [Firebase Storage](https://firebase.google.com/products/storage): Scalable and secure cloud storage solution for user-generated content, such as images and other media.
- [Yarn](https://yarnpkg.com/): A fast and reliable package manager that helps manage project dependencies effectively.
- [Vercel](https://vercel.com/docs): A hosting platform that allows for quick and efficient deployment of web applications, with integrated CI/CD support.

These are the main technologies used to build this front-end application. JavaScript and React are utilized to create dynamic and interactive user interfaces, while Next.js enhances the application with features like server-side rendering and static site generation. TypeScript adds static typing, improving code maintainability. Sass and CSS Modules are used for writing modular, reusable, and maintainable styles. Firebase Authentication secures user access, while Firebase Storage handles user-generated content efficiently. Yarn manages project dependencies efficiently, and the application is deployed on Vercel for scalable and high-performance hosting. Additionally, Squarespace is used to manage domains, ensuring a professional and accessible web presence.

## 🏡 Execution locally

Follow the steps below to run the project locally on your machine:

* Clone this repository on your machine, entering the respective repository URL:
```
git clone https://github.com/ViniciusGR797/trisog.git
```

* Navigate to the cloned project directory:
```
cd trisog
```

* Create a file called **_.env_** and correctly configure the necessary environment variables. You can use the **_.env.sample_** file as a reference.

* Install the Yarn package manager:
```
npm install -g yarn
```

* Now, install all the dependencies listed in the 'package.json' file by running the following command:
```
yarn install
```

* With the dependencies installed, run the following command to start the server:
```
yarn start
```

* If you want to stop the application from running, press Ctrl + C in the terminal, the project execution will be terminated.

## 🙌 Recognition

I would like to take advantage of this space to express my sincere gratitude for the journey I took in carrying out this project:

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/ViniciusGR797">
          <img src="https://avatars.githubusercontent.com/u/106624536?v=4" width="100px;" alt="Photo of Vinicius"/><br>
          <sub>
            <b>Vinicius Gomes Ribeiro</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>
</div>

Although it was an individual journey, this achievement would not have been possible without dedication, effort and commitment. Each stage of this project was driven by the commitment and skills I employed. I am deeply grateful for this opportunity to grow and learn.

## 📝 License

This project is licensed under the terms of [License](LICENSE). Please see the LICENSE file for more details.

The license chosen for the project is an important element to establish the rights to use, distribute and modify the source code. It is essential that all users, contributors and stakeholders review and understand the license terms and conditions before using or contributing to the project.

It is recommended that you carefully read the LICENSE file to ensure compliance with established rules and proper use of the code provided in this repository.

[⬆ Back to the top](#compass-challenge---trisog-ui)

