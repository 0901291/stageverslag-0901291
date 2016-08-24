import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const achievements = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/achievements/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/achievements/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/achievements/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/achievements/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/achievements/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (achievement) => {
  return replaceAll(achievement.title, ' ', '-');
};

class AchievementApi {
  static getAllAchievements() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], achievements));
      }, delay);
    });
  }

  static saveAchievement(achievement) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minAchievementTitleLength = 1;
        if (achievement.title.length < minAchievementTitleLength) {
          reject(`Title must be at least ${minAchievementTitleLength} characters.`);
        }

        if (achievement.id) {
          const existingAchievementIndex = achievements.findIndex(a => a.id == achievement.id);
          achievements.splice(existingAchievementIndex, 1, achievement);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new achievements in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          achievement.id = generateId(achievement);
          achievement.watchHref = `http://www.pluralsight.com/achievements/${achievement.id}`;
          achievements.push(achievement);
        }

        resolve(Object.assign({}, achievement));
      }, delay);
    });
  }

  static deleteAchievement(achievementId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfAchievementToDelete = achievements.findIndex(achievement => {
          achievement.achievementId == achievementId;
        });
        achievements.splice(indexOfAchievementToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default AchievementApi;
