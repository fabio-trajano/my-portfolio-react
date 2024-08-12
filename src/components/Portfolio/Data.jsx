import Work1 from "../../assets/project1.png";
import Work2 from "../../assets/project2.png";
import Work3 from "../../assets/project3.png";
import Work5 from "../../assets/project5.png";
import Work6 from "../../assets/project6.png";
import Work7 from "../../assets/project7.png";

export const projectsData = [
  {
    id: 1,
    image: Work1,
    linktext: "Demo",
    title: "PocketSommelier",
    category: "RubyOnRails",
    url: "https://www.pocketsommelier.me/"
  },
  {
     id: 4,
     image: Work6,
     linktext: "Source Code",
     title: "Chess Backend - JAVA",
     category: "Java/Spring",
     url: "https://github.com/fabio-trajano/chess-java"
  },
  {
    id: 4,
    image: Work7,
    linktext: "Source Code",
    title: "Financial Analysis API - JAVA",
    category: "Java/Spring",
    url: "https://github.com/fabio-trajano/java-financial-analysis"
},
  {
    id: 5,
    image: Work5,
    title: "Restaurant API - Django(DRF)",
    linktext: "Source Code",
    category: "Python/Django",
    url: "https://github.com/fabio-trajano/Meta-backend-capstone-project/tree/master/MetaCapstoneProject"
  },
  {
    id: 2,
    image: Work2,
    linktext: "Source Code",
    title: "Petbnb",
    category: "RubyOnRails",
    url: "https://github.com/AndreNelas93/petbnb"
  },
  {
    id: 3,
    image: Work3,
    title: "Calculator",
    linktext: "Source Code",
    category: "React/JavaScript",
    url: "https://github.com/fabio-trajano/react-calculators/tree/master"
  },
];

// projects
export const projectsNav = [
  {
    name: "All",
  },
   {
      name: "Java/Spring",
   },
  {
    name: "RubyOnRails",
  },
  {
    name: "React/JavaScript",
  },
  {
    name: "Python/Django",
  },
];
